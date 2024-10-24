const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();
const app = express();


app.use(express.json());

//db connection
connectDB();

// routes
app.use('/api', authRoutes);
app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Working.....');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
