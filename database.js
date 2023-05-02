const mongoose = require('mongoose')
const mongouri = process.env.DATABASE
const {Schema} = mongoose;


const mongodb = () => {

    mongoose
        .connect(mongouri)
        .then(() => {
            console.log("Mongodb connected")
        })
        .catch((err) => {
            console.log("Error occured")
        })
}



//Creating user schema

const userschema = new Schema({
    name : {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
    
},{timestamps: true})

const answerschema = new Schema({
    name : {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: String,
        required: true
    },
    duration: {
        type: Number, 
        required: true
    }
    
})

const usermodel = mongoose.model('user', userschema)
const answermodel = mongoose.model('savedanswer', answerschema)


module.exports = {
    mongodb,
    usermodel,
    answermodel
}