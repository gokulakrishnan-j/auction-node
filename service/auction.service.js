import { client } from "../index.js";

export async function deletingToken(email) {
    return await client
        .db('auction')
        .collection('token')
        .deleteOne({ email: email });
}
export async function gettingToken(email) {
    return await client
        .db("auction")
        .collection("token")
        .findOne({ email: email });
}
export async function storingInDb(userFromDB, token) {
    return await client
        .db("auction")
        .collection("token")
        .insertOne({
            email: userFromDB.email,
            my_token: token
        });
}
export async function getingUserName(email) {
    return await client
        .db("auction")
        .collection("signup-signin")
        .findOne({ email: email });
}
export async function creatingUsers(userDetails) {
    return await client
        .db("auction")
        .collection("signup-signin")
        .insertOne(userDetails);
}
