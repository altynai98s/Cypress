"use strict";
/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const config_1 = __importDefault(require("config"));
const utils = __importStar(require("../utils"));
const notifications = require('../../data/datacache').notifications;
const challengeUtils = require('../challengeUtils');
const security = require('../insecurity');
const challenges = require('../../data/datacache').challenges;
let firstConnectedSocket = null;
const registerWebsocketEvents = (server) => {
    const io = require('socket.io')(server);
    global.io = io;
    io.on('connection', (socket) => {
        if (firstConnectedSocket === null) {
            socket.emit('server started');
            firstConnectedSocket = socket.id;
        }
        notifications.forEach((notification) => {
            socket.emit('challenge solved', notification);
        });
        socket.on('notification received', (data) => {
            const i = notifications.findIndex(({ flag }) => flag === data);
            if (i > -1) {
                notifications.splice(i, 1);
            }
        });
        socket.on('verifyLocalXssChallenge', (data) => {
            challengeUtils.solveIf(challenges.localXssChallenge, () => { return utils.contains(data, '<iframe src="javascript:alert(`xss`)">'); });
            challengeUtils.solveIf(challenges.xssBonusChallenge, () => { return utils.contains(data, config_1.default.get('challenges.xssBonusPayload')); });
        });
        socket.on('verifySvgInjectionChallenge', (data) => {
            challengeUtils.solveIf(challenges.svgInjectionChallenge, () => { return (data === null || data === void 0 ? void 0 : data.match(/.*\.\.\/\.\.\/\.\.[\w/-]*?\/redirect\?to=https?:\/\/placekitten.com\/(g\/)?[\d]+\/[\d]+.*/)) && security.isRedirectAllowed(data); });
        });
        socket.on('verifyCloseNotificationsChallenge', (data) => {
            challengeUtils.solveIf(challenges.closeNotificationsChallenge, () => { return Array.isArray(data) && data.length > 1; });
        });
    });
};
module.exports = registerWebsocketEvents;
//# sourceMappingURL=registerWebsocketEvents.js.map