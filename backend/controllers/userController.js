import User from "../models/User.js";

// GET /api/users/me
export const getMe = async (req, res) => {
  return res.json(req.user); // req.user is already set by the middleware
};

// PUT /api/users/me -> Update my skills
export const updateMe = async (req, res) => {
  const { skillsOffered, skillsWanted } = req.body;

  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { skillsOffered, skillsWanted },
      { returnDocument: "after" },
    ).select("-password");

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/users -> get all users except me
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password",
    );
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
