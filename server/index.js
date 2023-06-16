import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

//GET / task

//DELETE /task/delete

//PUT / task

app.listen(PORT, () => {
    console.log(`The server is Running on Port ${PORT} 🚀`);
  });