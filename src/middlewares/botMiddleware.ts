import runChat from "../services/chatbotService";
import express, { Request, Response } from "express";

const botware = async (req: Request, res: Response) => {
    const message = req.body.message;
    const reply = await runChat(message);
    res.json(reply);
  }

export {botware}