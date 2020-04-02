const express = require("express");
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", router);

app.all("*", (req, res) =>
  res.status(404).json({
    status: "error",
    message: "Route not found"
  })
);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`> Server listening on port ${PORT}`));
}
