const mongoose  = require('mongoose');
const { MongoDB } = require('winston/lib/winston/transports');

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        trim: true,
        required: true,
        lowercase:true,
        minlength: 1, 
        maxlength: 50,
    },
    lastname:{
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        minlength: 1,
        maxlength: 50,
    },
    middlename:{
        type: String,
        trim: true,
        lowercase: true,
        minlength: 0,
        maxlength: 50,
        default: ''
    },
    email:{
        type: String,
        trim: true,
        unique:true,
        lowercase:true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        maxlength: 255
    },
    phone:{
        type:String,
        trim:true,
    },
    password:{
        type: String,
        required: true,
    },
    status:{
        type:String,
        default:'active'
    }
});

userSchema.set('timestamps', true);
module.exports = mongoose.model('User', userSchema);