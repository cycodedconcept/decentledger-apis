const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/auth');
const getKeys = require('./routes/keys');
const adminRoute = require('./admin/admin');
const getAdminKeys = require('./admin/getAllKeys')

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/key', getKeys);
app.use('/api', adminRoute);
app.use('/api', getAdminKeys);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
