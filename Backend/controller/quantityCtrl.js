const Quantity = require("../models/quantityModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createQuantity = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    const newQuantity = await Quantity.create(req.body);
    res.json(newQuantity);
  } catch (error) {
    throw new Error(error);
  }
});
const updateQuantity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedQuantity = await Quantity.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedQuantity);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteQuantity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedQuantity = await Quantity.findByIdAndDelete(id);
    res.json(deletedQuantity);
  } catch (error) {
    throw new Error(error);
  }
});
const getQuantity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaQuantity = await Quantity.findById(id);
    res.json(getaQuantity);
  } catch (error) {
    throw new Error(error);
  }
});
const getallQuantity = asyncHandler(async (req, res) => {
  try {
    const getallQuantity = await Quantity.find();
    res.json(getallQuantity);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createQuantity,
  updateQuantity,
  deleteQuantity,
  getQuantity,
  getallQuantity,
};
