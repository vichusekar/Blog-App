const express = require('express')
const blogModel = require('../model/BlogModel')
const router = express.Router()
const { hashPassword, comparePassword, createToken } = require('../authentication/Auth')
const nodemailer = require('nodemailer')
const userSchema = require('../model/UserModel')


router.post('/sign-up', async (req, res) => {
    try {
        req.body.password = await hashPassword(req.body.password)
        let user = await userSchema.create(req.body)
        user.save()
        res.status(200).send({ message: "Signup Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})


router.post('/sign-in', async (req, res) => {
    try {
        let user = await userSchema.findOne({ email: req.body.email })
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                let token = await createToken(user)
                res.status(200).send({ message: 'Login Successfully', token })
            }
            else {
                res.status(500).send({ message: "Invalid Credential" })
            }
        }
        else {
            res.status(404).send({ message: `User with ${req.body.email} doesn't exists` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})


router.post('/forgot-password/:id', async (req, res) => {
    try {
        const oldUser = await userSchema.findOne({ email: req.body.email })
        if (oldUser) {
            const passwordLink = `https://capable-bienenstitch-f6d4b0.netlify.app/reset-password/${oldUser._id}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rajasekarvignesh093@gmail.com',
                    pass: 'xacc elgo llit itnq'
                }
            });

            var mailOptions = {
                from: 'vigneshmsho093@gmail.com',
                to: req.body.email,
                subject: 'Reset your password ',
                text: passwordLink,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
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
        let user = await userSchema.findById({ _id: req.params.id })
        if (user) {

            user.password = await hashPassword(req.body.password)
            let token = await createToken(user)
            user.save()
            res.status(200).send({ message: 'Password Changed Successfuly', token })

        }
        else {
            res.status(400).send({ message: 'user not exists' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})


router.post('/create', async (req, res) => {
    try {
        let newblog = await blogModel.create(req.body)
        res.status(200).send({ message: "Blog Created Successfully", newblog })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.get('/save', async (req, res) => {
    try {
        let allblogs = await blogModel.find()
        if (allblogs) {
            res.status(200).send({ message: "Successfully Fetched", allblogs })
        }
        else {
            res.status(400).send({ message: "Something went wrong" })
        }
    } catch (error) {
        res.status(500).send({ message: "InternalServer Error" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let blog = await blogModel.findById({ _id: req.params.id })
        if (blog) {
            res.status(200).send({ message: "success", blog })
        }
        else {
            res.status(400).send({ message: "Something went wrong" })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.put('/:id', async (req, res) => {
    try {

        let blog = await blogModel.findById({ _id: req.params.id })
        if (blog) {
            let newBlog = await blogModel.updateOne(req.body)
            res.status(200).send({ message: "Blog Saved Success" })
        }
        else {
            res.status(400).send({ message: "Something went wrong" })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let blog = await blogModel.deleteOne({ _id: req.params.id })
        if (blog) {
            res.status(200).send({ message: "Blog Deleted Successfully" })
        }
        else {
            res.status(400).send({ message: "Something went wrong" })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

module.exports = router