const Job = require('../models/Job');

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, companyName } = req.body;
    console.log('Request body:', req.body);

    const postedBy = req.user.id;
    console.log('Posted by user:', req.user);
    const job = new Job({
      title,
      description,
      companyName,
      postedBy
      //"6719f230910049f14bb5e09f"
    });

    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });

    // res.send('Job created successfully\n', job);
    console.log('Job created successfully', job);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name');
    res.status(200).json(jobs);

    // res.send('Jobs fetched successfully\n', jobs);
    console.log('Jobs fetched successfully', jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);

    // res.send('Job fetched successfully\n', job);
    console.log('Job fetched successfully', job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Job updated successfully', updatedJob });

    // res.send('Job updated successfully\n', updatedJob);
    console.log('Job updated successfully', updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: 'Job deleted successfully' });

    // res.send('Job deleted successfully\n');
    console.log('Job deleted successfully');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
};
