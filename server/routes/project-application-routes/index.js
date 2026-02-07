const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth-middleware');
const adminOnly = require('../../middleware/admin-middleware');
const controller = require('../../controllers/project-application-controller');

// Apply for a project (authenticated users) - no file upload
router.post('/apply', authenticate, controller.applyForProject);

// Admin routes
router.get('/', authenticate, adminOnly, controller.listApplications);
router.get('/:id', authenticate, adminOnly, controller.getApplication);
router.post('/:id/status', authenticate, adminOnly, controller.updateStatus);
router.get('/:id/resume', authenticate, adminOnly, controller.downloadResume);

module.exports = router;
