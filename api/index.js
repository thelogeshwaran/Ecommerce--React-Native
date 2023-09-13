const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

const url =
  "mongodb+srv://logeshwaran:logeshwaran@cluster0.xv6wujp.mongodb.net/";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((e) => {
    console.log("error", e);
    console.log("Error connecting to MongoDB");
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");

//endpoint to register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, password });

    await newUser.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.log("error while regitering", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log("error while logging in", error);
    res.status(500).json({ message: "Login failed" });
  }
});

//endpoint to add new address
app.post("/addresses", async (req, res) => {
  try {
    const { address, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Uset not found" });
    }

    user?.addresses?.push(address);

    await user.save();
    return res.status(200).json({ message: "Address added successfully" });
  } catch (e) {
    console.log("error while adding the address", e);
    res.status(500).json({ message: "Address Add failed" });
  }
});

//endpoint to get addresses
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Uset not found" });
    }

    const addresses = user.addresses;
    return res.status(200).json({ addresses });
  } catch (e) {
    console.log("error while fetching the address", e);
    res.status(500).json({ message: "Address fetch failed" });
  }
});
