const express = require("express");
const router = express.Router();

const upload = require('../../services/file_upload');

const singleUpload = upload.single('content')

router.post('/upload', (req, res) => {
  singleUpload(req, res, err => {
    return res.json({'imgUrl': req.file.location});
  });
});

module.exports = router;