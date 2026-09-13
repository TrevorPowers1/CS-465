const { pageData } = require('./main');

// Module Two renders the HBS page; JSON trip data is introduced in Module Three.
const travel = (req, res) => res.render('travel', pageData('travel'));

module.exports = { travel };
