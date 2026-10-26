const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const errorHandler = require('./middleware/errorHandler');
const Seo = require('./models/Seo');

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
const seoRoutes = require('./routes/seoRoutes');

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
app.use('/api/seo', seoRoutes);

// Serve frontend client in production with dynamic SEO HTML injection
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath, { index: false }));

  app.get('*', async (req, res, next) => {
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/uploads')) {
      return next();
    }

    try {
      const indexPath = path.join(clientDistPath, 'index.html');
      if (!fs.existsSync(indexPath)) return next();

      let html = fs.readFileSync(indexPath, 'utf8');
      const rawUrl = (req.path || '/').split('?')[0];
      let pageKey = 'home';
      if (rawUrl === '/' || rawUrl === '') {
        pageKey = 'home';
      } else {
        pageKey = rawUrl.replace(/^\/+/, '').split('/')[0] || 'home';
      }

      const seo = await Seo.findOne({ page: pageKey.toLowerCase() });
      if (seo) {
        if (seo.title) {
          html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
        }
        if (seo.description) {
          if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
            html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${seo.description}" />`);
          } else {
            html = html.replace(/<\/head>/i, `    <meta name="description" content="${seo.description}" />\n  </head>`);
          }
        }
        if (seo.keywords) {
          if (/<meta\s+name=["']keywords["'][^>]*>/i.test(html)) {
            html = html.replace(/<meta\s+name=["']keywords["'][^>]*>/i, `<meta name="keywords" content="${seo.keywords}" />`);
          } else {
            html = html.replace(/<\/head>/i, `    <meta name="keywords" content="${seo.keywords}" />\n  </head>`);
          }
        }
        if (seo.robots) {
          if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) {
            html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${seo.robots}" />`);
          }
        }
        if (seo.canonicalUrl) {
          if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
            html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${seo.canonicalUrl}" />`);
          }
        }
      }

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    } catch (err) {
      return next(err);
    }
  });
}

// Catch 404
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
