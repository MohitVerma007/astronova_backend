import userModel from "../models/userModel.js";

// Get User API
export const getsingleUserController = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  res.status(200).json({
    user,
  });
};

// Get User API
export const getUserController = async (req, res) => {
  const user = await userModel.find({});
  res.status(200).json({
    user,
  });
};

// fetch by id
export const getbyid = async (req, res) => {
  try {
    const fetchid = req.params.id;
    const user = await userModel.findOne({ sid: fetchid }).exec();
    res.send(user);
  } catch (error) {
    // Handle the error appropriately
    res.status(500).json({ error: "Internal server error" });
  }
};
// Update User API

export const updateUserController = async (req, res, next) => {
  const { name, mobile, bio, location } = req.body;

  try {
    const user = await userModel.findOne({ _id: req.user.userId });
    console.log(user.sid);
    const profileImg = req.files?.profileImg?.[0]?.originalname;
    const coverImg = req.files?.coverImg?.[0]?.originalname;

    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;
    user.sid = user.sid;
    user.name = name;
    user.location = location;
    user.mobile = mobile;
    user.bio = bio;

    await user.save();

    const token = user.createJWT();

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
