const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { isPublished: true };
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
};

// @desc    Get project by slug
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    await project.deleteOne();
    res.json({ success: true, message: 'Project removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
};
