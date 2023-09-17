const express = require("express")
const router = express.Router()
const { usermodel } = require('../database')
const { google } = require('googleapis');
const jwtdecode = require('jwt-decode')

router.post('/',
    async (req, res) => {
        const token = req.body.credentials.credential;
        // console.log(credentials);
        console.log(token)
        // const display = await getUserDetails(token);
        const profile = jwtdecode(token);
        // console.log(profile);
        // let gkey = "oUriU8GqbRw-avcMn95DGW1cpZR1IoM6L7krfrWvLSSCcSX6Ig117o25Yk7QWBiJpaPV0FbP7Y5-DmThZ3SaF0AXW-3BsKPEXfFfeKVc6vBqk3t5mKlNEowjdvNTSzoOXO5UIHwsXaxiJlbMRalaFEUm-2CKgmXl1ss_yGh1OHkfnBiGsfQUndKoHiZuDzBMGw8Sf67am_Ok-4FShK0NuR3-q33aB_3Z7obC71dejSLWFOEcKUVCaw6DGVuLog3x506h1QQ1r0FXKOQxnmqrRgpoHqGSouuG35oZve1vgCU4vLZ6EAgBAbC0KL35I7_0wUDSMpiAvf7iZxzJVbspkQ"

        // const isvalid = jwt.verify(token, gkey, { algorithms: ['RS256'] });
        // console.log(isvalid);

        const email = profile.email;

        try {
            var usersdata = await usermodel.findOne({ email });
        } catch (err) {
            console.log(err);
            return res.send({ success: false });
        }

        if (usersdata !== null) return res.send({ authTkn: token, userdata: usersdata, success: true });

        console.log("Creating new account...");

        try {

            const userdata = {
                'name': profile.name,
                'email': profile.email,
                'picture': profile.picture,
                'role': 'user'
            }

            await usermodel.create(userdata)
            console.log("Account created successfully")

            // console.log("Sign up successful. Login with new credentials.")
            return res.send({ authTkn: token, userdata: userdata, success: true })
            

        }
        catch (err) {
            // console.log("Error. Try again.")
            return res.send({ success: false })
        }


    }
)

module.exports = router;