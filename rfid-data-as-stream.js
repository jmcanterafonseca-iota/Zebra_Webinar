/* Gets RFID Data from a Stream's v0 Channel */

const { composeAPI } = require("@iota/core");
const { trytesToAscii } = require("@iota/converter");
const { mamFetchAll } = require("@iota/mam.js"); 

// We need to use devnet
const iotaNetwork = "https://nodes.devnet.iota.org";
const channelMode = "restricted";

async function rfidDataFromChannel(transactionId, sideKey) {
  const api = composeAPI({ provider: iotaNetwork });

  const data = await mamFetchAll(api, transactionId, channelMode, sideKey);

  const result = [];
  for (const entry of data) {
    result.push(JSON.parse(trytesToAscii(entry.message)));
  }

  return result;
}

if (process.argv.length < 4) {
  console.log("Please provide root transaction id and side key");
  process.exit(-1);
}

const transactionId = process.argv[2];
const seed = process.argv[3];

rfidDataFromChannel(transactionId, seed).then(
  (data) => console.dir(data)).catch((error) => console.error(`Error while retrieving data: ${error}`));
