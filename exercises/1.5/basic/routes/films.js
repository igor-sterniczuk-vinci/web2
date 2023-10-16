var express = require('express');
var router = express.Router();

const films = [
  {
    id: 1,
    title: 'Star Wars: The Phantom Menace (Episode I)',
    duration: 136,
    budget: '115',
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace',
  },
  {
    id: 2,
    title: 'Star Wars: Episode II – Attack of the Clones',
    duration: 142,
    budget: 115,
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_II_%E2%80%93_Attack_of_the_Clones',
  },
  {
    id: 3,
    title: "Zack Snyder's Justice League",
    duration: 242,
    budget: 70,
    link: 'https://en.wikipedia.org/wiki/Zack_Snyder%27s_Justice_League',
  },
];

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query?.['minimum-duration']
    ? Number(req.query['minimum-duration'])
    : undefined;

  if (minimumFilmDuration === undefined) return res.json(films);

  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.sendStatus(400); // bad practise (will be improved in exercise 1.5)

  const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
});

// Read a film from its id in the menu
router.get('/:id', (req, res) => {
  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404); // bad practise (will be improved in exercise 1.5)

  return res.json(films[indexOfFilmFound]);
});

// Create a film
router.post('/', (req, res) => {
  const title =
    req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined; //si le la valeur recuperer nest pas vide le titre prend sa valeur sinon undefined
  const link =
    req?.body?.content?.trim().length !== 0 ? req.body.link : undefined; //si le la valeur recuperer nest pas vide le titre prend sa valeur sinon undefined
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0 //on regarde le type de la duration recuperer si ce n'est pas un nombre ou bien si la duration est negative on lui donne la valeur undefineted
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0 //on regarde le type de la duration recuperer si ce n'est pas un nombre ou bien si la duration est negative on lui donne la valeur undefineted
      ? undefined
      : req.body.budget;

  if (!title || !link || !duration || !budget) return res.sendStatus(400); // bad practise (will be improved in exercise 1.5) //verification de toutes les variables, si une des variables nest pas bonne on renvoie erreur 400

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined; //recherche de l'indice le plus grand de la table
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = { id: nextId, title, link, duration, budget }; //creation dun nouveau film

  films.push(newFilm); //ajout du nouveasu film

  return res.json(newFilm); //affichage du nouveau film
});

module.exports = router;