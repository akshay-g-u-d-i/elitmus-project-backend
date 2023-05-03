const express = require("express")
const router = express.Router()
const { usermodel } = require('../database')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "mynameisisdfhhfdoifhihghikdhfh"


router.post('/',

    async (req, res) => {

        // console.log(req.body.name)
        // console.log(req.body.email)
        // console.log(req.body.password)

        const salt = await bcrypt.genSalt(10);
        let secPasskey = await bcrypt.hash(req.body.password, salt)

        try {
            await usermodel.create({
                'name': req.body.name,
                'email': req.body.email,
                'password': secPasskey,
                'role': 'user'
            })

            // console.log("Sign up successful. Login with new credentials.")
            res.send({ success: true })

        }
        catch (err) {
            // console.log("Error. Try again.")
            res.send({ success: false })
        }
    }
)

module.exports = router;