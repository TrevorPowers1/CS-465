const mongoose = require('mongoose');
const { pageData } = require('./main');

const Trip = mongoose.model('trips');

const travel = async (req, res, next) => {
  try {
    const trips = await Trip.find({}).lean();

    const data = pageData('travel');
    data.trips = trips;

    res.render('travel', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { travel };