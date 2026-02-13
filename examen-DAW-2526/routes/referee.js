// TODO CRUD de árbitros pendiente de implementar
// - GET /referees
// - GET /referees/new
// - POST /referees/new
// - GET /referees/:id
// - PUT /referees/:id
// - DELETE /referees/:id

import express from 'express';
import Match from '../models/match.js';
import Referee from '../models/referee.js';

const router = express.Router();

// Listado de partidos
// TODO EXAMEN: carga los datos completos del árbitro asociado al mostrar el listado de partidos.
router.get('/', async (req, res) => {

    Referee.find().then(resultado => {
        res.render('referees_list.njk', { referees: resultado });
    }).catch(error => {
        res.render('error', { error: error.message });
    });
});

router.get('/new', async (req, res) => {

    try {
        let nuevoReferee = new Referee({
            name: req.body.name,
            licenseNumber: req.body.licenseNumber
        });

        nuevoReferee.save().then(resultado => {
            res.render('referees_list', { referee: resultado });
        });
    } catch (e) {
        res.render('error', { error: e });
    }
});

router.post('/new', async (req, res) => {
    try {
        const referee = await referee.findById(req.params.id);

        if (licenseNumber)

            if (referee) {
                res.render('referees', { referee: referee });
            } else {
                res.render('error', { error: error.message });
            }
    } catch (e) {
        res.render('error', { error: e.message });
    }
});

// Borrado de Árbitro

router.delete("/:id", async (req, res) => {
    try {
        const activeReferee = await Match.findOne({
            "match.Referee": req.params.id,
            "match.active": true,
        });

        if (activeReferee) {
            return res.render('error', { error: 'error' });
        }
        const deletedReferee = await Referee.findByIdAndDelete(req.params.id);

        if (!deletedReferee) {
            res.render('error', { error: 'error' });
        }
        return res.render('referees_list', { referee: deletedReferee });
    } catch (e) {
        res.render('error', { error: e.message });
    }
});

export default router;
