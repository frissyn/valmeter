const fs = require("fs");
const https = require("https");
const axios = require("axios").default;
const RPC = require("discord-rich-presence")("821424938526441562");

const GAME_DATA = {
    maps: {
        "Port": "Icebox",
        "Duality": "Bind",
        "Bonsai": "Split",
        "Ascent": "Ascent",
        "Triad": "Haven",
        "Range": "The Range"
    },
    queues: {
        "unrated":"Unrated",
        "competitive":"Competitive",
        "spikerush":"Spike Rush",
        "deathmatch":"Deathmatch",
        "ggteam":"Escalation"
    },
    agents: {
        "5f8d3a7f-467b-97f3-062c-13acf203c006":"Breach",
        "f94c3b30-42be-e959-889c-5aa313dba261":"Raze",
        "6f2a04ca-43e0-be17-7f36-b3908627744d":"Skye",
        "117ed9e3-49f3-6512-3ccf-0cada7e3823b":"Cypher",
        "320b2a48-4d9b-a075-30f1-1f93a9b638fa":"Sova",
        "1e58de9c-4950-5125-93e9-a0aee9f98746":"Killjoy",
        "707eab51-4836-f488-046a-cda6bf494859":"Viper",
        "eb93336a-449b-9c1b-0a54-a891f7921d69":"Phoenix",
        "41fb69c1-4189-7b37-f117-bcaf1e96f1bf":"Astra",
        "9f0d8ba9-4140-b941-57d3-a7ad57c6b417":"Brimstone",
        "7f94d92c-4234-0a36-9646-3a87eb8b5c89":"Yoru",
        "569fdd95-4d10-43ab-ca70-79becc718b46":"Sage",
        "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc":"Reyna",
        "8e253930-4c05-31dd-1b6c-968525494517":"Omen",
        "add6443a-41bd-e414-f6ad-e58d267f4e95":"Jett"
    }
}
  
class LocalValorantClient {
    constructor (path = null) {
        if (!path) {
            const appData = process.env.LOCALAPPDATA;
            path = `${appData}\\Riot Games\\Riot Client\\Config\\lockfile`;
        }

        const data = fs.readFileSync(path, "utf-8").split(":");

        this.auth = Buffer.from(`riot:${data[3]}`).toString("base64");
        this.axios = axios.create({
            baseURL: `https://127.0.0.1:${data[2]}`,
            headers: {"Authorization": `Basic ${this.auth}`},
            httpsAgent: new https.Agent({rejectUnauthorized: false})
        });
    }

    getSession() {
        return this.axios.get("chat/v1/session").then((res) => {
            return res.data;
        })
    }

    getPresences() {
        return this.axios.get("chat/v4/presences").then((res) => {
            return res.data["presences"];
        })
    }

    async getGamePresence() {
        const session = await this.getSession();
        const presences = await this.getPresences();

        for (let p of presences) {
            if (p["puuid"] == session["puuid"]) {
                let result = Buffer.from(p["private"], "base64");
                return JSON.parse(result.toString("ascii"));
            }
        }
    }

    parseToRPC(presence) {
        let result = {instance: true, largeImageKey: "valorant", raw: presence};

        result["partySize"] = presence["partySize"];
        result["partyMax"] = presence["maxPartySize"];

        if (presence["sessionLoopState"] == "MENUS") {
            if (presence["isIdle"]) {
                result["state"] = "Idling";
                result["details"] = "In Game Menu";
            } else {
                result["state"] = "Looking For Match";
                result["details"] = `${GAME_DATA.queues[presence["queueId"]]} Lobby`;
            }
        } else if (presence["sessionLoopState"] == "INGAME") {
            let m = presence["matchMap"].split("/");
            let mapName = GAME_DATA.maps[m[m.length - 1]]

            result["state"] = `${GAME_DATA.queues[presence["queueId"]]}`;
            result["details"] = `${mapName} (${presence["partyOwnerMatchScoreAllyTeam"]} - ${presence["partyOwnerMatchScoreEnemyTeam"]})`
            // result["startTimestamp"] = Date.parse(presence["queueEntryTime"].replace(".", " "));
        }

        return result;
    }
}


const resArray = new Array;
const client = new LocalValorantClient();

console.log("Started listening for RPC Updates.");

setInterval(() => {
    client.getGamePresence()
    .then((res) => {
        const data = client.parseToRPC(res)
        RPC.updatePresence(client.parseToRPC(res))
        console.log("RPC Updated.  -- ", res["queueEntryTime"].replace("\.", " "))
    })
    .catch((err) => {
        console.log("Encoutered Error: ", err)
        console.log("Exiting silently...")
        process.exit(1)
    })
}, 1050);
