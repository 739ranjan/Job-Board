const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth'); 
const { createJob, getJobs, updateJob, deleteJob } = require('../controllers/jobController');

// Routes
router.post('/jobs', authenticate, createJob); // job create route
router.get('/jobs', getJobs); // to get jobs
router.put('/jobs/:id', authenticate, updateJob); // job update route
router.delete('/jobs/:id', authenticate, deleteJob); // job delete route

module.exports = router;
