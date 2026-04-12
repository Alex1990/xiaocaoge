/*
 * imageBox.js
 */

var curImage = null;

window.onload = function(){
    /*
        DOM structure
        <div id="overlay"></div>
        <div id="gallery">
        <div id="gallery_image"></div>
        <div id="gallery_prev"><a href="">&laquo; Prev</a></div>
        <div id="gallery_next"><a href="">Next &raquo;</a></div>
        <div id="gallery_title"></div>
        </div>
    */
    
    // Create the gallery container
    var gallery = document.createElement("div");
    gallery.id = "gallery";
    
    // Insert divs to organize content
    gallery.innerHTML = '<div id="gallery_image"></div>' +
            '<div id="gallery_prev"><a href="">&laquo; Prev</a></div>' +
            '<div id="gallery_next"><a href="">Next &raquo;</a></div>' +
            '<div id="gallery_title"></div>';
    
    // Insert gallery to DOM
    document.body.appendChild(gallery);
    
    id("gallery_next").onclick = nextImage;
    id("gallery_prev").onclick = prevImage;
    
    var g = byClass( "gallery", "ul" );
    
    // Traverse all gallerys
    for ( var i = 0; i < g.length; i++ ) {
        var link = tag( "a", g[i] );
        
        // Traverse all image's links
        for ( var j = 0, len = link.length; j < len; j++ ) {
            link[j].onclick = function(){
                
                // Display semitransparent background
                showOverlay();
                
                // Display image
                showImage( this.parentNode );
                
                // Make the browser not to skip image
                return false;
            };
        }
        
        // Add the navigator in the gallery
        addSlideshow( g[i] );
    }
};

function id(name) {
    return document.getElementById(name);
}

function tag( tag, parent ) {
    parent = parent || document;
    return parent.getElementsByTagName(tag);
}

function byClass( cls, tag ) {
    var all = [],
        results = [],
        patt = new RegExp("^|\\d" + cls + "\\d|$");
    
    tag = tag || "*";
    all = document.getElementsByTagName(tag);
    
    for ( var i = 0, len = all.length; i < len; i++ ) {
        if ( patt.test(all[i].className) ) {
            results.push(all[i]);
        }
    }
    
    return results;
}

function showOverlay(){
    if ( ! id('overlay') ) {
        var overlay = document.createElement('div');
        overlay.id = "overlay";
        
        overlay.onclick = hideOverlay;
        document.body.insertBefore(overlay, gallery);
    }
    
    var overlay = id('overlay');
    
    overlay.style.height = pageHeight() + "px";
    overlay.style.width = pageWidth() + "px";
    
    fadeIn(overlay, 50);
}

function pageHeight() {
    return document.body.scrollHeight;
}

function pageWidth() {
    return document.body.scrollWidth;
}

function fadeIn(elem, opacity) {
    setOpacity( elem, 0 );
    
    show( elem );
    
    for ( var i = 0; i <= opacity; i += 10 ) {
        (function(){
            var pos = i;
            setTimeout(function(){
                setOpacity( elem, pos );
            }, ( pos + 1 ) * 5 );
        })();
    }
}


function show(elem) {
    elem.style.display = elem.$oldDisplay || 'block';
}

function setOpacity( elem, level ) {
    if ( elem.filters ) {
        elem.style.filter = 'alpha(opacity=' + level + ')';
        elem.style.zoom = 1;
    } else {
        elem.style.opacity = level / 100;
    }
}

function hideOverlay(){
    curImage = null;
    hide( id("overlay") );
    hide( id("gallery") );
}

function hide(elem) {
    var curDisplay = getStyle( elem, 'display' );
    
    if ( curDisplay != 'none' ){
        elem.$oldDisplay = curDisplay;
    }
    elem.style.display = 'none';
}

function getStyle( elem, name ) {
    
    if ( elem.style[name] ) {
        return elem.style[name];
    } else if ( elem.currentStyle ) {
        return elem.currentStyle[name];
    } else if ( document.defaultView && document.defaultView.getComputedStyle )
            {
        name = name.replace( /[A-Z]/g, "-$1" );
        name = name.toLowerCase();
        
        var s = document.defaultView.getComputedStyle(elem);
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
}

function showImage(cur) {
    curImage = cur;
    
    var img = id('gallery_image');
    
    // Delete current image
    if ( img.firstChild ) {
        img.removeChild( img.firstChild );
    }
    
    // Instead with the new image
    img.appendChild( cur.firstChild.cloneNode(true) );
    
    // Set the 'alt' content to the introduction of the image
    id('gallery_title').innerHTML = cur.firstChild.firstChild.alt;
    
    // Shift the nav button state
    shiftBtn();
    
    var gallery = id('gallery');
    
    // Display the appropriate size
    gallery.className = cur.className;
    
    if ( getStyle( gallery, 'display' ) == 'none' ) {
        fadeIn( gallery, 100 );
    } else {
        fadeIn( img, 100 );
    }
    
    adjust();
}

function adjust(){
    var obj = id('gallery');
    
    // Check if gallery is exist
    if ( !obj ) return;
    
    var w = getWidth(obj);
    var h = getHeight(obj);
    
    var t = scrollY() + ( windowHeight() / 2 ) - ( h / 2 );
    if ( t < 0 ) t = 0;
    
    var l = scrollX() + ( windowWidth() / 2 ) - ( w /2 );
    if ( l < 0 ) l = 0;
    
    setY( obj, t );
    setX( obj, l );
}

window.onresize = document.onscroll = adjust;

function getHeight(elem) {
    return parseInt( getStyle( elem, "height" ) );
}

function getWidth(elem) {
    return parseInt( getStyle( elem, "width" ) );
}

function windowHeight() {
    var de = document.documentElement;
    
    return self.innerHeight || ( de && de.clientHeight ) ||
            document.body.clientHeight;
}

function windowWidth() {
    var de = document.documentElement;
    
    return self.innerWidth || ( de && de.clientWidth ) ||
            document.body.clientWidth;
}

function setX(elem, pos) {
    elem.style.left = pos + "px";
}

function setY(elem, pos) {
    elem.style.top = pos + "px";
}

function scrollX() {
    var de = document.documentElement;
    
    return self.pageXOffset || ( de && de.scrollLeft ) ||
            document.body.scrollLeft;
}

function scrollY() {
    var de = document.documentElement;
    
    return self.pageYOffset || ( de && de.scrollTop ) ||
            document.body.scrollTop;
}

function prevImage() {
    showImage( prev(curImage) );
    
    return false;
}

function nextImage() {
    showImage( next(curImage) );
    return false;
}

function shiftBtn() {
    if ( !next(curImage) ) {
        hide( id('gallery_next') );
    } else {
        show( id('gallery_next') );
    }
    
    if ( !prev(curImage) ) {
        hide( id('gallery_prev') );
    } else {
        show( id('gallery_prev') );
    }
}

function prev ( elem ) {
    do {
        elem = elem.previousSibling;
    } while ( elem && elem.nodeType != 1 );
    return elem;
}

function next ( elem ) {
    do {
        elem = elem.nextSibling;
    } while ( elem && elem.nodeType != 1 );
    return elem;
}

function addSlideshow(elem) {
    var div = document.createElement('div');
    div.className = 'slideshow';
    
    var span = document.createElement('span');
    span.innerHTML = elem.title;
    div.appendChild(span);
    
    var a = document.createElement('a');
    a.href = '';
    a.innerHTML = '&raquo; View as a Slideshow';
    
    a.onclick = function(){
        startShow( this.parentNode.nextSibling );
        return false;
    };
    
    div.appendChild(a);
    elem.parentNode.insertBefore( div, elem );
}

function startShow(obj) {
    var elem = tag( 'li', obj );
    var gallery = id('gallery');
    
    for ( var i = 0, len = elem.length; i < len; i++ ) new function() {
        var cur = elem[i];
        
        setTimeout(function(){
            showImage(cur);
            setTimeout(function(){
                fadeOut(gallery, 0 );
            }, 3500 );
        }, i * 5000 );
    };
    
    setTimeout( hideOverlay, 5000 * elem.length );
    
    showOverlay();
}

function fadeOut(elem, opacity) {
    var curOp = getStyle( elem, 'opacity' );
    
    for ( var i = curOp; i >= opacity; i -= 10 ) {
        setTimeout(function(){
            setOpacity( elem, i );
        }, ( i + 1 ) / 10 );
    }
}