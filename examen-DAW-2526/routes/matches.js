import express from 'express';
import Match from '../models/match.js';
import Referee from '../models/referee.js';

const router = express.Router();

// Listado de partidos
// TODO EXAMEN: carga los datos completos del árbitro asociado al mostrar el listado de partidos.
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find(req.params.matches);
    res.render('matches_list.njk', { matches: matches });
  } catch (err) {
    console.log(err.message);
    res.render('error.njk', { error: 'Error cargando partidos' });
  }
});

// TODO EXAMEN:

// GET /matches/:id/referee -> mostrar partido + seleccionar árbitros

router.get('/:id/referee', async (req, res) => {
  try {
    // // const matches = router.get(matches);
    // const matches = await Match.find(req.params.id);

    // if (matches.length > 0) {
    //   res.render('matches_referees', { matches: matches });
    // }

    // let nuevoReferee = new Referee({
    //   name: req.body.name,
    //   licenseNumber: req.body.licenseNumber
    // });

    // nuevoReferee.save().then(resultado => {
    //   // es matches ?
    //   res.render('matches_referees', { referee: resultado });
    // });
  } catch (e) {
    res.render('error', { error: e });
  }
});

// POST /matches/:id/referee -> asignar árbitro y redirigir a partidos

router.post('/:id/referee', async (req, res) => {
  try {
    const { name, licenseNumber } = req.body;

    if (!name || !licenseNumber) {
      return res.render('error', { error: error });
    }
    const existingMatch = await Match.findById(req.params.id);
    const existingReferee = await Referee.findById(req.params.id);

    if (!existingMatch) {
      returnres.render('error', { error: error });
    }
    if (!existingReferee) {
      return res.render('error', { error: error });
    }

    const refereeActiveOnDifferentMatch = await Match.findOne({
      "Match.referee": referee,
    });
    const refereeActiveOnMatch = await Match.findOne({
      "Match.referee": referee,
      "Match.active": true,
    });

    if (refereeActiveOnDifferentMatch) {
      return res.render('error', { error: error });
    }
    if (refereeActiveOnMatch) {
      return res.render('error', { error: error });
    }

    const activeInThisMatch = existingMatch.Match.find(
      (r) => r.referee.toString() === referee.toString());

    if (activeInThisMatch) {
      return res.render('error', { error: 'referee is already active in this Match' });
    }
    const Match = new Match(req.body);
    Match.Match.push({ name, licenseNumber });

    const updatedMatch = await Match.save();

    const populatedMatch = await Match.findById(req.params.id).populate(
      "Match.referee"
    );

    return res.render('error', { error: "The referee was added succesfully" });
  } catch (e) {
    return res.render('error', { error: "Internal server error " });
  }
});

// if (matches) {
//   res.render('matches_list', { matches: matches });
// }

export default router;
