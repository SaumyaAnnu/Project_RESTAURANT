const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Handle Sign In
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  console.log(`🔑 Signin request: ${email} | ${password}`);

  if (email && password) {
    res.json({ message: `Welcome back, ${email}!` });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

// ✅ Handle Registration
app.post('/register', (req, res) => {
  const { name, email, phone, password, 'confirm-password': confirmPassword } = req.body;

  console.log('📝 New registration:', { name, email, phone, password, confirmPassword });

  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  res.json({ message: `Thank you for registering, ${name}!` });
});

// ✅ Handle Checkout
app.post('/checkout', (req, res) => {
  const cart = req.body.cart;
  console.log('🛒 Checkout request received:', cart);

  if (!cart || Object.keys(cart).length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  res.json({ message: 'Order placed successfully!' });
});

// 🛠 Optional test route
app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
