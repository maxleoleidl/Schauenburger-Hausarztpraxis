var activelist = $('#menu')[0].classList;

if (activelist.length > 1) {
    x = 0;
    var menulist = $('#menu')[0].classList;

    while (x < activelist.length) {
        var active = $('#menu')[0].classList[x];

        $('#menu a.'+active)[0].className += ' ' + 'menuactive';

        x++;
    };
} else {
    var active = $('#menu')[0].className;

    $('#menu a.'+active)[0].className += ' ' + 'menuactive';
};

$('#menu')[0].classList = '';

$('.handle').on('click', function(){
    $('#menu ul').toggleClass('showing');
    console.log('call function');
});