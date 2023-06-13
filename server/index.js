import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

try {
  mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('Connected to DB 📦');
    }
  );
} catch (err) {
  console.log(`❌ Error:  ${err?.message}`);
}



app.listen(PORT, () => {
    console.log(`The server is Running on Port ${PORT} 🚀`);
  });