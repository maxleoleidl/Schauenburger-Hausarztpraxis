var express = require('express');
var router = express();
var hbs = require('handlebars');
var fs = require('fs-extra');
var mkdirp = require('mkdirp');

function renderContent(file, output, jsondata) {
    fs.readFile(file, 'utf8', function(err, data){
        if (!err) {
            var source = data.toString();
            var newdata = renderToString(source, jsondata);
            
            fs.readFile('views/layouts/layout.hbs', 'utf8', function(err, data) {
                if (!err) {
                    var sourcelayout = data.toString();
                    var html = renderToString(sourcelayout, {body: newdata, map: jsondata['map'], menu: true});
                    
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
router.get('/', ensureAuthenticated, function(req, res) {
    /* reload the file content */
    //var mastereditable = require('../stateFile.json');
    //var masterstatic = require('../public/sources/master.json');
    var mastereditable = JSON.parse(fs.readFileSync('./stateFile.json'));
    var masterstatic = JSON.parse(fs.readFileSync('./public/sources/master.json'));

    var openingHours = mastereditable.openingHours;
    var surgeryHours = mastereditable.surgeryHours;
    var news = mastereditable.posts;
    var contact = mastereditable.contact;
    
    var menu_data = masterstatic.menu;
    var medical_data = masterstatic.medicalTeam;
    var practice_data = masterstatic.practiceTeam;
    var services_data = masterstatic.services;

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

        if (menu_data.entries[x].sub_items != undefined) {
            
            var y = 0;
            while (y < menu_data.entries[x].sub_items.length) {
                menu_data.entries[x].sub_items[y].path = menu_data.entries[x].sub_items[y].href;
                menu_data.entries[x].sub_items[y].href = '/' + menu_data.entries[x].href + "/" + menu_data.entries[x].sub_items[y].href;

                y++;
            };
        };

        if (menu_data.entries[x].path == 'home') {
            menu_data.entries[x].href = '/';
        } else if (menu_data.entries[x].path == 'team') {
            menu_data.entries[x].href = '/' + menu_data.entries[x].href + '/aerzteteam';
        } else if (menu_data.entries[x].path == 'leistungen') {
            menu_data.entries[x].href = '/' + menu_data.entries[x].href + '/organisatorisches';
        } else {
            menu_data.entries[x].href = '/' + menu_data.entries[x].href;
        };

        x++;
    };

    console.log(menu_data)

    /* combine the new data */
    sitelist = {
        index: [
            'views/index.hbs',
            "static",
            {title: 'Willkommen in Ihrer Hausarztpraxis!', menu: menu_data, menu_active: 'home', openingHours: openingHours, surgeryHours: surgeryHours, news: news, map: false}
        ],
        medical_team: [
            'views/medical_team.hbs',
            "static/team/aerzteteam",
            {title: 'Ihr Ärzteteam', menu: menu_data, menu_active: 'team aerzteteam', team: medical_data, map: false}
        ],
        practice_team: [
            'views/practice_team.hbs',
            "static/team/praxisteam",
            {title: 'Unser Praxisteam', menu: menu_data, menu_active: 'team praxisteam', team: practice_data, map: false}
        ],
        organisatorisches: [
            'views/services_text.hbs',
            "static/leistungen/organisatorisches",
            {title: 'Wichtiges zur Organisation', menu: menu_data, menu_active: 'leistungen organisatorisches', services: organisatorisches, map: false}
        ],
        grundversorgung: [
            'views/services_list.hbs',
            "static/leistungen/grundversorgung",
            {title: 'Medizinische Grundversorgung', menu: menu_data, menu_active: 'leistungen grundversorgung', services: grundversorgung, map: false}
        ],
        vorsorge: [
            'views/services_list.hbs',
            "static/leistungen/vorsorge",
            {title: 'Vorsorge', menu: menu_data, menu_active: 'leistungen vorsorge', services: vorsorge, map: false}
        ],
        chronische_erkrankungen: [
            'views/services_list.hbs',
            "static/leistungen/chronische_erkrankungen",
            {title: 'DMP (Disease-Management-Programme)', menu: menu_data, menu_active: 'leistungen chronische_erkrankungen', services: chronische_erkrankungen, map: false}
        ],
        igel: [
            'views/services_text.hbs',
            "static/leistungen/igel",
            {title: 'Individuelle Wunsch-Gesundheitsleistungen (IGeL)', menu: menu_data, menu_active: 'leistungen igel', services: igel, map: false}
        ],
        contact: [
            'views/contact.hbs',
            "static/kontakt",
            {title: 'Kontakt', menu: menu_data, menu_active: 'kontakt', contact: contact, map: true, test: 'test'}
        ],
        impressum: [
            'views/impressum.hbs',
            "static/impressum",
            {title: 'Impressum', menu: menu_data, contact: contact, map: false}
        ],
        datenschutzerklaerung: [
            'views/datenschutzerklaerung.hbs',
            "static/datenschutzerklaerung",
            {title: 'Datenschutzerklärung', menu: menu_data, contact: contact, map: false}
        ]
    };

    /* Render the different content */
    for (x in sitelist) {
        mkdirp(sitelist[x][1], function(err) {});
        renderContent(sitelist[x][0], sitelist[x][1] + '/index.html', sitelist[x][2]);
    };

    /* Copy image folder */
    fs.emptyDirSync('static/images');

    fs.copy('public/images', 'static/images', function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("success!");
        }
    });

    /* Copy javascripts folder */
    fs.emptyDirSync('static/javascripts');

    fs.copy('public/javascripts', 'static/javascripts', function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("success!");
        }
    });
    
    /* Copy stylesheets folder */
    fs.emptyDirSync('static/stylesheets');

    fs.copy('public/stylesheets', 'static/stylesheets', function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("success!");
        }
    });

    res.render('render', {title: "Die Webseiten wurden erfolgreich aktualisiert."});
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;