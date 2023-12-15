const GAME_ID = "drugdealersimulator";
const STEAMAPP_ID = '682990';

const path = require('path');
const { fs, util } = require('vortex-api');

function main(context) {
    context.registerGame({
        id: GAME_ID,
        name: 'Drug Dealer Simulator',
        mergeMods: true,
        queryPath: findGame,
        supportedTools: [],
        queryModPath: () => "DrugDealerSimulator/Content",
        logo: 'gameart.jpg',
        executable: () => "DrugDealerSimulator.exe",
        requiredFiles: [
            "DrugDealerSimulator.exe",
            "DrugDealerSimulator/Binaries/Win64/DrugDealerSimulator-Win64-Shipping.exe"
        ],
        setup: prepareForModding,
        environment: {
            SteamAPPId: STEAMAPP_ID
        },
        details: {
            SteamAPPId: STEAMAPP_ID,
            stopPatterns: [
                '[a-z]{1,20}(.dll)'
            ]
        },
    });

    return true;
}

function findGame() {
    return util.GameStoreHelper.findByAppId([STEAMAPP_ID])
        .then(game => game.gamePath);
}
function prepareForModding(discovery) {
    return fs.ensureDirWritableAsync(path.join(discovery.path, 'DrugDealerSimulator', 'Content'));
}

module.exports = {
    default: main,
}