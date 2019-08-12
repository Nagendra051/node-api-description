require("../src/db/mongoose")
const User = require("../src/models/users")

// User.findByIdAndUpdate("5d4ad42dc5f6ba14403e7e86",{age: 1}).then((user)=>{
//         console.log(user)
//         return User.countDocuments({age:1})
// }).then((docCount)=>{
//     console.log(docCount)
// }).catch((error)=>{
//     console.log(error)
// })


const updateAgeandCount = async (id, age)=>{
    const user = User.findByIdAndDelete(id,{ age : age })
    const userCount = User.countDocuments(age)
    return userCount    
}

updateAgeandCount("5d4bb576c7b70a1df4b34d96",23).then((users)=>{
    console.log(users)
}).catch((error)=>{
    console.log(error)
})