const Article=require('../models/article.model');
const Category=require('../models/category.model');
const User=require("../models/user.model");
const fs=require('fs');

exports.listArticle=(req,res)=>{
    Article.find().then((articles)=>{
        res.render('index',{title:'Express', 'articles':articles})}).catch((err)=>{})
        
        //res.status(200).json(articles)}).catch((err)=>{res.status(400).json(err)});
      
      
        //res.render('index', { title: 'Express' });
}

exports.showArticle=(req,res)=>{
    //console.log(req.params.id);
    Article.findOne({_id:req.params.id}).then((article)=>{res.render('single-article',{article:article})}).catch((err)=>{res.redirect('/')})
  }

exports.addArticle=(req,res)=>{
    Category.find().then((categories)=>{res.render('add-article',{categories:categories})}).catch(()=>{res.redirect('/')})
}

exports.addOneArticle=(req,res)=>{

    /*console.log(req.file);
    return;*/
  var article=new Article({
      ...req.body,
      image:`${req.protocol}://${req.get('host')}/images/articles/${req.file.filename}`,
      author:req.user,
      publishedAt:Date.now()
  });



  article.save((err,article)=>{

    if(err){
        req.flash('error','An error occured during article creation');
        return res.redirect('/add-article');
    }
    User.findOne({username:req.user.username},(err,user)=>{
      if(err){
        console.log(err.message);
      }
      console.log(article);
      user.articles.push(article);
      user.save();
    })
    
    req.flash('success','Success ! Your article has been added');
    return res.redirect('/add-article'); 

    
    
      /*if(err){
          Category.find().then((categories)=>{
            res.render('add-article',{categories:categories, error:"Sorry, an error occured. Try again later !"});
          }).catch(()=>{
              res.redirect('/');
          })
      }else{
          Category.find().then((categories)=>{res.render('add-article',{categories:categories, success:"Thank you, your article has been added"});})
          .catch(()=>{
              res.redirect('/');
          })
        res.render('add-article',{success:"Thank you, your article has been added"});
      }*/
  })
}
  
  /*.then(()=>{res.render('add-article',{success:"Thank you, your article has been added"})}).catch(()=>{res.render('add-article',{error:"Sorry, an error occured. Try again later !"})});
  console.log(article); */



exports.editArticle=(req,res)=>{
  const id=req.params.id;
  Article.findOne({_id:id,author:req.user._id}, (err,article)=>{
    if(err){
      req.flash('error',err.message)
      return res.redirect('/');
    }

    if(!article){
      req.flash('error',"Sorry you cannot edit this article");
      return res.redirect("/edit-article/"+id);
    }
    Category.find((err,categories)=>{
      if(err){
        req.flash('error',err.message);
        return res.redirect('/');
      }
      return res.render('edit-article',{categories:categories,article:article});
    })
})}

exports.editOneArticle=(req,res)=>{
  const  id=req.params.id;

  Article.findOne({_id:id, author:req.user._id},(err,article)=>{
    if(err){
      req.flash('error',err.message);
      return res.redirect('/edit-article'+id)
    }

    if(!article){
      req.flash('error',"Sorry, you cannot edit this article")
      return res.redirect("/edit-article/"+id);    }

    if(req.file){
     // http://localhost:3000/images/articles/46512351848.png
      const filename=article.image.split('/articles/')[1];
      fs.unlink(`public/images/articles/${filename}`,()=>{
        console.log('Deleted :'+filename)
      })
    }

    article.title=req.body.title?req.body.title:article.title;
    article.category=req.body.category?req.body.category:article.category;
    article.content=req.body.content?req.body.content:article.content;
    article.image=req.file?`${req.protocol}://${req.get('host')}/images/articles/${req.file.filename}`:article.image;

    console.log(article);

    article.save((err,article)=>{
      if(err){
        req.flash('error',err.message);
        return res.redirect("/edit-article"+id);
      }
      req.flash('success',"The article has been edited successfully !");
      return res.redirect('/edit-article/'+id);
    })
  })
}

exports.deleteArticle=(req,res)=>{
  Article.deleteOne({_id:req.params.id,author:req.user._id},(err,message)=>{
    if(err){
      req.flash("error","Sorry, you cannot delete this article !");
      return res.redirect("/users/dashboard");
    }

    if(!message.deletedCount){
      req.flash("error","Sorry, you cannot delete this article !");
      return res.redirect("/users/dashboard");
    }

    req.flash("success","Article deleted successfully !");
      return res.redirect("/users/dashboard");
  })
}

