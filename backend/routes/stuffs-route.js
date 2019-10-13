const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')

const stuffsCtrl = require('../controllers/stuffs-controller');
const auth = require('../middleware/auth')


router.get('/', auth, stuffsCtrl.getAllStuff);
router.post('/', auth, multer, stuffsCtrl.createThing)
router.get('/:id', auth, stuffsCtrl.getOneThing);
router.put('/:id', auth, stuffsCtrl.modifyThing)
router.delete('/:id', auth, stuffsCtrl.deleteThing)


module.exports = router;