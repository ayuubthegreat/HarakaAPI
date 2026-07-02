import prisma from "../../lib/prisma.js";
import {superAdminData} from "../../bakedData/superAdminData.js"



// Login for user using email and password
export const Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    // Add password verification logic here if applicable
    return res.status(200).json({ success: true, message: "Login successful", data: user });
};
// Register for user using email and password
export const Register = async (req, res) => {
    const { email, password, websiteName, username } = req.body;
    if (!email || !password || !websiteName || !username) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    let role = "USER";
    if (superAdminData.includes(email)) {
        role = "SUPERADMIN";
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password,
            websiteName,
            role,
        },
    });
    return res.status(201).json({ success: true, message: "Registration successful", data: user });
};
// Find user by ID
export const FindUserById = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User found", data: user });
};
// Delete user by ID
export const DeleteUserById = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User deleted", data: user });
};
// Update user by ID
export const UpdateUserById = async (req, res) => {
    const { id } = req.params;
    const { email, password, websiteName } = req.body;
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            email,
            password,
            websiteName,
        },
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User updated", data: user });
};
export const StandardUserRouteFunc = async (req, res) => {
    return res.status(200).json({ success: true, message: "Standard user route accessed" });
};

