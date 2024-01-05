const GAME_ID = "drugdealersimulator";
const STEAMAPP_ID = '682990';

const path = require('path');
const { fs, util } = require('vortex-api');

const MOD_UNLOCKER_WARNING = 'dds-mod-unlocker-warning';

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
        setup: (discover) => setup(discover, context.api),
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
function setup(discovery, api) {
  api.sendNotification({
    message: 'Mods may not load correctly',
    type: 'warning',
    id: MOD_UNLOCKER_WARNING,
    actions: [
      {
        title: 'More',
        action: () =>
          api.showDialog(
            'question',
            'Mods may not load correctly',
            {
              text: "Most mods for this game require the Unreal Mod Loader / Unreal Mod Unlocker tool. Please follow instructions on the discord under #getting-started.",
            },
            [
              { 
                label: 'Close', 
                action: () => api.dismissNotification(MOD_UNLOCKER_WARNING) },
              {
                label: 'Open Discord',
                action: () => {
                  util.opn('https://discord.gg/YA6Fk4ESrg');
                  api.dismissNotification(MOD_UNLOCKER_WARNING);
                },
              },
            ]
          ),
      },
    ],
  });

  return fs.ensureDirWritableAsync(path.join(discovery.path, 'DrugDealerSimulator', 'Content'));
}

module.exports = {
    default: main,
}