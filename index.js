const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function maskPII(obj) {
  if (!obj) return null;

  const emailRegex = /[^@]+@[^.]+\..+/;

  if (obj.email && emailRegex.test(obj.email)) {
    obj.email = "*****" + obj.email.substring(obj.email.indexOf("@"));
  }

  if (obj.phone_number) {
    obj.phone_number = "****";
  }

  return obj;
}

app.get("/snowflake/api/data", (req, res) => {
  res.send("Hello World!");
});

app.post("/snowflake/api/data", (req, res) => {
  const response = maskPII(req.body);
  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
