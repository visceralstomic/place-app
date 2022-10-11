const express = require('express');
const mainController = require('../controllers/main');
const multer = require('multer');
const path = require('path'); 
const isAuth = require('../middleware/isAuth');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.resolve(__dirname, '../public', 'images/places'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const uploadFile = multer({storage: storage})

const router = express.Router();


router.get('/', mainController.getAllPlaces);
router.get('/:id/edit-page', isAuth.access, mainController.editPlacePage);
router.post('/:id/edit', isAuth.access, uploadFile.single('picture'), mainController.editPlace);
router.post('/create', isAuth.func, uploadFile.single('picture'), mainController.createPlace);
router.post('/:id/delete', isAuth.access, mainController.deletePlace); 


module.exports = router;



