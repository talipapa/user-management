'use server'
import {Schema, model, models} from "mongoose";
import dbConnect from "@/lib/mongoDB";

class User {
    constructor() {
        this.schema = new Schema({
            first_name: {
                type: String,
                required: true,
            },
            last_name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
            },
            user_role: {
                type: String,
                enum: ["admin", "user"],
                default: "user"
            }
        }, {
            timestamps: true
        });

        this.Model = models.User || model("User", this.schema);
    }
    async find() {
        try {
            await dbConnect();
            const response = await this.Model.find().select(['first_name', 'last_name', 'email', 'user_role']);
            return JSON.parse(JSON.stringify(response))
            
        } catch (err) {
            console.error(err.errorResponse)
            return err.errorResponse
        }
    }

    async findById(id) {
        try {
            await dbConnect();
            const response = await this.Model.findById(id);
            return JSON.parse(JSON.stringify(response))
        } catch (err) {
            console.error(err.errorResponse)
            return err.errorResponse
        }
    }

    async findByEmail(email) {
        try {
            await dbConnect();
            const response = await this.Model.findOne({ email: email });
            return JSON.parse(JSON.stringify(response))
        } catch (err) {
            console.error(err.errorResponse)
            return err.errorResponse
        }

    }

    async create(userData) { 
        try {
            await dbConnect();       
            const response = await this.Model.create(userData)
            return JSON.parse(JSON.stringify(response))
        } catch (err) {
            console.error(err.errorResponse)
            return err.errorResponse
        }
    }

    async update(userId, hasPassword, userData) {
        try {
            await dbConnect();
            let response
            if (hasPassword){
                console.log("flag update User.js")
                response = await this.Model.findByIdAndUpdate(userId, {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    password: md5(userData.password)
                }, {new: true});
                
            } else {
                response = await this.Model.findByIdAndUpdate(userId, {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email
                }, {new: true});
            }
            return JSON.parse(JSON.stringify(response))
        } catch (err) {
            console.error(err.errorResponse)
            return err.errorResponse       
        }
    }

    async delete(userId) {
        try {
            await dbConnect();
            const response = await this.Model.findByIdAndDelete(userId);
            return JSON.parse(JSON.stringify(response))
        } catch (err) {
            console.error(err.errorResponse)
            return err.errorResponse            
        }
    }
}

export default User;