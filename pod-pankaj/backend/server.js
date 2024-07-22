// const express = require('express');

// const cors = require('cors');
// const apiRoutes = require('./routes/api');
// require('dotenv').config();

// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use('/api', apiRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
connectDB();
app.use(express.json());
// API Routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
