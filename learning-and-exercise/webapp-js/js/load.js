$(function () {


    $('a').click(function () {

        $('#loading').remove();
        $('<div id="loading" style="position:fixed; top: 20px; padding: 10px; left: 50%; background: #ffff00; font-size: 20px"><p>loading</p></div>').appendTo($('html body'));

        var href = $(this).attr('href');

        setTimeout(function () {
            $('#content').load(href + " #content", function () {
                window.history.pushState({}, null, href);
            });

        }, 200);


        return false;
    })
});