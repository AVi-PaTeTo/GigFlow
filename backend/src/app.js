import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io"
import 'dotenv/config'

import connectDB from './db.js'
import userRoutes from './routes/users.js'
import gigRoutes from './routes/gigs.js'
import bidRoutes from './routes/bids.js'
import authRoutes from './routes/auth.js'

const app = express();

app.use(cors({ 
                origin: 'http://localhost:5173',
                credentials: true
            }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

const PORT = process.env.PORT || 1000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();