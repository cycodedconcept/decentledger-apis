const express = require('express');
const authRoutes = require('./routes/auth');
const getKeys = require('./routes/keys');
const adminRoute = require('./admin/admin');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/key', getKeys);
app.use('/api', adminRoute)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
