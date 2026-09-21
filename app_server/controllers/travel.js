const fs = require('fs');
const { pageData } = require('./main');

const trips = JSON.parse(
  fs.readFileSync('./data/trips.json', 'utf8')
);

const travel = (req, res) => {
  const data = pageData('travel');
  data.trips = trips;

  res.render('travel', data);
};

module.exports = { travel };