const mongoose  = require('mongoose');
const { MongoDB } = require('winston/lib/winston/transports');

const todoSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:''
    },
    status:{
        type:String,
        enum:[
            'completed',
            'postponed',
            'created'
        ],
        default:'created'
    },
    due:{
        type: Date,
        required: true
    },
    postponedDates:[{
        type:Date
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }, 
    sharedWith:[{
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
        status:{
            type:String,
            enum:[
                'completed',
                'postponed',
                'created'
            ],
            default:'created'
        }
    }]
});

todoSchema.set('timestamps', true);
module.exports = mongoose.model('Todo', todoSchema);