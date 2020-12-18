import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { contactRoutes } from "./src/routes/contactRoutes";
import { userRoutes } from "./src/routes/userRoutes";

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(userRoutes);

app.use(contactRoutes);

// serving static files
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
