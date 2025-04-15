import { UserModel } from "../models/user.model.js";

export const createUser = async ( firstname, lastname, email, password ) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required.')
    }
    const user = await UserModel.create(
        {
            fullname: { firstname: fullname, lastname: lastname },
            email,
            password
        }
    )
    console.log(user)
    return user
}  