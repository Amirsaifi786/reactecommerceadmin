

const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    orderItems: [],
    totalPrice: Number,
    isPaid: { type: Boolean, default:false }
},{ timestamps:true });

module.exports = mongoose.model("Order", orderSchema);
