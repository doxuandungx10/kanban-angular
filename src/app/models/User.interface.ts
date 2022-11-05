import { WorkSpace } from "./workspace.interface";

export interface User {
    _id: String;
    name: String;
    email: String;
    avatar: String;
    workSpaces: WorkSpace;
    passwordHash: String;
}