/**
 * @param {?} data
 * @return {undefined}
 */
var answerApp = function() {
  /**
   * @param {Object} element
   * @param {number} stageIterator
   * @param {number} arrAnswer
   * @return {undefined}
   */
   var data;
   var targetID;

   function buttonHTMLGenerator (shablon, replaceArr) {
    var result = '';
    result = shablon;
    replaceArr.forEach(function (item) {
       result = result.replace( item[0], item[1] );
    });
    if (result){
    return result;
  }
   };

   var answerShablon =              '<div class="panel panel-default" id="answerPanel">'+
                        '<div class="panel-heading">'+
                          ' <button id="buttonBack" class="btn btn-default btn-sm">'+
                           '<span class="glyphicon glyphicon-chevron-left">'+
                           '</span>'+
                        '</button>'+
                        'Шаг <span id="stageNumber"></span>'+
                        '</div>'+
                        '<form id="answerForm" class="form-horizontal">'+
                           '<div class="form-group">'+
          '{{elements}}'+
                              '</div>'+
                           '</div>'+
                        '</form>'+
                     '</div>';

   var buttonShablon = '<div class="col-xs-4">'+
                      '<div  class="text-center">'+
                        '<button id="{{buttonId}}" type="submit" class="btn btn-primary btn-lg hidden">'+
                        '</button>'+
                      '</div>'+
                     '</div>';
   
   var captionHTML = '<div class="col-xs-12">'+
                          '<h4 class="text-center" id="stageCaption">'+
                         '</h4>'+
                        '</div>';
                        
  var buttonLeftHTML =  buttonHTMLGenerator (buttonShablon, [['{{buttonId}}', 'leftButton']]);
  var buttonRightHTML =  buttonHTMLGenerator (buttonShablon, [["{{buttonId}}", 'rightButton']]);
  var buttonCenterHTML =  buttonHTMLGenerator (buttonShablon, [["{{buttonId}}", 'centerButton']]);
  var elementsHTML = captionHTML + buttonLeftHTML + buttonCenterHTML + buttonRightHTML; 

  function drawDOM () {
  var answerHTML = answerShablon.replace('{{elements}}', elementsHTML);
  $(targetID).append(answerHTML);  
  }

  function reDraw (element) {
    formEmpty();


  }

  function Model () {
   var centerButton = { visible: false, value: ''};
   var leftButton = { visible: false, value: ''};
   var rightButton = { visible: false, value: ''};
   var stageIterator = { visible: false, value: ''};
   var stageCaption = { visible: false, value: ''};
   var node = 0;
   var listers = [];
    return {
     nodeChange : function  (nodeNumber) { 
        node = nodeNumber;
        listers.forEach( function (lister) {
          lister();
        });
      },
    addLister: function (fn) {
      lister.push(fn);
      }
    }
  }

  function controller  (model, view) {
    model.addLister(view.reDraw);
  }



   function updateModel(element, stageIterator, arrAnswer) {
    stageIterator += 1;
    /** @type {Array} */
    var stage = [];
    stage.caption = element.name;
    stage.tooltip = element.tooltip;
    formEmpty();
    $("#stageNumber").append(stageIterator);
    $("#rightButton").empty();
    $("#centerButton").addClass("hidden");
    $("#leftButton").addClass("hidden");
    $("#rightButton").addClass("hidden");
    $("#stageCaption").append(stage.caption);
    $("#tooltip").append(stage.tooltip);
    $("#buttonBack").bind("click", function() {
      buttonBack(arrAnswer[1]);
    });
    if (element.children) {
      element.children.forEach(addButton);
    }
  }
  /**
   * @return {undefined}
   */
  function formEmpty() {
  //  $('answerForm').find( "button" ).empty();
    $("#stageCaption").empty();
    $("#centerButton").empty();
    $("#tooltip").empty();
    $("#leftButton").empty();
    $("#stageNumber").empty();
    $("#centerButton").addClass("hidden");
    $("#leftButton").addClass("hidden");
    $("#rightButton").addClass("hidden");
  }
  /**
   * @param {Object} element
   * @param {number} stageIterator
   * @return {undefined}
   */
  function buttonBack(element, stageIterator) {
    updateModel(element, stageIterator);
  }
  /**
   * @param {Array} arrAnswer
   * @return {undefined}
   */
  function answerFormInit(arrAnswer) {
    /** @type {number} */
    var stageIterator = 1;
    formEmpty();
    if (arrAnswer[0].typeOf === "Stage-Start") {
      /** @type {Array} */
      var stage = [];
      stage.caption = arrAnswer[0].name;
      stage.tooltip = arrAnswer[0].tooltip;
      /** @type {string} */
      stage.buttonCaption = "\u041d\u0430\u0447\u0430\u0442\u044c";
      $("#tooltip").empty();
      $("#tooltip").append(stage.tooltip);
      $("#stageCaption").append(stage.caption);
      $("#centerButton").append(stage.buttonCaption);
      $("#stageNumber").empty();
      $("#stageNumber").append(stageIterator);
      if (arrAnswer[0].children) {
        var childrenOne = arrAnswer[0].children[0];
        $("#centerButton").removeClass("hidden");
        $("#centerButton").bind("click", function() {
          updateModel(childrenOne, stageIterator, arrAnswer);
        });
      }
    }
  }
  /**
   * @param {Object} element
   * @param {number} stageIterator
   * @return {undefined}
   */
  function addButton(element, stageIterator) {
    var elementType = element.typeOf;
    var id;
    if (btnTypeArr.indexOf(elementType) !== -1) {
      switch(elementType) {
        case "Answer-Yes":
          /** @type {string} */
          id = "#leftButton";
          break;
        case "Answer-No":
          /** @type {string} */
          id = "#rightButton";
          break;
        case "Answer-Next":
          /** @type {string} */
          id = "#centerButton";
          break;
        default:
          console.log("\u043d\u0435\u0438\u0437\u0432\u0435\u0442\u0441\u043e\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0432 addButton");
      }
    }
    var name = element.name || "null";
    var elementChildren = element.children || "null";
    if (id && (name && elementChildren)) {
      $(id).append(name);
      $(id).removeClass("hidden");
      $(id).bind("click", function() {
        updateModel(elementChildren[0], stageIterator);
      });
    }
  }
  /** @type {Array} */
  var btnTypeArr = ["Answer-Yes", "Answer-No", "Answer-Next"];
 
   return {
  draw: function(whereDraw) {
    targetID = whereDraw;
    drawDOM();
  }, 
  load: function (source, targetView) {
    data = source;   
    $.getJSON(data, function( data ) {
    answerFormInit(data );
  });
  }
}
};
