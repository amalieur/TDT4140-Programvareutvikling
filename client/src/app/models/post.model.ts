import { Deserializable } from "./deserializable.model";
import { Serializable } from "./serializable.model";

export class Post implements Deserializable, Serializable {
    private id: number;
    private title: string;
    private description: string;
    private timestamp: Date;
    private owner: string;
    private imageUrl: string;
    private price: number;
    private categoryid: number;

    constructor(input: any = null) {
        if (input) {
            this.id = input.id;
            this.title = input.title;
            this.description = input.description;
            this.timestamp = input.timestamp;
            this.owner = input.owner;
            this.imageUrl = input.imageUrl;
            this.price = input.price;
            this.categoryid = input.categoryid;
        } else {
            this.id = 0;
            this.title = null;
            this.description = null;
            this.timestamp = new Date();
            this.owner = null;
            this.imageUrl = null;
            this.price = null;
            this.categoryid = null;
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
            owner: this.owner,
            imageUrl: this.imageUrl,
            price: this.price,
            categoryid: this.categoryid
        };
    }

    get getId() {
        return this.id;
    }

    set setId(id: number) {
        this.id = id;
    }

    get getTitle() {
        return this.title;
    }

    set setTitle(title: string) {
        this.title = title;
    }

    get getDescription() {
        return this.description;
    }

    set setDescription(description: string) {
        this.description = description;
    }

    get getTimestamp() {
        return this.timestamp;
    }

    set setTimestamp(timestamp: Date) {
        this.timestamp = timestamp;
    }

    get getOwner() {
        return this.owner;
    }

    set setOwner(owner: string) {
        this.owner = owner;
    }

    get getImageUrl() {
        return this.imageUrl;
    }

    set setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    get getPrice() {
        return this.price;
    }

    set setPrice(price: number) {
        this.price = price;
    }

    get getCategory() {
        return this.categoryid;
    }

    set setCategory(categoryid: number) {
        this.categoryid = categoryid;
    }
}