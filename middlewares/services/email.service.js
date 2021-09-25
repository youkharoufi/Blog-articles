const nodemailer=require('nodemailer');

const sendResetMail=(req,res,next)=>{
    var transporter=nodemailer.createTransport({
        service:"gmail",

        auth:{
            user:"y.kharoufi96@gmail.com",
            pass:process.env.PASSWORD
        }
    })

    var message="<br>Message :"+req.body.message;

    var mailOptions={
        from:"y.kharoufi96@gmail.com",
        to:req.body.email,
        subject:"Reset Password",
        html:message
    };

    transporter.sendMail(mailOptions,(err,infos)=>{
        if(err){
            console.log(error);
            req.flash('err',err.message);
            return res.redirect("/users/forgot-password");
        }else{
            console.log(infos);
            req.flash("success","An email has been sent to your address : "+req.body.email+" Please check your mail box and click on the reset link");
            return res.redirect('/users/forgot-password');
        }
    })
}

module.exports=sendResetMail;