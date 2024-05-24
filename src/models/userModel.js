import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username is Required'],
    },
    fullname: {
        type: String,
        require: [true, 'name is Required'],
    },
    email: {
        type: String,
        require: [true, 'email is Required'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Password is Required'],
    }
})

const User = mongoose.model('users', userSchema);

export default User;