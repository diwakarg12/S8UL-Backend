import { application } from "express";
import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'

const signup = async (req, res) => {
    const { fullname, username, email, password, } = req.body;

    if (!fullname || !username || !email || !password) {
        return res.status(400).json({ message: 'Please fill in the fields' })
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        return res.status(400).json({ message: 'User Already Exist with the given Email' })
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newuser = new User({
        fullname,
        username,
        email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newuser.save();
        res.status(201).json({ message: 'User Created Successfully', user: savedUser })
    } catch (error) {
        res.status(500).json({ message: 'Error Creating user', error })
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({ message: "Please provide Email and Password" })
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not Found with the given Email' })
    }

    const isPasswordMatching = bcryptjs.compare(password, user.password);
    if (!isPasswordMatching) {
        return res.status(400).json({ message: 'Password is not Matching' })
    }

    return res.status(200).json({ message: 'Logged In Successfully', user })
}

const resetPassowrd = async (req, res) => {
    const { password, confirmPassword } = req.body;
    const { token } = req.query;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password and conformPassword is not Matching' })
    }

    if (!token) {
        return res.status(500).json({ message: 'Invalid Token' })
    }

    const user = await User.findOne({ token });
    if (!user) {
        return res.status(400).json({ message: 'No user Found with the Given Token' })
    }
    user.password = password
    const changedPassword = await user.save();

    res.status(200).json({ message: 'Password Changed Successfully', user: changedPassword })
}

const logout = async (req, res) => {
    const user = User.findById(req?.user?._id)

    return res.status(200).json({ message: 'Logged out Successfully', user })
}

export { signup, signin, resetPassowrd, logout };