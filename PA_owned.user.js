// ==UserScript==
// @name         PA Show My Owned Products
// @namespace    http://
// @version      0.1
// @description  PA Show My Owned Products
// @author       m36
// @match        https://www.plugin-alliance.com/en/products.html*
// @match        https://www.plugin-alliance.com/en/manage-plugins.html
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var product_array = [];
    if (window.location.pathname == '/en/manage-plugins.html') { // on visiting my plugins
        if ($('#tl_logout').length > 0) { // is logged in user
            $('.license-info').each(function(){
                var license_type = $(this).children().eq(1).text();
                if ((license_type == 'nfr license') || (license_type == 'full license')) product_array.push($(this).children().eq(0).text());
            });
            localStorage.setItem("product_array",product_array.join("|")); // cache my owned plugins
        }
    } else {
        product_array = localStorage.getItem("product_array").split("|");
        $('.list-products').each(function() {
            var all_products = $(this);
            all_products.find('li.enabled').each(function() {
                var cur_manuf = $(this).find('.product-manufacturer').text();
                var cur_title = cur_manuf + ' ' + $(this).find('.product-title').text();
                if ($.inArray(cur_title,product_array)>=0) {
                    $(this).find('.product-title a').css('color','#27bd27'); // mark my owned plugins
                    $(this).css('background-color','#18c1184d');
                }

                if ($.inArray(cur_manuf,['iZotope','Native Instruments'])>=0) {
                   // $(this).find('.product-title a').css('color','#0A0A0A'); // mark my owned plugins
                    $(this).css({
                        'filter'         : 'blur(3px)',
                        '-webkit-filter' : 'blur(3px)',
                        '-moz-filter'    : 'blur(3px)',
                        '-o-filter'      : 'blur(3px)',
                        '-ms-filter'     : 'blur(3px)'
                    });
                }
            });
        });
    }
})();