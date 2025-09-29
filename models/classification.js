module.exports = (mongoose) => {
  const Classification = mongoose.model(
    'classifications',
    mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true // no duplicates like "Sports Car" twice
      },
      description: {
        type: String
      }
    }, {
      timestamps: true
    })
  );

  return Classification;
};