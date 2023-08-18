const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnections");
const dotenv = require("dotenv").config();

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json()); // middleware to parse body received in request
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running at port", port);
});
