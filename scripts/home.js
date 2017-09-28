var open = document.getElementById("opening-template").innerHTML;
// var contact = document.getElementById("contact-template").innerHTML;

var template_open = Handlebars.compile(open);
// var template_contact = Handlebars.compile(contact);

$.getJSON('../sources/opening_times.json', function(data_open) {
    var quoteData_open = template_open (data_open);
    document.getElementById("opening_times").innerHTML += quoteData_open;
})

/*
$.getJSON('sources/contact.json', function(data_contact) {
    var quoteData_contact = template_contact (data_contact);
    document.getElementById("contact").innerHTML += quoteData_contact;
})
*/