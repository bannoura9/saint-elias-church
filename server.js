const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(
    "got here==>>>111",
    !req.secure,
    "proto==>>",
    req.headers["x-forwarded-proto"] !== "https"
  );
  if (!req.secure && req.headers["x-forwarded-proto"] !== "https") {
    console.log("got here==>>>22");
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    console.log("got here==>>>33");
    next();
  }
});

app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("Server started on ", port));
