const Chat = require('../models/chats.model');
const UserProfile = require('../models/perfil.model')

const chatsCtrl = {};

chatsCtrl.getChatsByUserId = async (req, res) => {
    const userId = req.params.userId
    try {
        const chats = await Chat.find({
            $or: [
                {'users.appliant.userId': userId},
                {'users.contractor.userId': userId}]
        })
            .then((data) => {
                if (data != null) res.json(data).status(200)
                else res.json({message: "No chats found for id: " + req.params.userId}).status(404)
            })
            .catch(err => console.log(err))
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


chatsCtrl.getMessagesByChatId = async (req, res) => {
    const myChat = await Chat.findById(req.params.chatId)
        .then( (data) => {
            if (data != null) res.json(data.messages)
            else res.json({message: "Chat doesnt exist"})
        })
        .catch(err => console.log(err))
}


chatsCtrl.postMessageInChat = async (req, res) => {
    try{
        const chatId = req.params.chatId;
        const message = req.body;

        await Chat.findByIdAndUpdate(
            chatId,
            {$push: {messages: message}},
            {new: true}
        );
        res.status(200).json({message:'Message sent successfully'});
    }catch (error){
        res.status(500).json({error: error.message})
    }
}

chatsCtrl.insertChat = async (req, res) => {

    const myChat = new Chat(req.body);
    try {

        const createdChat = await myChat.save()
        await UserProfile.updateMany(
            {
                $or: [
                    {_id: myChat.users.appliant.userId},
                    {_id: myChat.users.contractor.userId}
                ]
            },
            {
                $push: {chats:createdChat._id}
            }
        );
        res.json({message: 'Chat Successfully Created'}).status(200)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


module.exports = chatsCtrl;