const bcrypt = require('bcrypt');
const { User } = require('../../models'); // Import your User model

// Controller action to handle user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user record in the database with the hashed password
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // Handle the rest of the registration logic
    // ...
  } catch (error) {
    // Handle registration errors
    console.error('Error registering user:', error);
    // ...
  }
};
