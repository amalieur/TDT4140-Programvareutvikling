import { Deserializable } from "./deserializable.model";
import { Serializable } from "./serializable.model";

export class Category implements Deserializable, Serializable {
    private categoryid: number;
    private name: string;

    constructor(input: any = null) {
        if (input) {
            this.deserialize(input);
        } else {
            this.categoryid = 0;
            this.name = null;
        }
    }

    deserialize(input: Object): this {
        Object.assign(this, input);
        return this;
    }

    serialize(): Object {
        return {
            categoryid: this.categoryid,
            name: this.name
        };
    }

    get getCategoryId() {
        return this.categoryid;
    }

    set setCategoryId(categoryid: number) {
        this.categoryid = categoryid;
    }

    get getName() {
        return this.name;
    }

    set setName(name: string) {
        this.name = name;
    }

}