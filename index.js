const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const dbConnection = require("./database/database");
const productRoute = require("./routes/products.route");
const bagRoute = require("./routes/bag.route");
const wishlistRoute = require("./routes/wishlist.route");
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
const addressRoute = require("./routes/address.route");
const authValidator = require("./middlewares/authValidator.middleware");
const orderRoute = require("./routes/payments.route")
const cors = require("cors");

app.use(express.json());
app.use(cors());

//DB Connection Function
dbConnection();


app.get("/", (req, res) => {
  res.send("YogaStore API");
});

app.use("/products", productRoute);
app.use("/bag", authValidator, bagRoute);
app.use("/wishlist", authValidator, wishlistRoute);
app.use("/address", authValidator, addressRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/payment", orderRoute);
app.listen(PORT, () => console.log(`App running on ${PORT}`));
