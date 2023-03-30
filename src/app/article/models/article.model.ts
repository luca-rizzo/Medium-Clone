import { Profile } from "src/app/profile/models/profile.model";

export class Article {
    slug!: string;
    title!: string;
    description!: string;
    body!: string;
    tagList!: string[];
    createdAt!: Date;
    updatedAt!: Date;
    favorited!: boolean;
    favoritesCount!: number;
    author!: Profile;
    comments?: Comment[];
}