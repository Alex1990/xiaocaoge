/*
 * formValidation.js
 */

var errMsg = {
    
    required: {
        msg: "This field is required.",
        test: function(obj, load) {
            if ( obj.type == 'checkbox' || obj.type == 'radio' ) {
                var results = [],
                    name = obj.name;
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
                return results.numChecked;
            } else {
                return obj.value.length > 0 && obj.value != obj.defaultValue;
            }
        }
    },

    email: {
        msg: "Not a valid email address.",
        test: function(obj) {
            return !!obj.value &&
                    /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(
                    obj.value); 
        }
    },
    
    phone: {
        msg: "Not a valid phone number.",
        test: function(obj) {
            var m = /(\d{3}).*(\d{4}).*(\d{4})/.exec(obj.value);
            if (m) {
                obj.value = m[1] + " " + m[2] + " " + m[3];
            }
            return !!obj.value && m;
        }
    },
    
    date: {
        msg: "Not a valid date.",
        test: function(obj) {
            return !!obj.value && /(\d{4}).*(\d{2}).*(\d{2})/.test(obj.value);
        }
    },
    
    url: {
        msg: "Not a valid url.",
        test: function(obj) {
            return !!obj.value && obj.value == 'http://' ||
                    /^https?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/.test(
                    obj.value);
        }
    }
};

// Validate all elements of the form
function validateForm( form, load ) {
    var valid = true;

    for ( var i = 0, len = form.elements.length; i < len; i++ ) {
        hideErrors( form.elements[i] );
        if ( validateField( form.elements[i], load ) ) {
            valid = false;
        }
    }
    return valid;
}

// Validate single element
function validateField( elem, load ) {
    var errors = [];
    
    for ( var name in errMsg ) {
        var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
        if ( re.test( elem.className ) && !errMsg[name].test( elem, load) ) {
            errors.push( errMsg[name].msg );
        }
    }
    
    if ( errors.length ) {
        showErrors( elem, errors );
    }
    
    return errors.length > 0;
}

// Hide all error message
function hideErrors( elem ) {
    var next = elem.nextSibling;
    
    if ( next && next.nodeName.toUpperCase() == "UL" && 
            next.className == "errors" ) {
        elem.parentNode.removeChild(next);
    }
}

// Show certain field's error message
function showErrors( elem, errors ) {
    var next = elem.nextSibling;
    
    if ( next && next.nodeName.toUpperCase() != "UL" || 
            next.className != "errors" ) {
        next = document.createElement("ul");
        next.className = "errors";
        elem.parentNode.insertBefore( next, elem.nextSibling );
    }
    
    for ( var i = 0; i < errors.length; i++ ) {
        var li = document.createElement("li");
        li.innerHTML = errors[i];
        next.appendChild(li);
    }
}

// Validate in submit
function watchForm(form) {
    form.onsubmit = function() {
        return validateForm(form);
    };
}

window.onload = function(){
    var form = document.getElementsByTagName("form")[0];
    watchForm(form);
    watchFields(form);
}

// Validate in field value change
function watchFields(form){
    for ( var i = 0, len = form.elements.length; i < len; i++ ) {
        form.elements[i].onchange = function() {
            return validateField(this);
        }
    }
}