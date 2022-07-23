const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://admin-Manas:AdminPassword@cluster0.i4vdm.mongodb.net/blogDB?retryWrites=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let userName = "";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please check your data entry, no email address specified!']
  },
  emailAddress: {
    type: String,
    required: [true, 'Please check your data entry, no password specified!']
  },
});

const blogSchema = new mongoose.Schema({
  composeTitle: {
    type: String,
    required: [true, 'Please check your data entry, no name specified!'],
    minlength: 10
  },
  composeBody: {
    type: String,
    required: [true, 'Please check your data entry, no body specified!'],
    minlength: 5
  },
  user: [userSchema]
});


const Blog = mongoose.model('Blog', blogSchema);
const User = mongoose.model('User', userSchema);

app.get('/', function(req, res) {

  Blog.find(function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully loaded blogs');
      res.render('home', { homeStartingContent: homeStartingContent, blogs: blogs});
      }
  });
});

app.get('/blogs/compose', function(req, res) {
  res.render('compose');
});

app.post('/blogs/compose', function(req, res) {
  userName = req.body.name;

  const user = new User({
    name: req.body.name,
    emailAddress: req.body.emailAddress
  });
  const blog = new Blog({
    composeTitle: req.body.composeTitle,
    composeBody: req.body.composeBody,
    user: user
  });

  user.save();
  blog.save();
  res.redirect('/');
});

app.get('/blogs/:blog_id', function(req, res) {
  const blog_id = req.params.blog_id;

  Blog.findById(blog_id, function(err, blog) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sucessfully loaded blog #' + blog_id);
      res.render('post', {
        composeTitle: blog.composeTitle,
        composeBody: blog.composeBody,
        blog_id: blog_id,
        name: blog.user[0].name,
        emailAddress: blog.user[0].emailAddress
      });
    }
  });
});

app.post('/blogs/:blog_id/delete', function(req, res) {
  const blog_id = req.params.blog_id;

  Blog.findByIdAndRemove(blog_id, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully deleted blog #' + blog_id);
      res.redirect('/');
    }
  });
});

app.get('/about', function(req, res) {
  res.render('about', {
    aboutContent: aboutContent
  });
});

app.get('/contact', function(req, res) {
  res.render('contact', {
    contactContent: contactContent
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
