const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const documentRoutes = require("./routes/documentRoutes");
const errorHandler = require("./middleware/errorMiddleware");


dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/collections", collectionRoutes);
app.use("/documents", documentRoutes);
app.use(require("./middleware/errorMiddleware"));


app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

