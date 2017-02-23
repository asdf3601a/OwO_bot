const request = require('request');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.js');
const bot = new TelegramBot(config.token, {polling: true});
bot.onText(/\/mcsv (.+)/, (msg, match) => {
  request('https://mcapi.ca/query/'+match[1]+'/info',function(err,res,html) {
    if(!err&&res.statusCode==200){
      var info = JSON.parse(html)
      var sv = {}
      if (info.status) {
        sv.status='啟動中'
      } else {
        sv.status='關閉中'
      }
      var data = '伺服器名稱:'+info.motd+'\n'+'伺服器狀態:'+sv.status+'\n'+'伺服器位址:'+info.hostname+':'+info.port+'\n'+'版本:'+info.version+'\n'+'線上玩家數/最大玩家數:'+info.players.online+'/'+info.players.max
      bot.sendMessage(msg.chat.id,data)
    }
  })
});
