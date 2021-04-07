// Interface for the User object, taken from the database
interface IUser{
    userId?: number;
    username: string;
    email: string;
    password: string;
    create_time?: Date;
    isAdmin: number;
    location: string;
    firstName: string;
    lastName: string;
    mobileNo: string;
}

export default IUser;











