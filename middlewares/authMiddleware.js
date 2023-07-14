import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Auth Failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    // console.log(payload.UserId);
    // console.log(req);
    req.user = { userId: payload.UserId };
    next();
  } catch (error) {
    next("Auth Failed");
  }
};

export default userAuth;
