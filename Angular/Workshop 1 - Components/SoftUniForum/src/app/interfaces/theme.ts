import { IUser } from "./user";

export interface ITheme {
    _id: string;
    themeName: string;
    userId: IUser;
    posts: string[];
    subscribers: string[];
    created_at: string;
    updatedAt: string;
};