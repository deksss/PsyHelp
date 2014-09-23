$(document).ready(function() {

var pageController = (function () {
   var elementList = [{
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

var addHndl = function(element) {
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

    return {
        load : function() {
        self = this;
        elementList.forEach(addHndl);
    }

    }
})();
  
  var themeController = (function () {
       var itemShablon = '<li><a id="{{id}}" href="#">{{name}}</a></li>';
        var id = 0;
        var curSelected = "null";
        var answerMethod;
         var drawGrafMethod;
         var data;
   selectedDraw = function(element) {
        element = element.parent();
        if (curSelected !== "null") {
           curSelected.removeClass("active");
        }
       curSelected = element;
        element.addClass("active");
    }

        function addItem(item) {
          var target = $('#shemeApp');
            var itemHTML = itemShablon;
            var itemId = "listThemeItem" + (id++);
            itemHTML = itemHTML.replace("{{name}}", item.name);
            itemHTML = itemHTML.replace("{{id}}", itemId);
            $("#listOfSubject").append(itemHTML);
            $("#" + itemId).bind("click", function(e) {
                $("#shemeApp").removeClass("hidden");
                answerMethod(item.file);
                drawGrafMethod(item.file);
                selectedDraw ($("#" + itemId)); 

            });
        };
return {
    load : function() {
        $.getJSON(data, function(json) {
            json.list.forEach(addItem);
        });
    },
    setAnswerMethod : function ( method) {
answerMethod = method;
    },

    setDrawGrafMethod : function (method) {
drawGrafMethod = method;
    },
    setData: function (source) {
data = source;
    }
}
  })();

   
   pageController.load();
    answer = answerApp();
    themeController.setAnswerMethod(answer.load);
    themeController.setDrawGrafMethod(drawGraf);
    themeController.setData("js/listOftheme.json");
    themeController.load();



$('.minimize').bind("click", function(e) {
    var target = $(this).parent().first().next();
    if(!target.hasClass('hidden')) {
    target.addClass('hidden');
} else {
    target.removeClass('hidden');
}

});

});