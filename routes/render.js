var express = require('express');
var router = express();
var hbs = require('handlebars');
var fs = require('fs');

/* Load data from json files */
var menu_data = require('../public/sources/menu');
var opening_data = require('../public/sources/opening_times');
var news_data = require('../public/sources/news');
var medical_data = require('../public/sources/medical_team');
var practice_data = require('../public/sources/practice_team');
var services_data = require('../public/sources/services');
var contact_data = require('../public/sources/contact');

/* Devide the service data */
for (x in services_data.entries) {
    if (services_data.entries[x].link == 'grundversorgung') {
      var grundversorgung = services_data.entries[x];
    } else if (services_data.entries[x].link == 'vorsorge') {
      var vorsorge = services_data.entries[x];
    } else if (services_data.entries[x].link == 'chronische_erkrankungen') {
      var chronische_erkrankungen = services_data.entries[x];
    } else if (services_data.entries[x].link == 'organisatorisches') {
      var organisatorisches = services_data.entries[x];
    } else if (services_data.entries[x].link == 'igel') {
      var igel = services_data.entries[x];
    };
};

/* mark the current site */
var x = 0;
while (x < menu_data.entries.length) {
  menu_data.entries[x].path = menu_data.entries[x].href;
  if (menu_data.entries[x].path != 'home') {
    menu_data.entries[x].href = 'http://0.0.0.0:8000/' + menu_data.entries[x].href;
  } else {
    menu_data.entries[x].href = 'http://0.0.0.0:8000/'
  };
  

  if (menu_data.entries[x].sub_items != undefined) {
    
    var y = 0;
    while (y < menu_data.entries[x].sub_items.length) {
      menu_data.entries[x].sub_items[y].path = menu_data.entries[x].sub_items[y].href;
      menu_data.entries[x].sub_items[y].href = menu_data.entries[x].href + "/" + menu_data.entries[x].sub_items[y].href;

      y++;
    };
  }

  x++;
};

var sitelist = {
    index: [
        'views/index.hbs',
        "public/staticsites/index.html",
        {title: 'Willkommen in Ihrer Hausarztpraxis!', menu: menu_data, menu_active: 'home', opening_times: opening_data, news: news_data, map: false}
    ],
    medical_team: [
        'views/medical_team.hbs',
        "public/staticsites/medical_team.html",
        {title: 'Ihr Ärzteteam', menu: menu_data, menu_active: 'team aerzteteam', team: medical_data, map: false}
    ],
    practice_team: [
        'views/practice_team.hbs',
        "public/staticsites/practice_team.html",
        {title: 'Unser Praxisteam', menu: menu_data, menu_active: 'team praxisteam', team: practice_data, map: false}
    ],
    organisatorisches: [
        'views/services_text.hbs',
        "public/staticsites/organisatorisches.html",
        {title: 'Wichtiges zur Organisation', menu: menu_data, menu_active: 'leistungen organisatorisches', services: organisatorisches, map: false}
    ],
    grundversorgung: [
        'views/services_list.hbs',
        "public/staticsites/grundversorgung.html",
        {title: 'Medizinische Grundversorgung', menu: menu_data, menu_active: 'leistungen grundversorgung', services: grundversorgung, map: false}
    ],
    vorsorge: [
        'views/services_list.hbs',
        "public/staticsites/vorsorge.html",
        {title: 'Vorsorge', menu: menu_data, menu_active: 'leistungen vorsorge', services: vorsorge, map: false}
    ],
    chronische_erkrankungen: [
        'views/services_list.hbs',
        "public/staticsites/chronische_erkrankungen.html",
        {title: 'DMP (Disease-Management-Programme)', menu: menu_data, menu_active: 'leistungen chronische_erkrankungen', services: chronische_erkrankungen, map: false}
    ],
    igel: [
        'views/services_text.hbs',
        "public/staticsites/igel.html",
        {title: 'Individuelle Wunsch-Gesundheitsleistungen (IGeL)', menu: menu_data, menu_active: 'leistungen igel', services: igel, map: false}
    ],
    contact: [
        'views/contact.hbs',
        "public/staticsites/contact.html",
        {title: 'Kontakt', menu: menu_data, menu_active: 'kontakt', contact: contact_data, map: true, test: 'test'}
    ],
    impressum: [
        'views/impressum.hbs',
        "public/staticsites/impressum.html",
        {title: 'Impressum', menu: menu_data, contact: contact_data, map: false}
    ]
};

function renderContent(file, output, jsondata) {
    fs.readFile(file, 'utf8', function(err, data){
        if (!err) {
            var source = data.toString();
            var newdata = renderToString(source, jsondata);
            
            fs.readFile('views/layouts/layout.hbs', 'utf8', function(err, data) {
                if (!err) {
                    var sourcelayout = data.toString();
                    var html = renderToString(sourcelayout, {body: newdata, map: jsondata['map']});
                    
                    fs.writeFileSync(output, html);
                } else {
                    console.log('An error occurs during render the layout.');
                    console.log(err);
                };
            });
            
        } else {
            console.log('An error occurs during the render process of the static sites. Pleas contact the Admin.');
            console.log(err);
        };
    });
};

function renderToString(source, data) {
    var template = hbs.compile(source);
    var outputString = template(data);

    return outputString;
};

/* GET home page. */
router.get('/', function(req, res) {
    /* Render the different content */
    for (x in sitelist) {
        renderContent(sitelist[x][0], sitelist[x][1], sitelist[x][2]);
    };

    res.render('render', {title: "Die statischen Webseiten wurden erfolgreich erstellt."});
});

module.exports = router;