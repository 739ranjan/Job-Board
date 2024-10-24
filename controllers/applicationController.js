const Application = require('../models/Application');
const Job = require('../models/Job');

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const application = new Application({
      job: jobId,
      applicant: req.user.id,
      resumeUrl,
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application });
    console.log('Application submitted successfully', application);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error });
  }
};

// Get all applications for a recruiter - for jobs they posted
exports.getApplicationsForRecruiter = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });
    const applications = await Application.find({ job: { $in: jobs.map(job => job.id) } })
      .populate('applicant', 'name email')  
      .populate('job', 'title');            

    res.status(200).json(applications);

    // res.send('Applications fetched successfully\n', applications);
    console.log('Applications fetched successfully', applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};

// Get applications submitted by a specific user - job seeker
exports.getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title');       
    res.status(200).json(applications);

    // res.send('Applications fetched successfully\n', applications);
    console.log('Applications fetched successfully', applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};
