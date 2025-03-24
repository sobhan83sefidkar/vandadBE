import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const user = req.body
    try {
        const checkUser = await User.findOne({ username: user.username })

        if (checkUser) {
            return res.status(409).json({ notification: { success: false, message: "کاربر تکراری" } })
        }
        if (user.password.length < 6) {
            return res.status(400).json({ notification: { success: false, message: "پسوورد باید حداقل 6 کارکتر باشد" } })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)

        const payload = {
            username: user.username,
            password: hash
        }

        const newUser = new User(payload)
        await newUser.save()

        res.status(200).json({ notification: { success: true, message: "با موفقیت ثبت نام شد." } })
    } catch (err) {
        res.status(500).json({ notification: { success: false, message: err.message || err  } })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ notification: { success: false, message: "کاربری یافت نشد" } })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(404).json({ notification: { success: false, message: "کاربری یافت نشد" } })
        }

        const tokenData = {
            id: user._id,
            admin: user.admin
        }
        const token = await jwt.sign(tokenData, process.env.jwt, { expiresIn: "1d" })

        const tokenOptions = {
            sameSite: 'none',
            maxAge: 1000 * 60 * 30,
            secure: true,
        }

        res.status(200).cookie("token", token, tokenOptions).json({ notification: { success: true, message: "با موفقیت وارد شدید" , username : user.username , admin : user.admin } })
    } catch (err) {
        res.status(500).json({ notification: { success: false , message: err.message || err}})
    }
}
export const logout = async (req , res) => {
    try{
        res.status(200).cookie("token", "").json({ notification: { success: true, message: "شما از حساب خود خارج شدید" } })
    }catch(err){
        res.status(500).json({ notification: { success: false , message: err.message || err}  })
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({ notification: { success: true, message: "athentticated" , username : req.user.username , admin : req.user.admin}});
    } catch (err) {
        res.status(500).json({ notification: { success: false , message: err.message || err}  })
    }
}

export const getUser = async (req , res) => {
    try{
        const users = await User.find({ admin: false }).select("-password")
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({ notification: { success: false , message: err.message || err}  })
    }
}
