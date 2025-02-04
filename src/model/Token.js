'use server'
import {Schema, model, models} from "mongoose";
import dbConnect from "@/lib/mongoDB";


class Token {
    constructor(){
        this.schema = new Schema({
            jti : {
                type: String,
                required: true
            }
        }, {
            timestamps: true
        });
        this.Model = models.Token || model("Token", this.schema);
    }

    async create(javaToken) {
        try {
            await dbConnect();
            
            const response = await this.Model.findOneAndUpdate({jti: javaToken}, {jti: javaToken}, {
                upsert: true
            });
            return JSON.parse(JSON.stringify(response))
        } catch (err) {
            console.error(err)
            return err.errorResponse
        }
    }

    async find(jti) {
        try {
            await dbConnect();
            const response = await this.Model.find({jti: jti});
            return JSON.parse(JSON.stringify(response))
        } catch (err) {
            console.error(err.errorResponse)
            return err.errorResponse
        }
    }

    async delete(jti) {
        try {
            await dbConnect();
            const response = await this.Model.deleteOne({jti: jti});
            return JSON.parse(JSON.stringify(response))
        } catch (err) {
            console.error(err.errorResponse)
            return err.errorResponse
        }
    }
}

export default Token