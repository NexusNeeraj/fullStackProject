const User = require("../models/User");
const jwt = require("jsonwebtoken");


const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ token, user: { id: newUser._id, username, email } });

    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, user: { id: user._id, username: user.username, email } });

    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
};