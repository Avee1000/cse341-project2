const models = require("../models/sample");
const sampleCont = {};

sampleCont.listings = async (req, res, next) => {
try {
    const listings = await models.getUserCollection();
    const listingsArray = await listings.find({}).toArray();
    console.log("✅ Query successful, listings retrieved:", listingsArray.length);
    res.json(listingsArray);
  } catch (err) {
    console.error("❌ Query failed:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = sampleCont;