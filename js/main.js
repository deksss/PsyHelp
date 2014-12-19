$(document).ready(function() {
  /**
   * @return {undefined}
   */
  function findTheme() {
    var val = $("#themeInput").val();
    var item = themeController.getItemBeValue(val);
    $("#" + item.id).trigger("click");
  }


function getFromlokr () {
  //$('#basicModal').removeClass('fade');
  if (Lockr.get('temeId')) {
$("#" + Lockr.get('temeId')).trigger("click");  
  }  
  } 


  var pageController = function() {
    /** @type {Array} */
    var elementList = [{
      "id" : "#getStart",
      "contentId" : "#main",
      "action" : "getFromlokr" 
    }, {
      "id" : "#goShemes",
      "contentId" : "#main",
      "action" : "getFromlokr"
    }, {
      "id" : "#goHome",
      "contentId" : "#home"
    }, {
      "id" : "#goHelp",
      "contentId" : "#help"
    }, {
      "id" : "#goAbout",
      "contentId" : "#about"
    }];
    /**
     * @param {Element} element
     * @return {undefined}
     */
    var addHndl = function(element) {
      var elementBtn = element.id;
      var target = element.contentId;
      $(elementBtn).bind("click", function() {
        if (!$(elementBtn).hasClass("active")) {
          $(elementBtn).parent().find("li").removeClass("active");
          $(elementBtn).addClass("active");
        }
        if ($(target).hasClass("hidden")) {
          $("#main, #home, #about, #help").addClass("hidden");
          $(target).removeClass("hidden");
        }
        if (element.action) {
       getFromlokr ();
        }
      });
    };
    return{
      load : function() {
        self = this;
        elementList.forEach(addHndl);

      }
    };
  }();

  var themeController = function() {
    function addItem(item) {
      var target = $("#shemeApp");
      /** @type {string} */
      item.HTML = itemShablon;
      /** @type {string} */
      item.id = "listThemeItem" + id++;
      itemList.push(item);
      /** @type {string} */
      item.HTML = item.HTML.replace("{{name}}", item.name);
      /** @type {string} */
      item.HTML = item.HTML.replace("{{id}}", item.id);
      $("#listOfSubject").append(item.HTML);
      $("#" + item.id).bind("click", function(e) {
        $("#shemeApp").removeClass("hidden");
        answerMethod(item.file, answerView);
        drawGrafMethod(item.file, diagramView);
        selectedDraw($("#" + item.id));
        Lockr.set('temeId', item.id);
      });
    }
    /** @type {string} */
    var itemShablon = '<li><a id="{{id}}" href="#">{{name}}</a></li>';
    /** @type {number} */
    var id = 0;
    /** @type {string} */
    var curSelected = "null";
    var answerMethod;
    var drawGrafMethod;
    var data;
    var answerView;
    var diagramView;
    /** @type {Array} */
    var itemList = [];
    /**
     * @param {string} element
     * @return {undefined}
     */
    selectedDraw = function(element) {
      element = element.parent();
      if (curSelected !== "null") {
        curSelected.removeClass("active");
      }
      /** @type {string} */
      curSelected = element;
      element.addClass("active");
    };
    return{
      /**
       * @return {undefined}
       */
      load : function() {
        $.getJSON(data, function(json) {
          json.list.forEach(addItem);
        });
         return this;
      },
      /**
       * @param {?} method
       * @return {undefined}
       */
      setAnswerView : function(method) {
        answerView = method;
         return this;
      },
      /**
       * @param {?} method
       * @return {undefined}
       */
      setDiagramView : function(method) {
        diagramView = method;
         return this;
      },
      /**
       * @param {?} method
       * @return {undefined}
       */
      setAnswerMethod : function(method) {
        answerMethod = method;
         return this;
      },
      /**
       * @param {?} method
       * @return {undefined}
       */
      setDrawGrafMethod : function(method) {
        drawGrafMethod = method;
         return this;
      },
      /**
       * @param {?} source
       * @return {undefined}
       */
      setData : function(source) {
        data = source;
        return this;
      },
      /**
       * @param {Object} val
       * @return {?}
       */
      getItemBeValue : function(val) {
        var returnItem;
        itemList.forEach(function(item) {
          if (item.name.toLowerCase() === val.toLowerCase()) {
            returnItem = item;
          }
        });
        return returnItem;
      }
    };
  }();

  var answerView = $("#answerForm");
  /** @type {string} */
  var diagramView = "[id=diagram]";
  /** @type {string} */
  var theme = "js/listOftheme.json";
  var diagram = drawGraf;
  var answer = answerApp();
  
  answer.draw("#answerContainer");
  pageController.load();

  themeController.setAnswerView(answerView)
  .setDiagramView(diagramView)
  .setAnswerMethod(answer.load)
  .setDrawGrafMethod(drawGraf)
  .setData(theme)
  .load();
 
  $(".minimize").bind("click", function(e) {
    var target = $(this).parent().find("div, ul");
    var icon = $(this).find("span");
    if (!target.hasClass("hidden")) {
      target.addClass("hidden");
      icon.removeClass("glyphicon-chevron-up");
      icon.addClass("glyphicon-chevron-down");
    } else {
      target.removeClass("hidden");
      icon.removeClass("glyphicon-chevron-down");
      icon.addClass("glyphicon-chevron-up");
    }
  });

  $("#findTheme").bind("click", findTheme);
  
  $("#themeInput").keydown(function(event) {
    if (event.which == 13) {
      findTheme();
    }
  });
$('#openBtn').click(function(){
  $('#myModal').modal({show:true})
});
 

});
