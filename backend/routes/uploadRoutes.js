import path from 'path';
import express from 'express';
import multer from 'multer';
import pkg from 'cloudinary';
import expressAsyncHandler from 'express-async-handler';

const cloudinary = pkg;
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Solo formatos .jpg, .jpeg y .png');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const upload2 = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const upload3 = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// router.post('/', upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

router.post(
  '/',
  upload.single('image'),
  expressAsyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`);
    res.send(uploadPhoto.url);
  })
);

router.post(
  '/2',
  upload2.single('image2'),
  expressAsyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`);
    res.send(uploadPhoto.url);
  })
);

router.post(
  '/3',
  upload3.single('image3'),
  expressAsyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`);
    res.send(uploadPhoto.url);
  })
);
export default router;
