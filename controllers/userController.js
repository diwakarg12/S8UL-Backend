import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'

const signup = async (req, res) => {
    const { fullname, username, email, password, } = req.body;

    if (!fullname || !username || !email || !password) {
        return res.status(400).json({ message: 'Please fill in the fields' })
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400).json({ message: 'User Already Exist with the given Email' })
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

export { signup };