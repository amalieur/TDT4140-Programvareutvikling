import { Deserializable } from "./deserializable.model";
import { Serializable } from "./serializable.model";

export class Review implements Deserializable, Serializable {
    private id: number;
    private userId: number;
    private stars: number;
    private comment: string;

    constructor(input: any = null) {
        if (input) {
            this.deserialize(input);
        } else {
            this.id = 0;
            this.userId = 0;
            this.stars = 0;
            this.comment = null;
        }
    }

    deserialize(input: Object): this {
        Object.assign(this, input);
        return this;
    }
    
    serialize(): Object {
        return {
            id: this.id,
            userId: this.userId,
            stars: this.stars,
            comment: this.comment,
        };
    }

    get getId() {
        return this.id;
    }

    set setId(id: number) {
        this.id = id;
    }

    get getUserId() {
        return this.userId;
    }

    set setUserId(userId: number) {
        this.userId = userId;
    }

    get getStars() {
        return this.stars;
    }

    set setStars(stars: number) {
        this.stars = stars;
    }

    get getComment() {
        return this.comment;
    }

    set setComment(comment: string) {
        this.comment = comment;
    }

}