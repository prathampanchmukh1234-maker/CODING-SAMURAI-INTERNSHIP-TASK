const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ===== VERY IMPORTANT: SERVE FRONTEND FILES =====
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
// ================================================

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.log);

app.use("/auth", require("./routes/authRoutes"));
app.use("/posts", require("./routes/postRoutes"));
app.use("/comments", require("./routes/commentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
