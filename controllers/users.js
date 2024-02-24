const User = require("../models/user.js");

// 1. SignUp Route
module.exports.renderSignupForm = (req, res) => {
  // res.send("form");
  res.render("users/signup.ejs");
};

// 2. Create Route
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    console.log(`New User :- ${registeredUser}`);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", `Hi @${username}!  Welcome to Wanderlust`);
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// 3. Login Route
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// 4. Login Validation Route
module.exports.login = async (req, res) => {
  let { username } = req.body;
  req.flash(
    "success",
    `Welcome to Wanderlust! You are logged in as @${username}`
  );
  if (res.locals.redirectUrl) res.locals.redirectUrl = res.locals.redirectUrl;
  else res.locals.redirectUrl = "/listings";
  res.redirect(res.locals.redirectUrl);
};

// 5. Logout Route
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    if (res.locals.deleted.length === 0)
      req.flash("success", "You are logged out!");
    else req.flash("deleted", res.locals.deleted[0]);
    res.redirect("/listings");
  });
};

// 6. Delete Route
module.exports.deleteUser = async (req, res, next) => {
  let user = await User.findByIdAndDelete(res.locals.currUser._id);
  console.log(`User deleted : ${user}`);
  req.flash("deleted", `@${user.username}, you're Account has been deleted.`);
  res.redirect("/logout");
};
