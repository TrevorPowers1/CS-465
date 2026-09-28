const mongoose = require('./db');
const trips = require('../../data/trips.json');
const Trip = mongoose.model('trips');

const seedDB = async () => {
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
};

seedDB().then(async () => {
  await mongoose.connection.close();
  process.exit(0);
});