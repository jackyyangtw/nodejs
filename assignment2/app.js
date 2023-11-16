const express = require("express");
const app = express();
const path = require("path");

const usersRoutes = require("./routes/users");
const indexRoutes = require("./routes/index");

app.use(express.static(path.join(__dirname, "public")));

app.use(usersRoutes);
app.use(indexRoutes);

app.listen(3000);
