var express = require('express');
var router = express.Router();

var menu_data = require('../public/sources/menu');
var opening_data = require('../public/sources/opening_times');

var activelink = 'Praxis';

var x = 0;
while (x < menu_data.entries.length) {
  if (menu_data.entries[x].title == activelink) {
    if (menu_data.entries[x].class == undefined) {
      menu_data.entries[x].class = 'menuactive';
    } else {
      menu_data.entries[x].class += ' menuactive';
    };
  };

  x++;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Schauenburger Hausarztpraxis', menu: menu_data, opening_times: opening_data });
});

module.exports = router;
