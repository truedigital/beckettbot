'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
var Responder = require('./responder');

/**
 * Constructor function. It accepts a settings object which should contain the following keys:
 *      token : the API token of the bot (mandatory)
 *      name : the name of the bot (will default to "BeckettBot")
 *      dbPath : the path to access the database (will default to "data/BeckettBot.db")
 *
 * @param {object} settings
 * @constructor
 *
 */
var BeckettBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'beckettbot';
    this.user = null;
    this.allChannels = [];
    this.responder = new Responder();
}

// inherits methods and properties from the Bot constructor
util.inherits(BeckettBot, Bot);

/**
 * Run the bot
 * @public
 */
BeckettBot.prototype.run = function () {
    BeckettBot.super_.call(this, this.settings);
    this.on('start', this._onStart);
    this.on('message', this._onMessage);
}

/**
 * On Start callback, called when the bot connects to the Slack server and access the channel
 * @private
 */
BeckettBot.prototype._onStart = function () {
    console.log('started\n');
    this._loadBotUser();
}

BeckettBot.prototype.runTests = function(){
    console.log("running tests...\n");
    console.log('C0W5H8A9W');
    console.log(this._getChannelById('C0W5H8A9W'));
    console.log('G3AQ16ZFE');
    console.log(this._getChannelById('G3AQ16ZFE'));
}

/**
 * On message callback, called when a message (of any type) is detected with the real time messaging API
 * @param {object} message
 * @private
 */
BeckettBot.prototype._onMessage = function (message) {
    
    var self = this;

    if (this._isChatMessage(message) &&
        !this._isFromBeckettBot(message)) {

        var response = self.responder.getResponse(message.text);
        if (response === "" || typeof response === "undefined" || response === null) return;

        this.postMessage(message.channel, response, {as_user: true});
    }
}

/**
 * Loads the user object representing the bot
 * @private
 */
BeckettBot.prototype._loadBotUser = function () {
    var botUser = this.users.filter(function (user) {
        return user.name === 'beckettbot' && user.is_bot;
    })[0];

    this.user = botUser;
}

/**
 * Util function to check if a given real time message object represents a chat message
 * @param {object} message
 * @returns {boolean}
 * @private
 */
BeckettBot.prototype._isChatMessage = function (message) {
    var result = message.type === 'message' && Boolean(message.text);
    return result;
}

/**
 * Util function to check if a given real time message object is directed to a channel
 * @param {object} message
 * @returns {boolean}
 * @private
 */
BeckettBot.prototype._isChannelConversation = function (message) {    
    var result = typeof message.channel === 'string' && message.channel[0] === 'C';    
    return result;
}

/**
 * Util function to check if a given real time message has ben sent by the BeckettBot
 * @param {object} message
 * @returns {boolean}
 * @private
 */
BeckettBot.prototype._isFromBeckettBot = function (message) {
    return message.user === this.user.id;
}

module.exports = BeckettBot;