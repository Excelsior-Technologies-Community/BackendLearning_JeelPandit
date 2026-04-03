import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true,
    collection: "uploadFile"
   }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;