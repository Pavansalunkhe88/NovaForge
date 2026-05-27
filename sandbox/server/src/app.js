import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get("/api/sandbox/health",(req,res)=>{
    res.send("hello world sandbox")
})

export default app;