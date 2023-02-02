const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../../config");
const User = require("../../models/User");

const genereteAccessToken = (_id) => {
  const payload = { _id };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { username, password } = req.body;
    const candidate = await User.findOne({ username });

    if (candidate) {
      return res
        .status(400)
        .json({ message: "User with this name allready exists" });
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const newUser = new User({
      username,
      password: hashPassword,
      cartItems: [],
      orderList: [],
      personalData: {
        name: "",
        phone: "",
        city: "",
        street: "",
        house: "",
        flat: "",
        comment: "",
        cashPay: false,
        onlinePay: false,
      },
    });

    const user = await newUser.save();
    const token = genereteAccessToken(user._id);

    return res.json({
      token: token,
      cartItems: user.cartItems,
      personalData: user.personalData,
      orderList: user.orderList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User '${username}' is not found` });
    }

    const isValidPass = bcrypt.compareSync(password, user.password); // Сравниваем пароли
    if (!isValidPass) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = genereteAccessToken(user._id);
    return res.json({
      token: token,
      cartItems: user.cartItems,
      personalData: user.personalData,
      orderList: user.orderList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login error" });
  }
};
// Функция, проверающая авторизованы ли мы
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: `User is not found`,
      });
    }

    res.json({
      cartItems: user.cartItems,
      personalData: user.personalData,
      orderList: user.orderList,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "No access",
    });
  }
};

const updateData = async (req, res) => {
  const { personalData, orderList } = req.body.data;

  try {
    const date = new Date();
    const orderDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;

    const updateUser = await User.findByIdAndUpdate(
      req.userId,
      {
        personalData: personalData,
        cartItems: [],
        $push: { orderList: { date: orderDate, order: orderList } },
      },
      { new: true }
    );

    res.json({
      personalData: updateUser.personalData,
      cartItems: updateUser.cartItems,
      orderList: updateUser.orderList,
    });
  } catch (error) {
    res.json({ message: "An error occurred while updating the data" });
  }
};

const updateCartItems = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, {
      cartItems: req.body.data.cartItems,
    });

    res.json(user);
  } catch (error) {
    console.log("Error updating the bucket: ", error);
    res.status(500).json("Error updating the bucket");
  }
};

module.exports = {
  registration,
  login,
  getMe,
  updateData,
  updateCartItems,
};
