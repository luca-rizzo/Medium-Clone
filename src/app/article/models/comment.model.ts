import { Profile } from "src/app/profile/models/profile.model";

export interface Comment {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    body: string,
    author: Profile
}