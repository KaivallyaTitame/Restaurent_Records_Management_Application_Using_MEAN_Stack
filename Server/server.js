const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

const eobj = express();
const port = 5100;

// Middleware
eobj.use(express.json());
eobj.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

// MongoDB Connection Helper
async function GetConnection() {
  if (!client.isConnected()) {
    await client.connect();
  }
  const db = client.db("MEAN_Project");
  return db.collection("Restaurent");
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
