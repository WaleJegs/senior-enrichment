const Student = require('../db/models').Student;
const api = require('express').Router();

api.get('/', (req, res, next) => {
    Student.findAll({})
        .then(students => {
            res.json(students);
        })
        .catch(next);

});

api.get('/:studentId', (req, res, next) => {
    Student.findOne({
            where: {
                id: req.params.studentId
            }
        })
        .then(student => {
            res.json(student)
        })
})


api.post('/', (req, res, next) => {
    Student.create(req.body)
        .then(student => {
            res.json(student);
        })
        .catch(next);
});

api.put('/:studentId', (req, res, next) => {
    Student.findOne({
            where: {
                id: req.params.studentId
            }
        })
        .then(student => {
            student.update(req.body)
                .then(newStudent => {
                    res.json(newStudent);
                })
                .catch(next);
        })
        .catch(next);
});

api.delete('/:studentId', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.studentId
        }
    })
});

module.exports = api;