const express = require("express");
const router = express.Router();
const Post = require("../model/Post");

// router.get('/', (req, res) => {
//     res.send("fetching data");
// })

// get full list
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// // post/save

router.post("/", async (req, res) => {
  if (req.query.data_id) {
    try {
      const updatedPost = await Post.updateOne(
        { _id: req.query.data_id },
        { $set: { title: req.body.title, description: req.body.description } }
      );
      res.json(updatedPost);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

// // getbyid
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//     // delete
router.delete("/:id", async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.id });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

    // update

// router.post('/:id', async (req, res) => {
//     try {
//         console.log(req);
//         const updatedPost = await Post.updateOne({_id : req.params.id}, {$set : {title: req.body.title, description: req.body.description}});
//         res.json(updatedPost);
//     } catch (err) {
//         res.json({message: err});
//     }
// });

module.exports = router;
