const { User } = require('../models'); 

exports.createUser = async (req, res) => {
  try {

    const { username, email, password } = req.body;


    const user = await User.create({
      username,
      email,
      password, 
    });


    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {

    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Failed to create user', error });
  }
};

// Other user-related controller actions can be added here (e.g., login, profile, update, etc.)
