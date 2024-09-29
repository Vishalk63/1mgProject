const express = require("express");
const app = express();
const connection = require("./config/db");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
require("dotenv").config();
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/products", productRouter);
app.use('/user',userRouter)

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send(" just checking");
}); 

app.listen(PORT, async () => {
  try {
    connection;
    console.log(`listenig on port ${PORT} and db connected`);
  } catch (err) {
    console.log(`err while db connection ${err}`);
  }
});
