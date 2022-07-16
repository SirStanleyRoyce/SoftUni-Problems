import { IPost } from "./post";
import { IUser } from "./user";

export interface IPopulatedTheme {
    _id: string;
    themeName: string;
    userId: IUser;
    posts: IPost[];
    subscribers: string[];
    created_at: string;
    updatedAt: string;
};