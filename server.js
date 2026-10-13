const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');
const seedDatabase = require('./seed');

let PORT = parseInt(process.env.PORT || '5000', 10);

const startServer = async () => {
  try {
    // 1. Connect DB (with memory server fallback if standard DB fails)
    await connectDB();

    // 2. Auto-seed if database has 0 services or 0 admin
    const Service = require('./models/Service');
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      console.log('[Server Startup] Empty database detected. Triggering initial seed...');
      await seedDatabase();
    }

    // 3. Start Express Server with port retry fallback if EADDRINUSE
    const listen = (portToTry) => {
      const server = app.listen(portToTry, () => {
        console.log(`\n======================================================`);
        console.log(`🚀 Syspoly MERN Server Running on Port: ${portToTry}`);
        console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 Health Check: http://localhost:${portToTry}/api/health`);
        console.log(`======================================================\n`);
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.warn(`[Port Warning] Port ${portToTry} is already in use (another server instance is running). Retrying on port ${portToTry + 1}...`);
          listen(portToTry + 1);
        } else {
          console.error('Server error:', err);
          process.exit(1);
        }
      });
    };

    listen(PORT);
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
};

startServer();
