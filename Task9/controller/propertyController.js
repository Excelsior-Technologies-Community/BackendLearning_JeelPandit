import Property from "../model/Property.js";

export const createProperty = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Property image is required" });
    }

    const newProperty = await Property.create({
      title: req.body.title,
      image: `uploads/${req.file.filename}`,
    });

    res.status(201).json({
      message: "Property created successfully",
      data: newProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};