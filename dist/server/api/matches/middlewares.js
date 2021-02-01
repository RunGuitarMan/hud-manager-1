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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getMaps = exports.updateMatchRoute = exports.deleteMatchRoute = exports.getCurrentMatchRoute = exports.addMatchRoute = exports.getMatchRoute = exports.getMatchesRoute = void 0;
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var M = __importStar(require("./index"));
exports.getMatchesRoute = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matches;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, M.getMatches()];
            case 1:
                matches = _a.sent();
                return [2 /*return*/, res.json(matches)];
        }
    });
}); };
exports.getMatchRoute = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var match;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.params.id) {
                    return [2 /*return*/, res.sendStatus(422)];
                }
                return [4 /*yield*/, M.getMatchById(req.params.id)];
            case 1:
                match = _a.sent();
                if (!match) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                return [2 /*return*/, res.json(match)];
        }
    });
}); };
exports.addMatchRoute = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var match;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, M.addMatch(req.body)];
            case 1:
                match = _a.sent();
                return [2 /*return*/, res.sendStatus(match ? 200 : 500)];
        }
    });
}); };
exports.getCurrentMatchRoute = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var match;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, M.getCurrent()];
            case 1:
                match = _a.sent();
                if (!match) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                return [2 /*return*/, res.json(match)];
        }
    });
}); };
exports.deleteMatchRoute = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var match;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, M.deleteMatch(req.params.id)];
            case 1:
                match = _a.sent();
                return [2 /*return*/, res.sendStatus(match ? 200 : 500)];
        }
    });
}); };
exports.updateMatchRoute = function (io) { return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var match;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, M.updateMatch(req.body)];
            case 1:
                match = _a.sent();
                io.emit('match');
                return [2 /*return*/, res.sendStatus(match ? 200 : 500)];
        }
    });
}); }; };
exports.getMaps = function (req, res) {
    var defaultMaps = ['de_mirage', 'de_dust2', 'de_inferno', 'de_nuke', 'de_train', 'de_overpass', 'de_vertigo'];
    var mapFilePath = path_1["default"].join(electron_1.app.getPath('userData'), 'maps.json');
    try {
        var maps = JSON.parse(fs_1["default"].readFileSync(mapFilePath, 'utf8'));
        if (Array.isArray(maps)) {
            return res.json(maps);
        }
        return res.json(defaultMaps);
    }
    catch (_a) {
        return res.json(defaultMaps);
    }
};
