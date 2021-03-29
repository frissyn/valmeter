const fs = require("fs");
const https = require("https");
const axios = require("axios").default;

const conf = require("../Includes/config.json");

function parseLockfile(path = null) {
    if (!path) {
        const appData = process.env.LOCALAPPDATA;
        path = `${appData}\\Riot Games\\Riot Client\\Config\\lockfile`;
    }

    data = fs.readFileSync(path, "utf-8").split(":");

    return {
        name: data[0],
        pid: data[1],
        port: data[2],
        password: data[3],
        protocol: data[4]
    };
};


function createClient(lockData) {
    return axios.create({
        baseURL: `https://127.0.0.1:${lockData['port']}`,
        headers: {'Authorization': `Basic ${lockData['password']}`},
        httpsAgent: new https.Agent({rejectUnauthorized: false}),
    });
};
