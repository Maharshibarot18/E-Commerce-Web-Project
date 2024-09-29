require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Import payment routes
const paymentRoutes = require('./routes/paymentRoutes');

app.use(cors());
app.use(bodyParser.json());

// Use payment routes
app.use('/api/payments', paymentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
