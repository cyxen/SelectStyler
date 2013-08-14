/*
 * Selectstyler plugin for jQuery
 * ---
 * Copyright 2013, Sergey Sukhenko
 * Released under the MIT, BSD, and GPL Licenses.
 */
(function($) {
    $.fn.selectstyler = function(options) {

        var settings = $.extend({
            'height-ul': 'auto;'
        }, options);
        this_width = ' style="height:' + settings['height-ul'] + '"';
        //   console.log(this_width);
        //создаем элементы
       // console.log(this);
        this.each(function() {
            text_select = $(this).find('option:selected').html();
            $(this).hide();
            thisname = $(this).attr('name');
            thisid = $(this).attr('id');
            //$(this).addClass('selectstyler_' + count);
            $(this).after('<div id="selectstylerouter_' + thisid + '" class="selectstylerouter"><div id="selectstyler_' + thisid + '" name="selectstyler_' + thisname + '" class="selectstyler">' + text_select + '</div><ul class="selectstylerul" id="selectstylerul_' + thisid + '" ' + this_width + '></ul></div>');
            count_li = 0;
            $(this).find('option').each(function() {
                if ($(this).attr('selected') == "selected") {
                    $("#selectstylerul_" + thisid).append('<li styler-value="' + $(this).val() + '" styler-count="' + count_li + '" class="activeli">' + $(this).html() + '</li>');
                } else {
                    $("#selectstylerul_" + thisid).append('<li styler-value="' + $(this).val() + '" styler-count="' + count_li + '">' + $(this).html() + '</li>');
                }

                count_li++;
            });
            $(this).clone().prependTo('#selectstylerouter_' + thisid);
            $(this).remove();
        });
        //обрабатываем клики
        var one_select_id =$('.selectstylerouter '+this.selector).attr('id');
        var one_select = $('#selectstyler_'+one_select_id);
        one_select.click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            ulthis = $(this).parent().find('.selectstylerul');
            if ($(this).hasClass('active')) {
                ulthis.hide();
                $(this).removeClass('active');
            } else {
                $('.selectstylerul').hide();
                $('.selectstyler').removeClass('active');
                ulthis.css('display','block');
                $(this).addClass('active');
            }
        });
        var one_option = $('.selectstylerul li');
        one_option.click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            this_html = $(this).html();
            $(this).parent().parent().find('.selectstyler').html(this_html);
            $(this).parent().hide();
            $(this).parent().parent().find('.selectstyler').removeClass('active');
            arr_id = $(this).parent().parent().find('select').attr('id');
            eq_elem = $(this).attr('styler-count');
            $(this).parent().find('li').removeClass('activeli');
            $(this).addClass('activeli');
            $('#' + arr_id + ' option:eq(' + eq_elem + ')').prop('selected', true);
        });
        $('html').click(function() {
            $('.selectstylerul').hide();
            $('.selectstyler').removeClass('active');
        });
    };
})(jQuery);