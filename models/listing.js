const { ref } = require('joi');
const mongoose = require('mongoose');
const Review = require('./review.js')



    const listingSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            // required : true
        },
        image: {
            path: {
                type:String
            },
            filename: {
                type:String
            },
            // default: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            // set: (v) => v === "" ? "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        },
        price: {
            type: Number,
        },
        location: {
            type: String,
            // required : true
        },
        country: {
            type: String,
            // required : true
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }],
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    })

listingSchema.post("findOneAndDelete", (async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
}))

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;