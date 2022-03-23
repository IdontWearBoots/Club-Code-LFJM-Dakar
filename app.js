const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const app = express();

const port = 3000;
const membres = require(`${__dirname}/data/membres.json`);
const posts = require(`${__dirname}/data/blogPosts.json`);
const upload = multer({dest: "/blog_post_images"}).single("imageSelect");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public/"));
app.set("view engine", "ejs");

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

app.post("/blog-admin", upload, (req, res) => {
    
    let blogPostsPath = `${__dirname}/data/blogPosts.json`;
    let post = {}

    post["title"] = req.body.postTitle;
    post["body"] = req.body.postBody.split(/[\r\n]/g);

    let fileData = req.body.fileData.replace(/^data:image\/\w+;base64,/, "");
    let buffer = Buffer.from(fileData, 'base64');
    let filePath = `/images/blog_post_images/${req.file.originalname}`;

    post["imageSrc"] = {
        "src": filePath,
        "alt": filePath
    }

    fs.writeFile(`${__dirname}/public/${filePath}`, buffer, console.error);

    fs.readFile(blogPostsPath, 'utf8', (err, data) => {
        if(err){
            console.log(err);
            return;
        }

        let obj = JSON.parse(data);
        obj.posts.push(post);

        fs.writeFile(blogPostsPath, JSON.stringify(obj), 'utf8', console.error);
    });

    res.redirect("/blog");
});

app.get("/contact", (req, res) => {
    res.render("contact/contact");
});

app.listen(port, (req, res) => {
    console.log(`App up and running listening on port ${port}`);
});