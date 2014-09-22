$(document).ready(function() {

   /*
    (function($, windod) {
        $("#getStart, #goShemes").bind("click", function() {
            $("#main").removeClass("hidden");
            $("#home").addClass("hidden");
            $("#about").addClass("hidden");
            $("#help").addClass("hidden");
        });
        $("#goHome").bind("click", function() {
            $("#goHome").addClass("active");
            $("#home").removeClass("hidden");
            $("#main").addClass("hidden");
            $("#about").addClass("hidden");
            $("#help").addClass("hidden");
        });
        $("#goHelp").bind("click", function() {

            if (!$("#goHelp").hasClass('active')) {
                $("#goHelp").parent().find('li').removeClass('active');
                $("#goHelp").addClass('active');
            }
            $("#help").removeClass("hidden");
            $("#main").addClass("hidden");
            $("#about").addClass("hidden");
            $("#home").addClass("hidden");
        });
        $("#goAbout").bind("click", function() {
            $("#goAbout").addClass("active");
            $("#about").removeClass("hidden");
            $("#main").addClass("hidden");
            $("#home").addClass("hidden");
            $("#help").addClass("hidden");
        });
    })(jQuery, window); 
*/

    var pageController = {};

    pageController.elementList = [{
        "id": "#getStart",
        "contentId": "#main"
    }, {
        "id": "#goShemes",
        "contentId": "#main"
    }, {
        "id": "#goHome",
        "contentId": "#home"
    }, {
        "id": "#goHelp",
        "contentId": "#help"
    }, {
        "id": "#goAbout",
        "contentId": "#about"
    }];

    pageController.load = function() {
        self = this;
        self.elementList.forEach(self.addHndl);

    }

    pageController.addHndl = function(element) {
     var   elementBtn = element.id;
     var target = element.contentId;
        $(elementBtn).bind("click", function() {
            if (!$(elementBtn).hasClass('active')) {
                $(elementBtn).parent().find('li').removeClass('active');
                $(elementBtn).addClass('active');
                }
            if ($(target).hasClass('hidden')) {
                $('#main, #home, #about, #help').addClass('hidden');
                $(target).removeClass('hidden');
                }   
        });
    }


    var listOftheme = {
        "itemShablon": ' <li><a id="{{id}}" href="#">{{name}}</a></li>',
        "id": 0,
        "curSelected": "null"
    };


    listOftheme.drawActive = function(element) {
        self = this;
        element = element.parent();
        if (self.curSelected !== "null") {
            self.curSelected.removeClass("active");
        }
        self.curSelected = element;
        element.addClass("active");
    }


    listOftheme.load = function(drawGrafMethod, answerMethod, source) {
        self = this;
        $.getJSON(source, function(json) {
            json.list.forEach(addItem);
        });

        function addItem(item) {
          var target = $('#shemeApp');
            var itemHTML = self.itemShablon;
            var itemId = "listThemeItem" + (self.id++);
            itemHTML = itemHTML.replace("{{name}}", item.name);
            itemHTML = itemHTML.replace("{{id}}", itemId);
            $("#listOfSubject").append(itemHTML);
            $("#" + itemId).bind("click", function(e) {
                $("#shemeApp").removeClass("hidden");
                answerMethod(item.file);
                drawGrafMethod(item.file);
                self.drawActive($("#" + itemId));              
            });
        };
    }
    pageController.load();
    listOftheme.load(drawGraf, answerApp, "js/listOftheme.json");

});