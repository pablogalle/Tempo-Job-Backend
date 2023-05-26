const express = require('express');
const chatCtrl = require('../controllers/chats.controller');
const router = express.Router();

router.get('/:userId', chatCtrl.getChatsByUserId);
router.get('/:chatId/messages', chatCtrl.getMessagesByChatId);
router.post('/', chatCtrl.insertChat);
router.post('/:chatId/messages', chatCtrl.postMessageInChat)


module.exports = router;