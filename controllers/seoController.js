const mongoose = require('mongoose');
const Seo = require('../models/Seo');

// Default SEO configurations for standard pages
const DEFAULT_SEO_PAGES = [
  {
    page: 'home',
    pageName: 'Home Page',
    title: 'Syspoly | System Polygon Pvt. Ltd. - IT Services & Software Development',
    description: 'System Polygon Pvt. Ltd. delivers high-performance website development, mobile apps, AI engineering, digital marketing, and enterprise software solutions.',
    keywords: 'IT services, software development company, web development, mobile apps, AI engineering, digital marketing, System Polygon, Syspoly',
    canonicalUrl: 'https://syspoly.in/'
  },
  {
    page: 'services',
    pageName: 'Services Page',
    title: 'IT & Software Development Services | System Polygon Pvt. Ltd.',
    description: 'Explore our full suite of enterprise software engineering, web development, Android & iOS app development, AI solutions, and digital marketing services.',
    keywords: 'software services, web application development, mobile app development, React development, Node.js development, digital marketing services',
    canonicalUrl: 'https://syspoly.in/services'
  },
  {
    page: 'projects',
    pageName: 'Portfolio & Projects',
    title: 'Case Studies & Featured Projects | System Polygon Pvt. Ltd.',
    description: 'Browse our portfolio of completed enterprise websites, mobile apps, SaaS platforms, and custom software solutions delivered for clients worldwide.',
    keywords: 'software projects, portfolio, case studies, web development portfolio, mobile app portfolio, Syspoly projects',
    canonicalUrl: 'https://syspoly.in/projects'
  },
  {
    page: 'about',
    pageName: 'About Us',
    title: 'About System Polygon Pvt. Ltd. | Premier Software Development Agency',
    description: 'Learn about System Polygon Pvt. Ltd. - an experienced IT services & software development company providing web development, mobile apps, digital marketing, and custom software.',
    keywords: 'about Syspoly, System Polygon Pvt Ltd, IT company, software agency, enterprise engineering team',
    canonicalUrl: 'https://syspoly.in/about'
  },
  {
    page: 'contact',
    pageName: 'Contact Us',
    title: 'Contact Us | Start Your Project with System Polygon Pvt. Ltd.',
    description: 'Get in touch with System Polygon Pvt. Ltd. for software development, website design, mobile apps, and IT consultation. Request a free quote today.',
    keywords: 'contact Syspoly, hire software developers, IT consultation, get website quote, software company contact',
    canonicalUrl: 'https://syspoly.in/contact'
  }
];

// Helper to ensure default pages exist
const ensureDefaultSeoExists = async () => {
  const count = await Seo.countDocuments();
  if (count === 0) {
    await Seo.insertMany(DEFAULT_SEO_PAGES);
  }
};

// @desc    Get all page SEO records
// @route   GET /api/seo
// @access  Public
const getAllSeo = async (req, res, next) => {
  try {
    await ensureDefaultSeoExists();
    const seos = await Seo.find().sort({ createdAt: 1 });
    res.json({ success: true, count: seos.length, data: seos });
  } catch (err) {
    next(err);
  }
};

// @desc    Get SEO by page identifier
// @route   GET /api/seo/page/:page
// @access  Public
const getSeoByPage = async (req, res, next) => {
  try {
    await ensureDefaultSeoExists();
    const pageKey = (req.params.page || '').trim().toLowerCase();
    let seo = await Seo.findOne({ page: pageKey });

    // Fallback if not found in DB but exists in default list
    if (!seo) {
      const fallback = DEFAULT_SEO_PAGES.find((p) => p.page === pageKey);
      if (fallback) {
        seo = await Seo.create(fallback);
      }
    }

    if (!seo) {
      return res.status(404).json({
        success: false,
        message: `SEO metadata not found for page: ${pageKey}`
      });
    }

    res.json({ success: true, data: seo });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new page SEO record
// @route   POST /api/seo
// @access  Private/Admin
const createSeo = async (req, res, next) => {
  try {
    const pageKey = (req.body.page || '').trim().toLowerCase();
    if (!pageKey) {
      return res.status(400).json({ success: false, message: 'Page identifier is required' });
    }

    const existing = await Seo.findOne({ page: pageKey });
    if (existing) {
      // Seamlessly update existing record if already present
      const updated = await Seo.findByIdAndUpdate(existing._id, req.body, {
        new: true,
        runValidators: true
      });
      return res.status(200).json({ success: true, data: updated });
    }

    const seoData = {
      ...req.body,
      page: pageKey,
      pageName: req.body.pageName || pageKey.charAt(0).toUpperCase() + pageKey.slice(1)
    };

    const seo = await Seo.create(seoData);
    res.status(201).json({ success: true, data: seo });
  } catch (err) {
    next(err);
  }
};

// @desc    Update page SEO record
// @route   PUT /api/seo/:id or PUT /api/seo/page/:page or PUT /api/seo
// @access  Private/Admin
const updateSeo = async (req, res, next) => {
  try {
    const idOrPage = req.params.page || req.params.id;
    let seo;

    if (idOrPage && mongoose.Types.ObjectId.isValid(idOrPage)) {
      seo = await Seo.findById(idOrPage);
    }
    
    if (!seo && idOrPage) {
      seo = await Seo.findOne({ page: idOrPage.trim().toLowerCase() });
    }

    if (!seo && req.body.page) {
      seo = await Seo.findOne({ page: req.body.page.trim().toLowerCase() });
    }

    if (!seo) {
      const pageKey = (req.body.page || idOrPage || '').trim().toLowerCase();
      const newSeo = await Seo.create({
        ...req.body,
        page: pageKey,
        pageName: req.body.pageName || (pageKey ? pageKey.charAt(0).toUpperCase() + pageKey.slice(1) : 'Page')
      });
      return res.status(200).json({ success: true, data: newSeo });
    }

    seo = await Seo.findByIdAndUpdate(seo._id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: seo });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete page SEO record
// @route   DELETE /api/seo/:id
// @access  Private/Admin
const deleteSeo = async (req, res, next) => {
  try {
    const seo = await Seo.findById(req.params.id);
    if (!seo) {
      return res.status(404).json({ success: false, message: 'SEO record not found' });
    }
    await seo.deleteOne();
    res.json({ success: true, message: 'SEO record removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  DEFAULT_SEO_PAGES,
  ensureDefaultSeoExists,
  getAllSeo,
  getSeoByPage,
  createSeo,
  updateSeo,
  deleteSeo
};
