require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const URL = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(URL);

const eobj = express();
const port = process.env.PORT || 5100;

let isConnected = false;

// Middleware
eobj.use(express.json());

// CORS Configuration - supports both development and production
eobj.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all localhost and 127.0.0.1 origins for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));

// MongoDB Connection Helper
async function GetConnection() {
  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log('Connected to MongoDB successfully');
    }
    const db = client.db("MEAN_Project");
    return db.collection("Restaurent");
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Default Route
eobj.get('/', (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date(),
    status: "healthy",
  });
});

// Routes
eobj.get('/restaurents', async (req, res) => {
  try {
    const collection = await GetConnection();
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

eobj.post('/restaurents', async (req, res) => {
  try {
    const collection = await GetConnection();
    const newData = req.body;
    if (!newData.name || !newData.email || !newData.mobile || !newData.address || !newData.services) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await collection.insertOne(newData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

eobj.delete('/restaurents/:id', async (req, res) => {
  try {
    const collection = await GetConnection();
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid restaurant ID' });
    }
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

eobj.put('/restaurents/:id', async (req, res) => {
  try {
    const collection = await GetConnection();
    const id = req.params.id; // Extract ID from URL
    const updatedData = req.body; // Extract updated data from request body

    // Validate the ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid restaurant ID' });
    }

    // Perform the update in MongoDB
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // Match by _id
      { $set: updatedData } // Update fields
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.status(200).json({ message: 'Restaurant updated successfully' });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start Server
eobj.listen(port, () => {
  console.log("Server started successfully on port", port);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await client.close();
  process.exit(0);
});
