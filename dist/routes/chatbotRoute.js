"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbot_1 = require("../controllers/chatbot");
const router = (0, express_1.Router)();
router.post("/chatbot", chatbot_1.chatbot);
router.get("/chatbot/messages", chatbot_1.messagesArray);
router.get("/chatbot/:id", chatbot_1.databaseReply);
exports.default = router;
