import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import asyncHandler from '../utils/async-handler';

export const getAllUsers = async (req: any, res: any) => {
    try {
        console.log('called getAllUsers.')
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('registerUser called..')
    const userExists = await User.findOne({ email_id: req.body.email_id });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user: IUser = await User.create(req.body);

    if (user) {
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email_id: user.email_id,
                mobile: user.mobile
            }
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.id);

    if (user) {
        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.json({
            message: 'User updated successfully',
            user: {
                id: updatedUser._id,
                email_id: updatedUser.email_id,
                mobile: updatedUser.mobile
            }
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});