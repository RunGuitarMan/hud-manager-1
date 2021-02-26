"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customer = void 0;
const express_1 = __importDefault(require("express"));
const electron_1 = require("electron");
const steam_game_path_1 = require("steam-game-path");
const config = __importStar(require("./config"));
const huds = __importStar(require("./huds"));
const path = __importStar(require("path"));
const gsi = __importStar(require("./gamestate"));
const game = __importStar(require("./game"));
const sync = __importStar(require("./sync"));
const machine = __importStar(require("./machine"));
const user = __importStar(require("./user"));
const routes_1 = __importDefault(require("./tournaments/routes"));
const routes_2 = __importDefault(require("./matches/routes"));
const routes_3 = __importDefault(require("./players/routes"));
const match = __importStar(require("./matches"));
const routes_4 = __importDefault(require("./teams/routes"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
exports.customer = {
    customer: null
};
function default_1(router, io) {
    router.route('/api/auth').get(user.getCurrent).post(user.loginHandler).delete(user.logout);
    router.route('/api/config').get(config.getConfig).patch(config.updateConfig(io));
    router.route('/api/version').get((req, res) => res.json({ version: electron_1.app.getVersion() }));
    routes_1.default(router);
    routes_2.default(router, io);
    routes_3.default(router);
    routes_4.default(router);
    router.route('/api/huds').get(huds.getHUDs).post(huds.openHUDsDirectory).delete(huds.deleteHUD(io));
    router.route('/api/huds/add').post(huds.uploadHUD);
    router.route('/api/huds/close').post(huds.closeHUD);
    router.route('/api/huds/:hudDir/start').post(huds.showHUD(io));
    router.route('/api/gsi').get(gsi.checkGSIFile).put(gsi.createGSIFile);
    router.route('/api/import').post(sync.importDb);
    router.route('/api/steam').get((req, res) => res.json({ gamePath: steam_game_path_1.getGamePath(730) }));
    router.route('/api/import/verify').post(sync.checkForConflicts);
    router.route('/api/gsi/download').get(gsi.saveFile('gamestate_integration_hudmanager.cfg', gsi.generateGSIFile()));
    router.route('/api/db/download').get(gsi.saveFile('hudmanagerdb.json', sync.exportDatabase()));
    //router.route('/api/events')
    //    .get(game.getEvents);
    router.route('/api/game').get(game.getLatestData);
    router.route('/api/game/run').post(game.run);
    router.route('/api/cfg').get(game.checkCFGs).put(game.createCFGs);
    router.route('/api/cfgs/download').get(gsi.saveFile('configs.zip', gsi.cfgsZIPBase64, true));
    router.route('/huds/:dir/').get(huds.renderHUD);
    router.route('/hud/:dir/').get(huds.renderOverlay());
    router.route('/development/').get(huds.renderOverlay(true));
    router.use('/dev', huds.verifyOverlay, http_proxy_middleware_1.createProxyMiddleware({ target: 'http://localhost:3500', ws: true, logLevel: 'silent' }));
    router.route('/api/machine').get(machine.getMachineIdRoute);
    router.use('/huds/:dir/', huds.renderAssets);
    router.route('/huds/:dir/thumbnail').get(huds.renderThumbnail);
    electron_1.globalShortcut.register('Alt+Shift+F', () => io.emit('refreshHUD'));
    electron_1.globalShortcut.register('Alt+R', () => {
        match.reverseSide(io);
    });
    /**
     * LEGACY ROUTING
     */
    router.route('/legacy/:hudName/index.js').get(huds.legacyJS);
    router.route('/legacy/:hudName/style.css').get(huds.legacyCSS);
    router.use('/', express_1.default.static(path.join(__dirname, '../static/legacy')));
    /**
     * END OF LEGACY ROUTING
     */
}
exports.default = default_1;
