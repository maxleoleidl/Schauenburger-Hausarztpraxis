var express = require('express');
var router = express.Router();

var menu_data = require('../public/sources/menu');
var opening_data = require('../public/sources/opening_times');
var news_data = require('../public/sources/news');

/* mark the current site */
var x = 0;
while (x < menu_data.entries.length) {
  menu_data.entries[x].path = menu_data.entries[x].href;
  menu_data.entries[x].href = menu_data.entries[x].href;

  if (menu_data.entries[x].sub_items != undefined) {
    
    var y = 0;
    while (y < menu_data.entries[x].sub_items.length) {
      menu_data.entries[x].sub_items[y].path = menu_data.entries[x].sub_items[y].href;
      menu_data.entries[x].sub_items[y].href = menu_data.entries[x].sub_items[y].href;

      y++;
    };
  }

  x++;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Willkommen in Ihrer Hausarztpraxis!', menu: menu_data, menu_active: 'home', opening_times: opening_data, news: news_data, map: false });
});

module.exports = router;
