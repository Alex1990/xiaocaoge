/*
 * tbued-nav.js
 * Taobao UED Nav
 */

$(function(){
    $('#tbued .nav li').not('#tbued .subnav li').bind({
        'mouseover': function(){
            var offset = $(this).position();
            $('#tbued #navLabel').finish()
                    .animate({'top':offset.top}, 10);
        },
        'mouseout': function(){
        }
    });
    $('#tbued .subnav li').bind({
        'mouseover': function(){
            var offset = $(this).position();
            $(this).parent().parent().off('mouseover');
            $('#tbued #navLabel').finish()
                    .animate({'top':offset.top}, 10);
        },
        'mouseout': function(){
            $(this).parent().parent().bind('mouseover', function(){
                var offset = $(this).position();
                $('#tbued #navLabel').finish()
                        .animate({'top':offset.top}, 10);
            });
        }
    });
    $('#tbued .nav').bind('mouseleave', function(){
        $('#tbued #navLabel').finish()
                .animate({'top': 0}, 10);
    });
});