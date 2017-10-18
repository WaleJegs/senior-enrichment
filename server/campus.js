const Campus = require('../db/models').Campus;
const api = require('express').Router();
const Student = require('../db/models').Student;

api.get('/', (req, res, next) => {
    Campus.findAll({})
        .then(campuses => {
            res.json(campuses);
        });
});


api.get('/:campusId', (req, res, next) => {
    Campus.findOne({
            include: [{ model: Student }],
            where: {
                id: req.params.campusId
            }
        })
        .then(campus => {
            res.json(campus)
        })
        .catch(next)
})

api.post('/', (req, res, next) => {
    Campus.create(req.body)
        .then(campus => {
            res.json(campus);
        })
        .catch(next);
});

api.put('/:campusId', (req, res, next) => {
    Campus.findOne({
            where: {
                id: req.params.campusId,
            }
        })
        .then((campus) => {
            campus.update(req.body)
                .then((newCampus) => {
                    res.json(campus);
                })
                .catch(next)
        })
        .catch(next)
})

api.delete('/:campusId', (req, res, next) => {
    Campus.destroy({
        where: {
            id: req.params.campusId
        }
    });
    // .then(() => {
    // 	res.redirect('/');
    // })
    // .catch(next);
});

module.exports = api;