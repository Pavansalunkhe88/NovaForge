import express from "express";
import morgan from "morgan";
import {createPod} from "./kubernetes/pod.js";
import {createService} from "./kubernetes/service.js";
import { v7 as uuid} from "uuid";

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Base route handler to prevent 404s
app.get("/api/sandbox", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the NovaForge Sandbox API Service",
        service: "sandbox-server",
        version: "1.0.0",
        endpoints: {
            base: "/api/sandbox",
            health: "/api/sandbox/health"
        }
    });
});

// Health check endpoint (retains 'hello world sandbox' response for absolute compatibility)
app.get("/api/sandbox/health", (req, res) => {
    res.status(200).send("hello world sandbox");
});

app.post("/api/sandbox/start", async (req, res) => {
    const sandboxId = uuid();

    await Promise.all([
        createPod(sandboxId),
        createService(sandboxId)
    ])

    return res.status(200).json({
        status: "success",
        message: "Sandbox environment created successfully",
        sandboxId: sandboxId,
        previewUrl: `http://{sandboxId}.preview.localhost` // Assuming a local development environment
    });
})


export default app;