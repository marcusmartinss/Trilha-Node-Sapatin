const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const Task = require('../models/Task');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,        
    },
    password: {
        type: String,
        required: true,
        select: false, // quando for listar não mostrará a password
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: Task }],
});

UserSchema.pre('save', async function(next) { // pre existe para que aconteça algo antes de ser salvo
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;