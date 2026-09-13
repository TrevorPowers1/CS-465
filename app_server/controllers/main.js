// Shared view data supplies titles and active navigation to the partials.
const pageData = page => ({
  title: 'Travlr Getaways',
  navigation: ['index', 'travel', 'rooms', 'meals', 'news', 'about', 'contact'].map(name => ({
    label: name === 'index' ? 'Home' : name[0].toUpperCase() + name.slice(1),
    url: name === 'travel' ? '/travel' : '/' + name + '.html',
    active: name === page
  }))
});

const index = (req, res) => res.render('index', pageData('index'));

module.exports = { index, pageData };
