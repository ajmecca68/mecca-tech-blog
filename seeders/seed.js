const { sequelize, BlogPost, User } = require('../models'); 

async function seedDatabase() {
  try {
    // Synchronize the models with the database
    await sequelize.sync({ force: true });

    // Generate random user data
    const users = [
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' },
      { username: 'user3', email: 'user3@example.com', password: 'password3' },
      { username: 'user4', email: 'user4@example.com', password: 'password4' },
    ];

    // Create users in the database and store their IDs
    const createdUsers = await User.bulkCreate(users, { returning: true });

    // Generate random blog post data with user associations
    const blogPosts = [
      { title: 'Tech Post 1', content: 'Content for Tech Post 1', userId: createdUsers[0].id },
      { title: 'Tech Post 2', content: 'Content for Tech Post 2', userId: createdUsers[1].id },
      { title: 'Tech Post 3', content: 'Content for Tech Post 3', userId: createdUsers[2].id },
      { title: 'Tech Post 4', content: 'Content for Tech Post 4', userId: createdUsers[3].id },
      { title: 'Tech Post 5', content: 'Content for Tech Post 5', userId: createdUsers[0].id },
      { title: 'Tech Post 6', content: 'Content for Tech Post 6', userId: createdUsers[1].id },
    ];

    // Create blog posts in the database
    await BlogPost.bulkCreate(blogPosts);

    console.log('Data seeding completed.');
  } catch (error) {
    console.error('Data seeding error:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

// Call the seeding function
seedDatabase();
