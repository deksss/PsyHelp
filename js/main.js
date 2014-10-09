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
         var answerView;
         var diagramView;
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
                answerMethod(item.file, answerView);
                drawGrafMethod(item.file, diagramView);
                selectedDraw ($("#" + itemId));
            });
        };
return {
    load : function() {
        $.getJSON(data, function(json) {
            json.list.forEach(addItem);
        });
    },
    setAnswerView : function ( method) {
answerView = method;
    },
    setDiagramView : function ( method) {
diagramView = method;
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

  
var answerView = $('#answerForm'); 
var diagramView = "[id=diagram]";
var theme =  "js/listOftheme.json";
var diagram = drawGraf;
var answer = answerApp();
answer.draw('#answerContainer');

pageController.load();

themeController.setAnswerView(answerView);
themeController.setDiagramView(diagramView);
themeController.setAnswerMethod(answer.load);
themeController.setDrawGrafMethod(drawGraf);
themeController.setData(theme);
themeController.load();



$('.minimize').bind("click", function(e) {
    var target = $(this).parent();
    target = target.find('div, ul');
    if(!target.hasClass('hidden')) {
    target.addClass('hidden');
} else {
    target.removeClass('hidden');
}

});

});