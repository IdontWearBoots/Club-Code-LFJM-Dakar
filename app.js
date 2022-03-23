const bodyParser = require("body-parser");
const fs = require('fs');
const request = require('request');
const express = require("express");
const app = express();

const port = 3000;
const membres = require(`${__dirname}/data/membres.json`);
const posts = require(`${__dirname}/data/blogPosts.json`);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public/"));
app.set("view engine", "ejs");

function downloadImage(url, filename, callback){
  request.head(url, function(err, res, body){
    request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/info", (req, res) => {
    res.render("information/info", {
        allMembres: membres
    });
});

app.get("/blog", (req, res) => {
    res.render("blog/blog", {
        allBlogPosts: posts
    });
});

app.get("/blog-admin", (req, res) => {
    res.render("blogAdmin/admin.ejs");
});

app.post("/blog-admin", (req, res) => {
    console.log(req);
    
    let post = {};
    
    post["title"] = `<h1> ${req.body.postTitle} <h1>`;
    
    let body = req.body.postBody.split(/(\r\n)|(\n)/g).filter(e => !/(\r\n)|(\n)/g.test(e)).filter(e => e);
    
    console.log(body);
    
    post["body"] = body;

    let imgName = imageSelect.slice(imageSelect.indexOf("."), imageSelect.length), 
    
    downloadImage(
        res.body.imageSelect,
        imgName, 
        function(){ 
            console.log(`${res.body.imageSelect} has been saved as ${imgName}`) 
        }
    );

    res.redirect("/blog");
});

app.get("/contact", (req, res) => {
    res.render("contact/contact");
});

app.listen(port, (req, res) => {
    console.log(`App up and running listening on port ${port}`);
});