const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const port = 3000;
const membres = require(`${__dirname}/data/membres.json`);
const posts = require(`${__dirname}/data/blogPosts.json`);

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
})

app.get("/contact", (req, res) => {
    res.render("contact/contact");
});

app.listen(port, (req, res) => {
    console.log(`App up and running listening on port ${port}`);
});