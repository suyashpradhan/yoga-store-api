const express = require("express")

const populateUserAddress = async (address) => {
  let addressList = address.addresses.filter((singleAddress) => singleAddress.isActive);
  addressList = addressList.map((userAddress) => {
    return userAddress;
  });
  return addressList;
};

module.exports = populateUserAddress