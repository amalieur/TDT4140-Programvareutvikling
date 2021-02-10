import { Deserializable } from "./deserializable.model";
import { Serializable } from "./serializable.model";

export class Post implements Deserializable, Serializable {
    private title: string;
    private description: string;
    private timestamp: Date;
    private user: string;

    constructor(input: any = null) {
        if (input) {
            this.title = input.title;
            this.description = input.description;
            this.timestamp = new Date(input.timestamp);
            this.user = input.user;
        } else {
            this.title = "";
            this.description = "";
            this.timestamp = new Date();
            this.user = "";
        }
    }

    deserialize(input: string): this {
        const obj = JSON.parse(input);
        Object.assign(this, obj);

        this.timestamp = new Date(this.timestamp);

        return this;
    }

    serialize(): string {
        return JSON.stringify({
            title: this.title,
            description: this.description,
            timestamp: this.timestamp.valueOf(),
            user: this.user
        });
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
}