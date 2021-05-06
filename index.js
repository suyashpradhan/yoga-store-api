const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const dbConnection = require("./database/database");
const productRoute = require("./routes/products.router");
const cartRoute = require("./routes/cart.router");
const wishlistRoute = require("./routes/wishlist.router");
const { products } = require("./models/products.model");

const cors = require("cors");
app.use(cors());
app.use(express.json());

//DB Connection Function
dbConnection();

//Function for adding products into DB, should be run only once
/* products(); */


app.get("/", (req, res) => {
  res.send("YogaStore API");
});

app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/wishlist", wishlistRoute);

app.listen(PORT, () => console.log(`App running on ${PORT}`));
