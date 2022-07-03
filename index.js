const express = require("express");

const authRouter = require("./routes/auth");
const mongoose = require("mongoose");

const app = express();

const db =
  "mongodb+srv://danish:nV6XWdX6L2zeMkfU@cluster0.p8yxk.mongodb.net/?retryWrites=true&w=majority";
const PORT = 8080;

// MiddleWare

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);

// Connections

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("🚀🚀 Connection to DB is Successfull 😄😁");
  })
  .catch((e) => {
    console.log(e);
    console.log("DID'T CONNECT TO DB 😡😠");
  });

app.listen(PORT, "192.168.1.211", () => {
  console.log(`🚀🚀 Server is rocking on port 🚀🚀 ${PORT} 💃💃`);
});
