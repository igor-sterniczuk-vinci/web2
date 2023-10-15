var express = require('express');
var router = express.Router();

const FILMS = [
  {
    id: 1,
    title: 'The Godfather',
    duration: 175,
    budget: 100000,
    link: 'https://www.timeout.com/movies/the-godfather-1972',
  },
  {
    id: 2,
    title: 'La Dolce Vita',
    duration: 174,
    budget: 500000,
    link: 'https://www.timeout.com/movies/la-dolce-vita',
  },
  {
    id: 3,
    title: 'Seven Samurai',
    duration: 200,
    budget: 300000,
    link: 'https://www.timeout.com/movies/seven-samurai-1',
  },
];

// Read all the films from the list
router.get('/', (req, res, next) => {
  const orderbyDuration = 
    req?.query?.
  console.log('GET /films');
  res.json(FILMS);
});

module.exports = router;