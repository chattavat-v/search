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

// @route GET /api/blog/search/text
// @desc Search all data
// @access Public
router.get('/search/text', async (req, res) => {
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

// @route GET /api/blog/search/option
// @desc Search data by option
// @access Public
router.get('/search/option', async (req, res) => {
  try {
    const { name, body } = req.query;
    const options = {
      name: { $regex: name },
      body: { $regex: body }
    };
    let blogs = await Blog.find(options);
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  };
});

// @route GET /api/blog/search
// @desc Search with select mode between search fulltext or with option
// @access Public
router.get('/search', async (req, res) => {
  try {
    const { mode, name, body, text } = req.query;

    if(mode === 'true') {
      const options = {
        name: { $regex: name },
        body: { $regex: body }
      };
      await Blog
        .find(options)
        .exec((err, blogs) => {
          Blog.find(options).countDocuments().exec((err, count) => {
            if (err) return next(err);
            res.json({
              blogs: blogs,
              count: count
            });
          });
        });
    } else {
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
    };
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  };
});

module.exports = router;