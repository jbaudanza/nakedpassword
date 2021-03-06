/*!
 * Naked Password Version 0.2.0
 * http://www.nakedpassword.com
 *
 * Copyright 2010, Platform45
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

jQuery.fn.nakedPassword = function (options) {
return this.each (function () {
 
var defaults = {path : "images/", width: 30, height: 28};
var settings = $.extend(defaults, options);
 
 
var prev_password_level = 0;
 
var trigger = function(e) {
var forward = false;
password_level = getPasswordStrength($(this).val());
if(prev_password_level <= password_level){
forward = true;
}
 
toggleImg($(this).attr("id"), password_level);
 
};//end trigger
 
function toggleImg(field, level){
	for(i = 0; i <= 5; i++){
		if(i == level){
			$("#" + field + "pic" + i).fadeIn();
		}else{
			$("#" + field + "pic" + i).fadeOut();
		}
	}
}

function getPasswordStrength(password){
var score = 0;

// Worst password ever.  No points!
if (password.match(/password/) )
{ return 0; }

//if password bigger than 4 give 1 point
if (password.length > 4) { score++; }
 
//if password has both lower and uppercase characters give 1 point
if ( ( password.match(/[a-z]/) ) && ( password.match(/[A-Z]/) ) ) { score++; }
 
//if password has at least one number give 1 point
if (password.match(/\d+/)) { score++; }
 
//if password has at least one special caracther give 1 point
if ( password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) { score++; }
 
//if password bigger than 12 give another 1 point
if (password.length > 8) { score++; }
 
return score;
}
 
 
 
position = $(this).position();
input_height = $(this).outerHeight();
input_width = $(this).outerWidth();
 
pic_width = (((input_height-6)/settings.height)*settings.width); //30 x 28
pic_height = input_height - 6;
 
properties = {
            position: 'absolute',
						display: 'none',
            opacity: 1.0,
            left: (position.left + input_width - (pic_width+3)) + "px",
            top: (position.top + 3) + "px",
            margin: 0 + "px"
          };
 
if($.browser.safari){
            properties.marginTop = 3 + "px";
          }
          else{
            properties.marginTop = 1 + "px";
          }
 
 
for(i = 0; i <= 5; i++){
	$(this).after("<div style='display:none;' id='" + $(this).attr("id") + "pic" + i + "'><img src='" + settings.path + i + ".png' width='" + pic_width + "' height='" + pic_height + "px' /></div>");
	$("#" + $(this).attr("id") + "pic" + i).css(properties);
}
 
$(this).bind('keyup', trigger).bind('blur', trigger);
});
};