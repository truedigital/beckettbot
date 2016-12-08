#!/usr/bin/env node

'use strict';

var BeckettBot = require('../lib/beckettbot');

var token = process.env.BOT_API_KEY;

var beckettbot = new BeckettBot({
    token: token,&
    name: "beckettbot"
});

beckettbot.run();