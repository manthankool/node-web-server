const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')//to add support for partials
app.set('view engine','hbs')                      //this will allow us to set express related configuration;



app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to load logs to the file');
    }
 });
  next();

});

// app.use((req,res,next) => {
//   res.render('maintinance.hbs');
//
// });

app.use(express.static(__dirname + '/public'));  //absolute directory

hbs.registerHelper('getCurrentYear',() => {          //helpers can also take arguements
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {             //app.gte is a request handler
  // res.send('<h1>hello fucker</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Come and fucked by me and get rewarded and get my dildo too! and give your pussy to me'
  });



});

app.get('/about',(req,res) => {

  res.render('about.hbs',{
    pageTitle:'About Page'
  });


});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage:'Unable to lead you to anything fucker'


  });


});

app.get('/project',(req,res) => {
  res.render('project.hbs',{
    projectTitle:'Making chatbots',
    pageTitle:'Project'
  });
});

app.listen(port, () => {

  console.log(`Server is up on port ${port}`);
});
