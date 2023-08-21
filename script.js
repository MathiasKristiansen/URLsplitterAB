const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Route to split URL
app.post('/split-url', (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Create the two versions
  const versionA = url + '/test-a';
  const versionB = url + '/test-b';

  // Send the response
  res.json({ versionA, versionB });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
