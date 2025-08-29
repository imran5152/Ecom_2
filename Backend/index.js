const express = require('express');
const cors = require('cors'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const dbconnect = require('./dbconnect');

dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());


app.post('/register', async (req, res) => {
  console.log('Request body:', req.body);

  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, email and password are required' });
  }

  try {
    const db = await dbconnect();
    const users = db.collection('users');

    const existingUser = await users.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ message: 'Username or email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const db = await dbconnect();
    const users = db.collection('users');

    const user = await users.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
