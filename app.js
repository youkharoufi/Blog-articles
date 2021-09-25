var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser=require('body-parser');
var session =require('express-session');
const flash=require('connect-flash');
const Category=require('./models/category.model');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport=require('passport');
const User=require('./models/user.model');
const Article=require('./models/article.model');


var app = express();

app.use(session({
  secret:'keyboard cat ',
  resave:false,
  saveUninitialized:false,
  //cookie:{secure:true}
}));


const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://node:node@cluster0.ijzb3.mongodb.net/blog?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>console.log('Connexion a mongoDB reussie')).catch(()=>console.log('Echec de la connexion a MongoDB'));

/*const category=new Category({
  title:'Diver',
  description:'POPOPOP'
})

category.save();*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').urlencoded({ extended: true }));

//Init passport (apres session)
app.use(passport.initialize());
app.use(passport.session());

//passport local mongoose
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  if(req.isAuthenticated()){
    Article.find({author:req.user._id},(err,articles)=>{
      if(err){
        console.log(err.message);
      }else{
        console.log(articles);
        res.locals.articles=articles;
        
      }
      next();
    })

  }else{
    next();
  }
})

//Init flash :

app.use(flash());



app.use((req,res,next)=>{
  if(req.user){
    res.locals.user=req.user;
  }
  res.locals.warning=req.flash('warning');
  res.locals.error=req.flash('error');
  res.locals.success=req.flash('success');
  res.locals.errorForm=req.flash('errorForm');
  next();
})


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
