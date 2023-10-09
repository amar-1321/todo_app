import express from "express";
import apiRoute, { apiProtected } from "./routes/api.js";
import mongoose from "mongoose";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from "cors"
import path from "path";
import dotenv from 'dotenv';


dotenv.config({path:path.join("config/config.env")})

const app = express();
mongoose.connect(process.env.DB_CONNECT, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
  
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    
  });


app.use(cors());
app.use(express.json());
app.use('/api/', apiRoute);
app.use('/api/', AuthMiddleware,apiProtected);

app.listen(process.env.PORT,()=>console.log(`server is running on ${process.env.PORT} in port`))
