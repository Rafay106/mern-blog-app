import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User alreay exists");
    }

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  } catch (error) {
    const errStatus = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(errStatus);
    res.json({ error: error.message });
  }
};

// @desc    Login user/set token
// route    POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Both Email and Password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("User not found, please register");
    }

    if (await user.matchPasswords(password)) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Incorrect login details");
    }
  } catch (error) {
    const errStatus = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(errStatus);
    res.json({ error: error.message });
  }
};

// @desc    Logout user
// route    POST /api/users/logout
// @access  Private
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out." });
};

// @desc    Get a user profile
// route    GET /api/users/profile
// @access  Private
const getSelf = (req, res) => {
  const user = {
    _id: req.user._id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
  };
  res.status(200).json(user);
};

// @desc    Get a user profile
// route    GET /api/users/profile/:userId
// @access  Public
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    res.status(200).json(user);
  } catch (error) {
    const errStatus = res.statusCode == 200 ? 200 : res.statusCode;
    res.status(errStatus).json({ error: error.message });
  }
};

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.first_name = req.body.firstName || user.first_name;
      user.last_name = req.body.lastName || user.last_name;
      user.email = req.body.email || user.email;
      if (req.body.newPassword) {
        if (
          req.body.oldPassword &&
          (await User.matchPasswords(req.body.oldPassword))
        ) {
          user.password = req.body.newPassword;
        } else {
          res.status(403);
          throw new Error("Old password is incorrect");
        }
      }
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        message: "Updates are successful",
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  } catch (error) {
    const errStatus = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(errStatus);
    res.json({ error: error.message });
  }
};

// @desc    Delete user profile
// route    DELETE /api/users/profile
// @access  Private
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    } else {
      if (req.body.password && (await user.matchPasswords(req.body.password))) {
        const resp = await User.deleteOne({ _id: user._id });
        res.cookie("jwt", "", {
          httpOnly: true,
          expires: new Date(0),
        });
        res.status(200).json({
          acknowledged: resp.acknowledged,
          deletedCount: resp.deletedCount,
          message: "Successfully deleted user.",
        });
      } else {
        res.status(400);
        throw new Error("Incorrect password!");
      }
    }
  } catch (error) {
    const errStatus = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(errStatus);
    res.json({ error: error.message });
  }
};

export {
  loginUser,
  logoutUser,
  registerUser,
  getSelf,
  getUser,
  updateUser,
  deleteUser,
};
