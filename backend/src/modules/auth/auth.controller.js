import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
