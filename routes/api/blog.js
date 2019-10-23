const express = require('express');
const faker = require('faker');
const router = express.Router();
const Blog = require('../../models/Blog');

// @route GET /api/blog
// @desc Get all blog
// @access Public
router.get('/', async (req, res) => {
  try {
    let blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  };
});

// @route GET /api/blog/search
// desc Search all data
// @access Public
router.get('/search', async (req, res) => {
  try {
    let text = req.query.text;
    await Blog
      .find({ $text: { $search: text } })
      .exec((err, blogs) => {
        Blog.find({ $text: { $search: text } }).countDocuments().exec((err, count) => {
          if (err) return next(err);
          res.json({
            blogs: blogs,
            count: count
          });
        });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  };
});

module.exports = router;