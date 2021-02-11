import { Deserializable } from "./deserializable.model";
import { Serializable } from "./serializable.model";

export class Post implements Deserializable, Serializable {
    private id: number;
    private title: string;
    private description: string;
    private timestamp: Date;
    private user: string;
    private imageUrl: string;

    constructor(input: any = null) {
        if (input) {
            this.id = input.id;
            this.title = input.title;
            this.description = input.description;
            this.timestamp = new Date(input.timestamp);
            this.user = input.user;
            this.imageUrl = input.imageUrl;
        } else {
            this.id = 0;
            this.title = "";
            this.description = "";
            this.timestamp = new Date();
            this.user = "";
            this.imageUrl = "";
        }
    }

    deserialize(input: Object): this {
        Object.assign(this, input);

        this.timestamp = new Date(this.timestamp);

        return this;
    }

    serialize(): Object {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            timestamp: this.timestamp.valueOf(),
            user: this.user,
            imageUrl: this.imageUrl
        };
    }

    get getId () {
        return this.id;
    }

    set setId (id: number) {
        this.id = id;
    }

    get getTitle () {
        return this.title;
    }

    set setTitle (title: string) {
        this.title = title;
    }

    get getDescription () {
        return this.description;
    }

    set setDescription (description: string) {
        this.description = description;
    }

    get getTimestamp () {
        return this.timestamp;
    }

    set setTimestamp (timestamp: Date) {
        this.timestamp = timestamp;
    }

    get getUser () {
        return this.user;
    }

    set setUser (user: string) {
        this.user = user;
    }

    get getImageUrl () {
        return this.imageUrl;
    }

    set setImageUrl (imageUrl: string) {
        this.imageUrl = imageUrl;
    }
}