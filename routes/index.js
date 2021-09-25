var express = require('express');
var router = express.Router();
const articleController=require('../controllers/article.controller');
const multerConfig=require('../middlewares/multer.config');
const articleValidator=require('../middlewares/validator/article.validator');
const {guard}=require('../middlewares/guard');
const categoryValidator=require('../middlewares/validator/category.validator');
const categoryController=require('../controllers/category.controller');


/* GET home page. */
router.get('/', articleController.listArticle);

router.get('/article/:id',articleController.showArticle);

router.get('/add-article',guard,articleController.addArticle);

router.post('/add-article', guard,multerConfig, articleValidator, articleController.addOneArticle);

router.get('/edit-article/:id',guard,articleController.editArticle);

router.post('/edit-article/:id',multerConfig, guard, articleValidator,articleController.editOneArticle);

router.get('/delete-article/:id',guard,articleController.deleteArticle);

router.get('/add-category',guard,(req,res)=>{
    res.render('add-category');
})

router.post('/add-category', guard,categoryValidator,categoryController.addCategory);

module.exports = router;
