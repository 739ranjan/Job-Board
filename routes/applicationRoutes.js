const express = require('express');
const { applyForJob, getApplicationsForRecruiter, getApplicationsByUser } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/auth'); 
const router = express.Router();

router.post('/applications', authMiddleware, applyForJob); // Apply for a job (job seeker)
router.get('/applications/recruiter', authMiddleware, getApplicationsForRecruiter);  // Get all applications for jobs posted by recruiter
router.get('/applications/user', authMiddleware, getApplicationsByUser); // Get all applications submitted by the job seeker

module.exports = router;
