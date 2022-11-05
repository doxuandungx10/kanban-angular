import { User } from "./User.interface";

export interface Ticket {
    _id: String;
    workSpaceID: String;
    discribe: String;
    users: User;
    comments: any;
    createdAt: String;
    updatedAt: String;
}