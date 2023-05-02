const express = require("express")
const router = express.Router()
// const { usermodel } = require('../database')
// const { body, validationResult } = require('express-validator');

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const jwtSecret = "mynameisisdfhhfdoifhihghikdhfh"

const { answermodel } = require('../database')


router.post('/',

    async (req, res) => {

        // console.log(req.body.name)
        // console.log(req.body.email)
        // console.log("2"+ req.body.score)

        

        try {
            await answermodel.create({
                'name': req.body.name,
                'email': req.body.email,
                'score': req.body.score,
                'duration': req.body.duration
            })

            console.log("Answers saved successfully.")
            res.send({ success: true })

        }
        catch (err) {
            // console.log("Error in saving answers. Try again.")
            console.log(err)
            res.send({ success: false })
        }
    }
)

module.exports = router;