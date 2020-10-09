import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    body: {
        type:String,
        required: true
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    category: String,
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comment' }]
},
{timestamps: true}
)

export const Blog = mongoose.model('blogs', blogSchema);
