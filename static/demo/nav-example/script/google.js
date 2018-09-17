/*
 * google.js
 * google global nav
 */

$(function(){
    $('a').attr('hideFocus', true);
    $('#google .click-nav .subnav').hide();
    $('#google .click-nav').click(function(){
        $('#google .click-nav').not($(this)).children('.subnav').hide()
            .siblings('a').removeClass('click-on');
        $(this).children('.subnav').toggle()
            .siblings('a').toggleClass('click-on');
    });
});