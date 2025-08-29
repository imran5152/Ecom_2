const express = require('express');
const cors = require('cors');
const dbconnect = require('./dbconnect');
const { ObjectId } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/products', async (req, res) => {
  try {
    const collection = await dbconnect();
    const products = await collection.find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const _id = req.params.id;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const collection = await dbconnect();
    const product = await collection.findOne({ _id: new ObjectId(_id) });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/products', async (req, res) => {
  try {
    const collection = await dbconnect();
    const result = await collection.insertOne(req.body);
    res.status(201).json({ message: 'Product added', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const _id = req.params.id;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const collection = await dbconnect();
    const result = await collection.deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.patch('/products/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedProduct = req.body;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const collection = await dbconnect();
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updatedProduct }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(1000, () => console.log(' Server started on port http://localhost:1000'));
