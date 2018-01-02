var activelist = $('#menu')[0].classList;

if (activelist.length > 1) {
    x = 0;
    var menulist = $('#menu')[0].classList;

    while (x < activelist.length) {
        var active = $('#menu')[0].classList[x];
        
        if (x == 0) {
            $('#menu a.'+active)[0].className += ' ' + 'menuactive' + ' ' + 'parent';
        } else {
            $('#menu a.'+active)[0].className += ' ' + 'menuactive';
        };

        x++;
    };
} else {
    var active = $('#menu')[0].className;

    try {
        $('#menu a.'+active)[0].className += ' ' + 'menuactive';
    }
    catch(err) {
    }
};

$('#menu')[0].classList = '';

$('.handle').on('click', function(){
    $('#menu ul').toggleClass('showing');
    $('#menu .handle').toggleClass('open');
});