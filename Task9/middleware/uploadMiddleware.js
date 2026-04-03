import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && 
                  allowedTypes.test(file.mimetype);
  
  isValid ? cb(null, true) : cb(new Error("Only image files are allowed!"));
};

const upload = multer({ storage, fileFilter });
export default upload;