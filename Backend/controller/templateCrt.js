const asyncHandler = require("express-async-handler");
const Template = require("../models/nimbus");

const validateMongoDbId = require("../utils/validateMongodbId");

const createTemplate = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    const newTemplate = await Template.create(req.body);
    res.json(newTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateTemplate = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log(_id)
  console.log(req.body)
  validateMongoDbId(_id);
  try {
    const updatedTemplate = await Template.findByIdAndUpdate(_id, req.body.sizeData, {
      new: true,
    });
    if (updatedTemplate) {
      res.json(updatedTemplate);
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedTemplate = await Template.findByIdAndDelete(id);
    if (deletedTemplate) {
      res.json(deletedTemplate);
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getTemplateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const template = await Template.findById(id);
    if (template) {
      res.json(template);
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllTemplates = asyncHandler(async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateById,
  getAllTemplates,
};