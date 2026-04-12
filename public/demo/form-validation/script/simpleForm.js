/*
 * simpleForm.js
 */

function checkRequired(elem) {
    if ( elem.type == 'checkbox' || elem.type == 'radio' ) {
        return getInputsByName( elem.name ).numChecked;
    } else {
        return elem.value.length > 0 && elem.value != elem.defaultValue;
    }
}

function getInputsByName(name) {
    var results = [];
    results.numChecked = 0;
    
    var input = document.getElementsByTagName('input');
    for ( var i = 0, len = input.length; i < len; i++ ) {
        if ( input[i].name == name ) {
            results.push(input[i]);
            if ( input[i].checked ) {
                results.numChecked++;
            }
        }
    }
    
    return results;
}

function checkEmail(elem) {
    return elem.value != '' &&
            /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(elem.value);
}

function checkURL(elem) {
    return elem.value != '' &&
            /^https?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/.test(elem.value);
}

function checkPhone(elem) {
    var m = /(\d{3}).*(\d{3}).*(\d{4})/.exec(elem.value);
    
    if ( m !== null ) {
        elem.value = "(" + m[1] + ") " + m[2] + "-" + m[3];
    }
    return elem.value != '' && m !== null;
}

function checkDate(elem) {
    var m = /(\d{4}).*(\d{2}).*(\d{2})/.exec(elem.value);
    
    if ( m !== null ) {
        elem.value = m[1] + m[2] + m[3];
    }
    return elem.value != '' && m !== null;
}

window.onload = function(){
    document.getElementsByTagName('form')[0].onsubmit = function(){
        var elem = document.getElementById('age');
        if ( !checkRequired(elem) ) {
            alert( "Required field is empty - " +
                    "you must be over 13 to use this site." );
            return false;
        }
        
        var elem = document.getElementById('name');
        if ( !checkRequired(elem) ) {
            alert( "Required field is empty - please provide your name." );
            return false;
        }
        
        var elem = document.getElementById('email');
        if ( !checkEmail(elem) ) {
            alert( "Field is not an email address." );
            return false;
        }
        
        var elem = document.getElementById('url');
        if ( !checkURL(elem) ) {
            alert( "Field is not an url" );
            return false;
        }
        
        var elem = document.getElementById('phone');
        if ( !checkPhone(elem) ) {
            alert( "Field is not a phone number" );
            return false;
        }
        
        var elem = document.getElementById('date');
        if ( !checkDate(elem) ) {
            alert( "Field is not a valid date" );
            return false;
        }
    };
};