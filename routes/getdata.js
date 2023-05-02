const express = require("express")
const router = express.Router()
const { answermodel } = require('../database')

router.get('/', (req, res, next) => {

    answermodel.find().sort( { "score": -1 , "duration": 1} )
    .then(data=>{

        res.send({
            testdata : data,
            success: true
        })
    })

    .catch(err=> res.send({
        success: false
    }))
}

)

module.exports = router;