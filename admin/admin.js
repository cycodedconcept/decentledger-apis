require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const validateAdmin = require('../auth/validateAdmin');

const secretKey = process.env.JWT_SECRET;
if (!secretKey) console.log('JWT secret key not set. Check your .env file.');

router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const sql = 'SELECT * FROM admin WHERE username = ?';
        const [admin] = await db.execute(sql, [username]);

        // Check if admin exists
        if (admin.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const adminUser = admin[0];

        const isMatch = await bcrypt.compare(password, adminUser.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: adminUser.id, username: adminUser.username }, secretKey, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token, admin: username });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/admin/update', validateAdmin, async (req, res) => {
    const { username, newPassword } = req.body;

    if (!username && !newPassword) {
        return res.status(400).json({ message: 'Username or new password is required to update' });
    }

    try {
        if (username) {
            await db.execute('UPDATE admin SET username = ? WHERE id = ?', [username, req.adminId]);
        }

        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await db.execute('UPDATE admin SET password = ? WHERE id = ?', [hashedPassword, req.adminId]);
        }

        res.json({ message: 'Admin details updated successfully' });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;