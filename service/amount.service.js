import { client } from "../index.js";

export async function deletingAmount() {
    return await client
        .db('auction')
        .collection('total-amount')
        .deleteMany();
}
export async function edtingAmount(team, data) {
    return await client
        .db('auction')
        .collection('total-amount')
        .updateOne({ team: team }, { $set: { amount: data.amount } });
}
export async function getingAmount() {
    return await client
        .db('auction')
        .collection('total-amount')
        .find()
        .toArray();
}
export async function postingAmount(request) {
    return await client
        .db('auction')
        .collection('total-amount')
        .insertOne(request.body);
}
export async function checkingAnount(team) {
    return await client
        .db('auction')
        .collection('total-amount')
        .findOne({ team: team });
}
