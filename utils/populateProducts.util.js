const populateProducts = async (document) => {
  document.products = document.products.filter((product) => product.isActive);
  document = await document.populate("products._id").execPopulate();
  return document.products.map((product) => product._id);
};

const populateBagProducts = async (bag) => {
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
};

module.exports = { populateProducts, populateBagProducts };
