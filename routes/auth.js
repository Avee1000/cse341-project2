const express = require("express");
const router = express.Router();
const passport = require("passport");


router.get("/", (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged out");
});

router.get('/login', passport.authenticate('github'), (req, res) => {});
// Root route — check login state
// router.get("/", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send(`✅ Logged in as ${req.user.username}`);
//   } else {
//     res.send("❌ Logged out");
//   }
// });

// GitHub OAuth callback route
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true, // enables session login
  }),
  (req, res) => {
      console.log("🎉 GitHub authentication successful!");
      req.session.user = req.user;
    // Passport automatically stores the user in the session
    res.redirect("/api-docs");
  }
);

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});


module.exports = router;