#!/usr/bin/env node

'use strict';

var BeckettBot = require('../lib/beckettbot');

var beckettbot = new BeckettBot({
    token: "xoxb-112042237185-lYvzWCqq7lArHK5kFla3JhDz",
    name: "beckettbot"
});

beckettbot.run();