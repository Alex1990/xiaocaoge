/*
 * zol-nav.js
 */

$(function(){
    $('#zol .products .nav li').each(function(){
        var offset = $(this).offset(),
            top = offset.top + $(this).height(),
            left = offset.left;
        $('#sub-' + this.id).css({'top':top, 'left':left});
    });
    $('#zol .products .nav li').hover(function(){
        $('#sub-' + this.id).toggle();
    });
    $('#zol .subnav ul').bind('mouseover mouseout',function(){
        $(this).toggle();
        $('#' + this.id.substr(4)).toggleClass('hover');
    });
});