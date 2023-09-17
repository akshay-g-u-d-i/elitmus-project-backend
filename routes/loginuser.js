const express = require("express")
const router = express.Router()
const { usermodel } = require('../database')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = "ThisIsTheSecretKeyForGeneratingJsonWebTokens"

router.post('/',
    async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        try {

            let userdata = await usermodel.findOne({ email });

            if (!userdata) {
                return res.send({ success: false, email: false });
            }

            const isMatch = await bcrypt.compare(password, userdata.password);

            if (!isMatch) {
                return res.send({ success: false, email: true });
            }
            else {

                // const data = {
                //     user: {
                //         id: userdata.id,
                //     }
                // }

                const authTkn = jwt.sign("randomuser", jwtSecret)
                

                return res.send({ success: true, authTkn: authTkn, userdata: userdata })
            }

        }

        catch (err) {
            console.log("Error in finding email");
            return res.send({success: false});
        }
    }

)

module.exports = router;