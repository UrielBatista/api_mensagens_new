const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/postManagerDB',{useNewUrlParser:true,useUnifiedTopology:true},
    err => {
        if (!err)
            console.log('Mongodb connectado com sucesso!.')
        else
            console.log('Erro ao connectar ao MongoDB : ' + JSON.stringify(err, undefined, 2))
    })