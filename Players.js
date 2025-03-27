import mongoose from "mongoose";

const Players = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    }
})

export default mongoose.model('Socket', Players)