const express = require("express")
const router = express.Router()
const { usermodel } = require('../database')

router.get('/', (req, res, next) => {

    usermodel.find()
        .then(data => {

            // console.log(data)
            res.send({
                size: data.length,
                success: true
            })
        })
        .catch(err => {

            // console.log(err)
            res.send({
                success: false
            })
        })
}

)

module.exports = router;