import { Deserializable } from "./deserializable.model";
import { Serializable } from "./serializable.model";

export class User implements Deserializable, Serializable {
    private userid: number;
    private username: string;
    private email: string;
    private password: string;
    private create_time: Date;

    constructor(input: any = null) {
        if (input) {
            this.deserialize(input);
        } else {
            this.userid = 0;
            this.username = null;
            this.email = null;
            this.password = null;
            this.create_time = new Date();
        }
    }

    deserialize(input: Object): this {
        Object.assign(this, input);
        return this;
    }

    serialize(): Object {
        return {
            userid: this.userid,
            username: this.username,
            email: this.email,
            password: this.password,
            create_time: this.create_time
        };
    }

    get getUserId() {
        return this.userid;
    }

    set setUserId(userid: number) {
        this.userid = userid;
    }

    get getUsername() {
        return this.username;
    }

    set setUsername(username: string) {
        this.username = username;
    }

    get getEmail() {
        return this.email;
    }

    set setEmail(email: string) {
        this.email = email;
    }

    get getPassword() {
        return this.password;
    }

    set setPassword(password: string) {
        this.password = password;
    }

    get getCreateTime() {
        return this.create_time;
    }

    set setCreateTime(create_time: Date) {
        this.create_time = create_time;
    }

}