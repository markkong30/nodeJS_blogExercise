const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

const { blog_create_get, blog_create_post, blog_delete, blog_details, blog_index } = blogController;

router.get("/create", blog_create_get);
router.get("/", blog_index);
router.post("/", blog_create_post);
router.get("/:id", blog_details);
router.delete("/:id", blog_delete);

module.exports = router;
