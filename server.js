const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initDb } = require("./database");
const staticRoutes = require("./routes/static");
const { graphqlHTTP } = require("express-graphql");
const GitHub = require("passport-github2").Strategy;

const schema = require("./schema/schema");
const utilities = require("./utilities/");

const buildRoute = require("./routes/build-route");
const carsRoute = require("./routes/cars-route");
const classificationRoute = require("./routes/class-route");
const authRoute = require("./routes/auth");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");



const app = express();

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

// Enable CORS globally
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Session + Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHub({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
})

// Swagger and GraphQL
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

// Basic routes
app.use(staticRoutes);
app.get("/", utilities.handleErrors((req, res) => {
  res.render("index", { title: "Home" });
}));

// Feature routes
app.use("/", buildRoute);
app.use("/", carsRoute);
app.use("/", classificationRoute);
app.use("/auth", authRoute);

// 404 handler
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

// Global error handler
app.use(async (err, req, res, next) => {
  console.error(`Error at "${req.originalUrl}": ${err.message}`);
  const message = err.status ? err.message : "Oh no! There was a crash. Maybe try a different route?";
  res.render("errors/error", {
    title: err.status || "Server Error",
    message,
    status: err.status,
  });
});

// Database connection
const db = require("./models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("✅ Connected to the database!");
  })
  .catch((err) => {
    console.log("❌ Cannot connect to the database!", err);
    process.exit();
  });

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
