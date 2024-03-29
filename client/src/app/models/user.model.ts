import { Deserializable } from "./deserializable.model";
import { Serializable } from "./serializable.model";

export class User implements Deserializable, Serializable {
    private userId: number;
    private username: string;
    private email: string;
    private password: string;
    private create_time: Date;
    private isAdmin: number;
    private location: string;
    private firstName: string;
    private lastName: string;
    private mobileNo: string;

    constructor(input: any = null) {
        if (input) {
            this.deserialize(input);
        } else {
            this.userId = 0;
            this.username = null;
            this.email = null;
            this.password = null;
            this.create_time = new Date();
            this.isAdmin = 0;
            this.location = null;
            this.firstName = null;
            this.lastName = null;
            this.mobileNo = null;
        }
    }

    deserialize(input: Object): this {
        Object.assign(this, input);
        return this;
    }

    serialize(): Object {
        return {
            userId: this.userId,
            username: this.username,
            email: this.email,
            password: this.password,
            create_time: this.create_time,
            isAdmin: this.isAdmin,
            location: this.location,
            firstName: this.firstName,
            lastName: this.lastName,
            mobileNo: this.mobileNo
        };
    }

    get getUserId() {
        return this.userId;
    }

    set setUserId(userId: number) {
        this.userId = userId;
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

    get getIsAdmin() {
        return this.isAdmin;
    }

    set setIsAdmin(isAdmin: number) {
        this.isAdmin = isAdmin;
    }

    get getLocation() {
        return this.location;
    }

    set setLocation(location: string){
        this.location = location;
    }

    get getFirstName() {
        return this.firstName;
    }

    set setFirstName(firstName: string){
        this.firstName = firstName;
    }

    get getLastName() {
        return this.lastName;
    }

    set setLastName(lastName: string){
        this.lastName = lastName;
    }

    get getMobileNo() {
        return this.mobileNo;
    }

    set setMobileNo(mobileNo: string){
        this.mobileNo = mobileNo;
    }
}