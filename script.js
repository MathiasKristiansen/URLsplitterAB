const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// In-memory storage for URLs and their unique IDs
let urlStore = {};

// Generate a random 5-digit ID
function generateID() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

// Route to create unique URL
app.post('/generate-url', (req, res) => {
    const originalUrl = req.body.url;
    if (!originalUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const id = generateID();
    urlStore[id] = originalUrl;

    res.json({ uniqueUrl: `http://localhost:${port}/${id}` });
});

// Route to handle user accessing the unique URL
app.get('/:id', (req, res) => {
    const id = req.params.id;
    const originalUrl = urlStore[id];

    if (!originalUrl) {
        return res.status(404).send('URL not found');
    }

    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
        res.redirect(originalUrl + `/${id}/A`);
    } else {
        res.redirect(originalUrl + `/${id}/B`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
