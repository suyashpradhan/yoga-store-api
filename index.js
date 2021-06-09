const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const dbConnection = require("./database/database");
const productRoute = require("./routes/products.router");
const cartRoute = require("./routes/cart.router");
const wishlistRoute = require("./routes/wishlist.router");
const registerRoute = require("./routes/register.router");
const loginRoute = require("./routes/login.router");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//DB Connection Function
dbConnection();

app.get("/", (req, res) => {
  res.send("YogaStore API");
});

app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/wishlist", wishlistRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => console.log(`App running on ${PORT}`));
