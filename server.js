import express, { response } from "express"
import mongoose from "mongoose" 
import cors from "cors"; 
import Players from "./Players.js";

mongoose.connect('mongodb+srv://yasow83861:NOLHwkpm8jRXaC6n@cluster0.3add8.mongodb.net/blog')
.then(() => console.log('Database is connecting!'))
.catch((err) => console.log('Error', err))

const app = express()
app.use(cors())
app.use(express.json())

app.post('/add/player', async(req, res) => {
    const newPlayer = new Players({
        name: req.body.myName,
        count: 0,
    })
    await newPlayer.save()
    res.json({response: 'Вы успешно зарегистрировались'})
})

app.post('/get/counts', async(req, res) => {
    const findPlayer = await Players.findOne({name: req.body.myName})
    res.json({response: findPlayer.count})
})

app.patch('/update/counts', async(req, res) => {
    await Players.findOneAndUpdate({name: req.body.parsedName}, {count: req.body.counts}, {new: true})
})

app.get('/get/all', async(req, res) => {
    const allPlayers = await Players.find()
    res.json({response: allPlayers})
})

app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('SERVER OK')
})