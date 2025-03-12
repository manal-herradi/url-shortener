require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/ShortUrl');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// API: Create a short URL with expiration & tracking
app.post('/shorten', async (req, res) => {
    const { longUrl, expiresIn } = req.body;
    const expirationDate = expiresIn ? new Date(Date.now() + expiresIn * 1000) : null;

    const shortUrl = await ShortUrl.create({ longUrl, expirationDate });
    res.json({ shortUrl: shortUrl.shortId });
});

// API: Redirect to original URL + Track Clicks
app.get('/:shortId', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ shortId: req.params.shortId });

    if (!shortUrl) return res.status(404).json({ error: "URL not found" });

    if (shortUrl.expirationDate && shortUrl.expirationDate < new Date()) {
        return res.status(410).json({ error: "URL has expired" });
    }

    // Increment click count & update timestamp
    shortUrl.clicks += 1;
    shortUrl.lastClicked = new Date();
    await shortUrl.save();

    res.redirect(shortUrl.longUrl);
});

// API: Get analytics for a short URL
app.get('/analytics/:shortId', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ shortId: req.params.shortId });

    if (!shortUrl) return res.status(404).json({ error: "URL not found" });

    res.json({
        originalUrl: shortUrl.longUrl,
        shortUrl: shortUrl.shortId,
        clicks: shortUrl.clicks,
        lastClicked: shortUrl.lastClicked
    });
});

// Cleanup expired URLs every hour
setInterval(async () => {
    await ShortUrl.deleteMany({ expirationDate: { $lt: new Date() } });
    console.log("🗑️ Expired URLs cleaned up");
}, 3600000);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));