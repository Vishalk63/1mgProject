const express = require('express');
const UserModel = require('../models/userModel');
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


userRouter.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.json({
            msg:"All feilds are Required",
            success:false
        })
    }
    try {
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.json({
                msg:"user already exist",
                success:false
            });
        } else {
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    res.send('err while hashing password');
                } else {
                    const user = new UserModel({
                        username: username,
                        email: email,
                        password: hash
                    })
                    await user.save()
                    return res.status(201).json({
                        msg: "User Ragistar sucessfully",
                        success: true,
                        "user": user,
                    })
                }
            });
        }

    } catch (err) {
        return res.status(500).json({
            msg: "err while signing up",
            "err": err
        })
    }

})


// userRouter.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(500).json({
//             msg:'All feilds required',
//             success:false
//         });
//     }
//     try {
//         const user = await UserModel.findOne({ email });
// a
//         if (user) {
//             bcrypt.compare(password, user.password, function (err, result) {
//                 // result == false
//                 if (err) {
//                     res.status(500).json({
//                         msg:"Err while compairing password",
//                         success:false
//                     })
//                 }
                
//                 if (result) {
//                     const token = jwt.sign({ id: user._id, username: user.username, password: user.password }, process.env.SECRETKEY, function (err, token) {
//                         if (err) {
//                             res.status(500).json({
//                                 msg:'err while creating token',
//                                 success:false
//                             })
//                         } else {
//                             res.status(200).json({
//                                 msg: "Login sucessfully",
//                                 success: true,
//                                 "user":user,
//                                 "token": token
//                             })
//                         }
//                     });
//                 }else{
//                     res.status(500).json({
//                         msg:"Wrong password",
//                         success:false
//                     })
//                 }
//             })
//         } else {
//             res.status(500).json({
//                 msg:"Email or Password is Incorrect [user not found]",
//                 success:false
//             });
//         }
//     } catch (err) {
//         return res.status(500).json({
//             msg: "err while login",
//             sucess: false
//         })
//     }
// })




userRouter.post('/login',async(req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        res.status(500).json({
            msg:"All fields required",
            success:false
        })
    }

    try {

        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(500).json({
                msg:"User not found [email not found]",
                success:false
            })
        }

        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(err){
                res.status(500).json({
                    msg:'err while compairing password',
                    success:false
                })
            }
            if(result){
                
                jwt.sign({ id: user._id, username: user.username, password: user.password },process.env.SECRETKEY,function (err, token){
                    if(err){
                        res.status(500).json({
                            msg:"err while creating token",
                            success:false
                        })
                    }else{
                        res.status(200).json({
                            msg:"Login Successfully",
                            success:true,
                            "user": user,
                            "token":token
                        })
                    }
                } )
            }else{
                res.status(500).json({
                    msg:"Wrong password",
                    success:false
                })
            }
        });




        
        
    } catch (err) {
        res.status(500).json({
            msg:'err while login',
            success:false
        })
    }
})

module.exports = userRouter;
