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
    this.db = null;
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
    //this.runTests();
}

BeckettBot.prototype.runTests = function(){
    console.log("running tests...\n");
    console.log(this.responder.getResponse("beckett rap"));
    console.log("get response `beckett`?");    
    console.log(this.responder.getResponse("beckett"));
    console.log("get response `beckett`?");
    console.log(this.responder.getResponse("beckett"));
    console.log("get response `i am on holiday tomorrow`?");
    console.log(this.responder.getResponse("i am on holiday tomorrow"));
    console.log("get response `just read about castro in the guardian newspaper, the man was a saint`?");
    console.log(this.responder.getResponse("just read about castro in the guardian newspaper, the man was a saint"));
    console.log("get response `blah`?");
    console.log(this.responder.getResponse("blah"));
}

/**
 * On message callback, called when a message (of any type) is detected with the real time messaging API
 * @param {object} message
 * @private
 */
BeckettBot.prototype._onMessage = function (message) {
    
    var self = this;

    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromBeckettBot(message)) {

        var channel = self._getChannelById(message.channel);
        var response = self.responder.getResponse(message.text);
        
        if (response !== "" && response !== null) {
           this.postMessageToChannel(channel.name, response, {as_user: true});
        }
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
 * Check if the first time the bot is run. It's used to send a welcome message into the channel
 * @private
 */
BeckettBot.prototype._firstRunCheck = function () {
    var self = this;    
    self._welcomeMessage();    
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

/**
 * Util function to get the name of a channel given its id
 * @param {string} channelId
 * @returns {Object}
 * @private
 */
BeckettBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
}

module.exports = BeckettBot;