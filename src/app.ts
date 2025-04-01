import express from 'express';
import {routes} from './routes/index'
import cors from "cors";

const app = express()
app.use(express.json())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: '*' 

}));
app.use(routes);

export default app;