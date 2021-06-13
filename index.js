const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const dbConnection = require("./database/database");
const productRoute = require("./routes/products.route");
const bagRoute = require("./routes/bag.route");
const wishlistRoute = require("./routes/wishlist.route");
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
const authValidator = require("./middlewares/authValidator.middleware");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//DB Connection Function
dbConnection();

app.get("/", (req, res) => {
  res.send("YogaStore API");
});

app.use("/products", productRoute);
app.use("/bag", authValidator, bagRoute);
app.use("/wishlist", authValidator, wishlistRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => console.log(`App running on ${PORT}`));
