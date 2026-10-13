const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const industryRoutes = require('./routes/industryRoutes');
const technologyRoutes = require('./routes/technologyRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statisticRoutes = require('./routes/statisticRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
app.use(cors({
  origin: '*',
  credentials: true
}));

// Express Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api', limiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Uploads Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'Operational',
    timestamp: new Date().toISOString(),
    service: 'System Polygon Pvt. Ltd. API'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/statistics', statisticRoutes);
app.use('/api/upload', uploadRoutes);

// Catch 404
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
