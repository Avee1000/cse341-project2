const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const { initDb } = require("./database");
const static = require("./routes/static");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const utilities = require("./utilities/");

const app = express();

const buildRoute = require("./routes/build-route.js");
const carsRoute = require("./routes/cars-route");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.use(static)
app.get("/", utilities.handleErrors((req, res) => {
    res.render("index", { title: "Home" });
}))
app.use("/", buildRoute);
app.use("/", carsRoute);
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})



// app.use((err, req, res, next) => {
//   console.error("🔥 Global error handler:", err.message);
//   res.status(500).json({ error: "Something went wrong" });
// });
/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: message,
    status: err.status,
  })
})

// const PORT = process.env.PORT || 8080;
// // First connect to DB, then start server
// initDb()
//   .then(() => {
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to MongoDB:", err);
//     process.exit(1);
//   });
const db = require('./models');
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log('✅ Connected to the database!');
  })
  .catch((err) => {
    console.log('❌ Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 8000;
console.log(`Server is running on http://localhost:${PORT}`);
app.listen(PORT);