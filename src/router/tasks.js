const express = require("express")
const Task = require("../models/tasks")
const auth = require("../middleware/auth")
const router = new express.Router()


router.post("/tasks",auth,async(req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
         await task.save()
        res.status(201).send(task)    
    } catch (error) {
        res.status(400).send(error)
    }

})


router.get("/tasks",auth,async(req,res)=>{

    try {
        //const task = await Task.find({owner: req.user._id})
        await req.user.populate("tasks").execPopulate()
        res.status(200).send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get("/tasks/:id",auth,async(req,res)=>{
        const _id = req.params.id
        try {
            const taskByID = await Task.findOne({_id,owner: req.user._id})
            if(!taskByID){
                return res.status(400).send()
            }
            res.status(200).send(taskByID)
        } catch (error) {
            res.status(500).send(error)
        }
})



router.patch("/tasks/:id",auth,async(req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
            return res.status(404).send({"error":"Invalid Inputs"})
    }
    
    try {
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        
        if(!task){
            res.status(404).send({"error":"user not found"})
        }
        
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()

        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

})


router.delete("/tasks/:id",auth,async(req, res)=>{
        try {
            const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
            if(!task){
                res.status(404).send({"Error":"Task not found"})
            }
            res.status(200).send(task)
        } catch (error) {
            res.status(400).send(error)
        }
})

module.exports = router
