const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/rpc', async (req, res) => {
  try {
    // Ganache is running on port 12121 internally
    const ganacheUrl = 'http://localhost:12121';

    const response = await axios.post(ganacheUrl, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to connect to Ganache' });
  }
});

app.get('/', (req, res) => {
  res.send('Ganache Proxy is Running');
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});