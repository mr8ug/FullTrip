const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function userExist(user, page=1){
    console.log("Services get User",user)
    const rows = await db.query(
        `SELECT EXISTS(SELECT user_id FROM user WHERE user = '${user}') as usuario_existe;`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function userType(user, page =1){
    const rows = await db.query(
        `SELECT type_user
        FROM type_user
        where type_user_id = (
        SELECT type_user_id
        FROM user
        WHERE user = '${user}');`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

module.exports = {
    userExist,
    userType
}