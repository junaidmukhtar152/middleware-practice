// Middleawre -Important practical Pattern
//1. Request ko check/read  krna

//2. res.send ()  Agar koi prob ho

//3. next() Agar sb thik ha
// ---------------------------------------
// const express = require("express");
// const app = express();
// const logger = (req, res, next) => {
//   console.log(req.method);
//   console.log(req.url);
//   next();
// };
// const userChceck = (req, res, next) => {
//   console.log("User Checked");
//   next();
// };

// const ageCheck = (req, res, next) => {
//   console.log("Age checked");
//   next();
// };

// app.get("/profile" ,logger, userChceck, ageCheck, (req, res) => {
//   res.send("Profile Page");
// });
// ==============================================
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use("/users",userRoutes); //mounting 

// Logger Middleware
const logger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  next();
};

// Authentication Middleware
const checkAuth = (req, res, next) => {
  req.user = {
    name: "Junaid",
    role: "admin",
  };

  next();
};

// Authorization Middleware
const checkAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).send("Access Denied");
  }
};

// Validation Middleware
const validateData = (req, res, next) => {
  if (!req.body.name || req.body.name.trim() === "") {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  next();
};

// Route
app.post(
  "/profile",
  logger,
  checkAuth,
  checkAdmin,
  validateData,
  (req, res) => {
    res.json({
      message: "Profile created",
      name: req.body.name,
    });
  },
);



app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
