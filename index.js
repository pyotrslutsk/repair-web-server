const express = require("express");
const cors = require("cors");
const categoryRouter = require("./routes/category.routes");
const dbConnect = require("./utils/dbConnect");
const buildingTypesRouter = require("./routes/building-types.routes");
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["https://poster-client.onrender.com", "http://localhost:5173"],
  })
);
app.use(express.json());
app.use(categoryRouter);
app.use(buildingTypesRouter);

const PORT = process.env.PORT || 5000;

dbConnect();

app.listen(PORT);
