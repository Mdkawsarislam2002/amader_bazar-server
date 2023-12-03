import { Request, Response } from "express";
import { userJWT } from "../../lib";
import { PendingUser, User } from "../../model";
import {
    errorResponse,
    generateOTP,
    sendMailWithNodemailer,
    successResponse,
} from "../../utils";

export const registration = async (req: Request, res: Response) => {
    try {
        const { email, phone, password, name, address } = req.body;

        console.log(
            "🚀 ~ file: registration.controller.ts:14 ~ registration ~ email:",
            email
        );
        const checkIfUserExist = await User.exists({ email, phone });
        console.log(
            "🚀 ~ file: registration.controller.ts:20 ~ registration ~ checkIfUserExist:",
            checkIfUserExist
        );
        if (checkIfUserExist) {
            return errorResponse({
                res,
                statusCode: 400,
                message: `User already exist with this email or phone number`,
            });
        }
        const OTP = generateOTP(6);
        console.log(OTP);
        console.table(req.body);

        await sendMailWithNodemailer({
            receivers: email,
            subject: "Confirm Registration",
            html: `
            <h1>Registration Confirmation</h1>
            <p>Thank you for registering!</p>
            <p>Here Is your OTP</p>
            <h1 style="background-color: rgb(225, 224, 224); padding: 10px; color: rgb(29, 29, 29);" >${OTP}</h1>`,
        });
        console.log(req?.file);
        //! save image to uploads folder
        const ConfirmedUser = await PendingUser.create({
            name,
            email,
            phone,
            password,
            avatar: req?.file?.filename || "",
            address,
            token: OTP,
        });

        const token = userJWT({
            id: ConfirmedUser._id,
            name: ConfirmedUser.name,
            email: ConfirmedUser.email,
            number: ConfirmedUser.phone,
        });
        await successResponse({
            res,
            message: `Registration successful, please check your email for verification link`,
            data: token,
        });
    } catch (error: any) {
        console.log(error.message);
        errorResponse({ res, message: error.message });
    }
};
