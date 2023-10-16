const mongoose = require('mongoose');


const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        unique: true
    }
})

const Budget = mongoose.model('budget', budgetSchema)

module.exports = Budget;