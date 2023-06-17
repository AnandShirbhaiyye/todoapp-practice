import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';
dotenv.config();

const app = express();
app.use(express.json());

async function connectMongoDB(){
  const conn = await mongoose.connect(process.env.MONGODB_URL);
  if(conn)
  {
    console.log("Connected to MongoDB");
  }
}
connectMongoDB();


const PORT = process.env.PORT || 5000;

app.get('/health', (req, res)=>{
  res.json({
    success: true,
    message:"All Good🥳🥳"
  })
})

//POST /task
app.post('/task', async(req, res)=>{
  const {title, description} = req.body;

  const newTask = new Task({
    title: title,
    description: description
  })

  const savedTask = await newTask.save();

  res.json({
    success: true,
    message: ' Task Saved Successfully...',
    data: savedTask
  })
});

//GET /tasks
app.get('/tasks', async(req, res)=>{
  const tasks = await Task.find();

  res.json({
    success: true,
    message: "All tasks fetched successfully",
    data: tasks
  })
});

//GET / task
app.get('/task', async(req, res)=>{
  const taskId = req.query.taskId;

  let task;
  try{
    task = await Task.findById(taskId);
  }
  catch(e){
    return res.json({
      success: false,
      message: e.message,
      data: []
    });
  }

  if(!task){
    return res.json({
      success: false,
      message: 'Task not found',
      data: []
    });
  }

  res.json({
    success: true,
    message: 'Task successfully fetched',
    data: task
  })
})

//POST /task/delete
app.post("/task/delete", async(req,res)=>{
  const {taskId} = req.body;

  await Task.deleteOne({
    _id: taskId
  })

  res.json({
    success: true,
    message: "Task Successfully Deleted"
  });
})

//PUT / task

app.listen(PORT, () => {
    console.log(`The server is Running on Port ${PORT} 🚀`);
  });