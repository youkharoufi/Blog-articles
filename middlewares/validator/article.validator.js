const {Validator}=require('node-input-validator');

const articleValidator=(req,res,next)=>{

   if(req.body){
       req.body.image=req.file.filename;
   }
   
    const v=new Validator(req.body,{
        title:'required',
        category:'required',
        content:'required',
        image:'required'
    })

    v.check().then((matched)=>{
        if(!matched){
            //errors
            req.flash('errorForm',v.errors)
            return res.redirect('/add-article')
            //res.render('add-article',{errors:v.errors})
        }
        next();
    })
}

module.exports=articleValidator;