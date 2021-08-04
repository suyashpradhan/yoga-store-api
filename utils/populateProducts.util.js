const populateProducts = async (document) => {
  document.products = document.products.filter((product) => product.isActive);
  document = await document.populate("products._id").execPopulate();
  return document.products.map((product) => product._id);
};


const populateCartFromDb = async (req, res) => {
  try {
    let { bag } = req;

    bag = await bag
      .populate({
        path: 'products._id'
      })
      .execPopulate();

    const activeProductsInCart = bag.products.filter((item) => item.isActive);

    res.status(200).json({
      response: {
        products: activeProductsInCart,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message,
    });
  }
};

/* const populateBagProducts = async (bag) => {
  bag.products = bag.products.filter((product) => product.isActive);
  bag = await bag
    .populate({
      path: "products._id"
    })
    .execPopulate();
  return bag.products.map((product) => {
    let bagItem = JSON.parse(JSON.stringify(product._id));
    Object.assign(bagItem, { quantity: product.quantity });
    return bagItem;
  });
}; */

module.exports = { populateProducts, populateCartFromDb };
