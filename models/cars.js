// models/Car.js
// const mongoose = require("mongoose");

// const CarSchema = new mongoose.Schema({

// });

// module.exports = mongoose.model("cars", CarSchema);
// This code defines a Mongoose model for a car with the specified fields. The model is exported so it can be used in other parts of the application.

module.exports = (mongoose) => {
  const Car = mongoose.model(
    'cars',
    mongoose.Schema({
      make: {
        type: String,
        required: true
      },
      model: {
        type: String,
        required: true
      },
      year: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      images: {
        main: String,
        thumbnail: String
      },
      price: {
        type: Number,
        required: true
      },
      miles: {
        type: Number,
        required: true
      },
      color: {
        type: String,
        required: true
      },

      classification: {
        type: String,
        required: true
      }
    }, {
      timestamps: true
    })
  );

  return Car;
};