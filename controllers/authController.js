import counterModel from "../models/counterModel.js";
import userModel from "../models/userModel.js";

// Register Controller
export const registerController = async (req, res, next) => {
  const { name, email, password, bio, mobile, sid } = req.body;
  const profileImg = req.files?.profileImg?.[0]?.filename;
  const coverImg = req.files?.coverImg?.[0]?.filename;

  // Checking user exist or not

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    next("Email Already Register Please log in");
    const errorResponse = {
      error: "User already exists",
      message: "A user with the provided username or email already exists.",
    };
    // Return an error response with status code 409 (Conflict)
    return res.status(409).json(errorResponse);
  } else {
    if (!req.errors) {
      // Start counter Logic

      const auto = await counterModel.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seq: 1 } },
        { new: true }
      );

      let seqId;

      if (auto == null) {
        const newval = await new counterModel({ id: "autoval", seq: 1 });
        newval.save();
        seqId = 1;
      } else {
        seqId = auto.seq;
        console.log(`New seq Id : ${seqId}`);
      }

      // counter logic end
      const sid = seqId;

      // console.log("no errors");
      const user = await userModel.create({
        sid,
        name,
        email,
        password,
        mobile,
        bio,
        profileImg,
        coverImg,
      });

      user.profileImg = profileImg || user.profileImg;
      user.coverImg = coverImg || user.coverImg;
      const token = user.createJWT();
      res.status(201).send({
        success: true,
        message: "Congratulations, User Created Successfully",

        user: {
          sid: user.sid,
          name: user.name,
          email: user.email,
          profileImg: user.profileImg,
          coverImg: user.coverImg,
          mobile: user.mobile,
          bio: user.bio,
          location: user.location,
        },
        token,
      });
    }
  }
};

// Login Controller

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    next("Please provide all fields");
  }

  // find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Username or password");
  }

  // compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid username or password");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
