exports.guard=(req,res,next)=>{
    if(!req.user){
        req.flash('warning','Sorry, you must authenticate to access this page !');
        return res.redirect('/users/login');
    }
    next();
}