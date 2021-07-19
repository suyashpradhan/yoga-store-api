const populateProducts = async (document) => {
  document.products = document.products.filter((product) => product.isActive);
  document = await document.populate("products._id").execPopulate();
  return document.products.map((product) => product._id);
};

module.exports = { populateProducts };
