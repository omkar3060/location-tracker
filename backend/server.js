const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Update CORS configuration
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://location-tracker-frontend-b094.onrender.com', // Deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// MongoDB Connection
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');

    // Start the server after DB connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const locationRoutes = require('./routes/locations');
app.use('/locations', locationRoutes);

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// Start Server
startServer();
