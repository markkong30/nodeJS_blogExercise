const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();
// express app
const app = express();

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@nodetut.gnca2sb.mongodb.net/?retryWrites=true&w=majority`;

// listen for requests
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//mongoose

app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.get("/blogs/create", (req, res) => {
	res.render("createBlog", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
