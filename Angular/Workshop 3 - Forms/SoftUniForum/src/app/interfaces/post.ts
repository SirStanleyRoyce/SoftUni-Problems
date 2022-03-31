import { IUser } from "./user"

export interface IPost {
    _id: string;
    text: string;
    likes: string[];
    userId: IUser;
    themeId: {
        _id: string,
        themeName: string,
        userId: string,
        posts: string[],
        subscribers: string[],
        created_at: string,
        updatedAt: string,
        __v: 0
    }
    created_at: string;
    updatedAt: string;
    __v: number;
}