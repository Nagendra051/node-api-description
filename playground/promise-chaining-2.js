require("../src/db/mongoose")
const Task = require("../src/models/tasks")

Task.findByIdAndDelete("5d4a66d5f447b21c04e6c42c").then((task)=>{
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((task)=>{
    console.log(task)
}).catch((error)=>{
    console.log(error)
})