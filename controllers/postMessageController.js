const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId


var { PostMessage } = require('../models/postMessage')

// GET
router.get('/', (req, res) => {
    PostMessage.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Erro ao buscar os dados na base : ' + JSON.stringify(err, undefined, 2))
    })
})

// INSERT / POST
router.post('/', (req, res) => {
    var newRecord = new PostMessage({
        title: req.body.title,
        message: req.body.message
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Erro ao criar dados: ' + JSON.stringify(err, undefined, 2))
    })
})

// UPDATE
router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Nada registrado com esse id : ' + req.params.id)

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message
    }

    PostMessage.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Erro ao atualizar os dados : ' + JSON.stringify(err, undefined, 2))
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Nada encontrado com esse id : ' + req.params.id)

    PostMessage.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Erro ao deletar dados : ' + JSON.stringify(err, undefined, 2))
    })
})


module.exports = router