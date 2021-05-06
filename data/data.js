const faker = require("faker");

//Function to avoid random data
faker.seed(1234);

const brand = ["Nike", "Puma", "Reebok", "Adidas", "HRX", "Sparx"];
const category = ["Mats", "Blankets", "Clothing"];
const discount = [10, 20, 50, 70];
const ratings = [1.0, 2.0, 3.0, 4.0, 5.0];

//Fake Data
const productsData = [...Array(100)].map((_) => ({
  name: faker.commerce.productName(),
  image: faker.random.image(),
  originalPrice: Number(faker.commerce.price() * 5),
  discountedPrice: Number(faker.commerce.price()),
  category: faker.random.arrayElement([...category]),
  brand: faker.random.arrayElement([...brand]),
  ratings: faker.random.arrayElement([...ratings]).toFixed(1),
  discount: faker.random.arrayElement([...discount]),
  inStock: faker.datatype.boolean(),
  fastDelivery: faker.datatype.boolean(),
  yogaAssured: faker.datatype.boolean(),
  totalPurchase: faker.random.arrayElement([500, 1700, 1200, 4515, 6700, 8970]),
  availableQty: faker.random.arrayElement([5, 25, 3, 17, 44, 100]),
}));

//Exporting Data
module.exports = productsData;
