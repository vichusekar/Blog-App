const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
const UserModel = require("../models/UserModel")
const { hashPassword, createToken, comparePassword } = require("../authentication/auth")
const BlogModel = require("../models/BlogModel")

router.post('/sign-up', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            req.body.password = await hashPassword(req.body.password)
            let newUser = await UserModel.create(req.body)
            newUser.save()
            res.status(200).send({ message: "Signup Successfully" })
        }
        else {
            res.status(400).send({ message: `User with ${req.body.email} already exist` })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                let token = await createToken(user)
                res.status(200).send({ message: "SignIn Successfully", token })
            }
            else {
                res.status(404).send({ message: "Invalid Credential" })
            }
        }
        else {
            res.status(404).send({ message: "kindly register" })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.post('/forgot-password/:id', async (req, res) => {
    try {
        const oldUser = await UserModel.findOne({ email: req.body.email })
        if (oldUser) {
            const passwordLink = `https://moonlit-blini-e4f542.netlify.app/${oldUser._id}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vigneshecom093@gmail.com',
                    pass: 'kznv npox aaxy nnvp'
                }
            })

            var mailOptions = {
                from: 'vigneshmsho093@gmail.com',
                to: req.body.email,
                subject: 'Reset your password ',
                text: `Kindly visit the link and change your password ${passwordLink}`,
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            res.status(200).send({ message: 'Email Sent Successfully' })

        }

        else {
            res.status(400).send({ message: `User with ${req.body.email} doesn't exists`, error: error?.message })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })

    }
})

router.post('/reset-password/:id', async (req, res) => {
    try {
        let user = await UserModel.findById({ _id: req.params.id })
        if (user) {
            user.password = await hashPassword(req.body.password)
            user.save()
            res.status(200).send({ message: "Password Changed Successfullt" })
        }
        else {
            res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.post('/create', async (req, res) => {
    try {
        let newBlog = await BlogModel.create(req.body)
        res.status(200).send({ message: "Blog Created Successfully", newBlog })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.get('/getBlogs', async (req, res) => {
    try {
        let blogs = await BlogModel.find()
        res.status(200).send({ message: "Blogs Fetched Successfully", blogs })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let blog = await BlogModel.findById({ _id: req.params.id })
        res.status(200).send({ message: "Blog Fetched Successfully", blog })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        let blogbyid = await BlogModel.findById({ _id: req.params.id })
        if (blogbyid) {
            let newBlog = await BlogModel.findByIdAndUpdate(req.params.id, req.body)
            newBlog.save()
            res.status(200).send({ message: "Blog Updated Successfully" })
        }
        else {
            res.status(400).send({ message: "something went wrong" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let blogbyid = await BlogModel.deleteOne({ _id: req.params.id })
        if (blogbyid) {
            res.status(200).send({ message: "Blog Deleted Successfully" })
        }
        else {
            res.status(400).send({ message: "something went wrong" })
        }

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

module.exports = router