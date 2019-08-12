const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        trim :true
    },
    email : {
        type : String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                   throw new Error("Email is invalid") 
            }    
        }
    },
    password : {
        type: String,
        minlength : [7,"Password must be greater than 6 charaters"],
        required : true,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes("password") ){
                 throw new Error("Please try some other password")   
            }
        }


    },
    age : {
        type : Number,
        default:0,
        validate(value){
                if(value<0){
                    throw new Error("Age must be positive number")
                }
        }
    },
    tokens : [{
        token:{
            type: String,
            required : true
        }
    }]
})

userSchema.virtual("tasks",{
    ref: "Task",
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.tokens
    delete userObject.password
    delete userObject.__v
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
        const user = this
        console.log(user)
        const token = jwt.sign({_id:user._id.toString()},"thisismycourse")
        user.tokens = user.tokens.concat({token})
        await user.save()
        return token
}

userSchema.statics.findbyCredentials = async (email, password) => {
        const userInfo = await user.findOne({email})
        if(!userInfo){
            return {"error":"Emailid not found"}
        }
        const isMatched = await bcrypt.compare(password,userInfo.password)
        if(!isMatched){
            return {"error":"invalid password provided"}
        }
        return userInfo

}

userSchema.pre("save",async function(next){
    const user = this

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8)
    }
    
    next()

})




const user = mongoose.model("Users",userSchema)


module.exports = user