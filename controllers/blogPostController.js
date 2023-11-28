const { BlogPost } = require('../models');

exports.createBlogPost = async (req, res) => {
  try {
    
    const { title, content, userId } = req.body;

    
    const blogPost = await BlogPost.create({
      title,
      content,
      userId,
    });

    
    res.status(201).json({ message: 'Blog post created successfully', blogPost });
  } catch (error) {
  
    console.error('Error creating blog post:', error);
    res.status(400).json({ message: 'Failed to create blog post', error });
  }
};

// Other blog post-related controller actions can be added here (e.g., update, delete, view, etc.)
