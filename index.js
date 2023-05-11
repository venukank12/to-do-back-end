require('dotenv').config();
const express = require("express");
const app = express();
// const cors = require("cors");

// import routers
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

// initialize middlewares
// app.use(cors());
app.use(express.json());


// api end points
app.use("/user", userRoutes);

app.use("/task", taskRoutes);


// not found apis response
app.use((req, res) => res.status(404).json({message:'404 Not found'}));


// configure & listening port 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening on port no:${PORT}`);
});