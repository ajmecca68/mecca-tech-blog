const { Post } = require('../models'); 


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error('Error retrieving blog posts:', error);
    res.status(500).json({ message: 'Failed to retrieve blog posts' });
  }
};

exports.getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ message: 'Blog post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.error('Error retrieving blog post by ID:', error);
    res.status(500).json({ message: 'Failed to retrieve blog post' });
  }
};

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    

    if (req.user.role === 'user') {
      try {
        const post = await Post.create({ title, content, userId: req.user.id });
        res.status(201).json({ message: 'Blog post created successfully', post });
      } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(400).json({ message: 'Failed to create blog post' });
      }
    } else {
      res.status(403).json({ message: 'Unauthorized to create a blog post' });
    }
  };


exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ message: 'Blog post not found' });
    } else {
      post.title = title;
      post.content = content;
      await post.save();
      res.json({ message: 'Blog post updated successfully', post });
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(400).json({ message: 'Failed to update blog post' });
  }
};


exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ message: 'Blog post not found' });
    } else {
      await post.destroy();
      res.json({ message: 'Blog post deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(400).json({ message: 'Failed to delete blog post' });
  }
};
