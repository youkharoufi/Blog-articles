const Category=require("../models/category.model");


exports.addCategory=(req,res)=>{
    const category=new Category({
      title:req.body.title,
      description:req.body.description
    })
  
    category.save((err,category)=>{
      if(err){
        req.flash('error',err.message);
        return res.redirect('/add-category');
      }
  
      req.flash('success',"The category has been added successfully");
      return res.redirect('/add-category');
  
  
    })
  }