/**
 * @param {?} data
 * @return {undefined}
 */
var answerApp = function() {
 "use strict";
  /**
   * @param {Object} element
   * @param {number} stageIterator
   * @param {number} arrAnswer
   * @return {undefined}
   */
   var data;
   var targetID;

    var view = {
    answerShablon : '',
    buttonShablon : '',
    captionHTML : '',
    buttonLeftHTML : '',
    buttonRightHTML : '',
    buttonCenterHTML : '',
    buttonLeft : function (val) { domSetter("#leftButton" , val); },
     buttonRight : function (val) { domSetter("#rightButton" , val); },
      buttonCenter : function (val) { domSetter("#centerButton" , val); },
       caption : function (val) { domSetter("#stageCaption" , val); },
        stageNumber : function (val) { domSetter( "#stageNumber" , val); },
         buttonLeftSetHndl : function (fn, context, arg) { 
           $("#leftButton").bind("click", {index: arg}, function () {        
          fn.call(context, arg);
          }); 
        },
     buttonRightSetHndl : function (fn, context, arg) { 
           $("#rightButton").bind("click", {index: arg}, function () {        
          fn.call(context, arg);
          }); 
        },
      buttonCenterSetHndl : function (fn, context, arg) { 
           $("#centerButton").bind("click", {index: arg}, function () {        
          fn.call(context, arg);
          }); 
        }
  };


  function domSetter (elementId, val) {
     if (val) {
        $(elementId).empty();
        $(elementId).append(val);
       if ($(elementId).hasClass('hidden')) 
        {  
          $(elementId).removeClass('hidden'); 
        }
      } 
      else {
      if  (!$(elementId).hasClass('hidden')) {  
          $(elementId).addClass('hidden'); 
        }
      }
  }

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

view.answerShablon =              '<div class="panel panel-default" id="answerPanel">'+
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

  view.buttonShablon = '<div class="col-xs-4">'+
                      '<div  class="text-center">'+
                        '<button id="{{buttonId}}" type="submit" class="btn btn-primary btn-lg hidden">'+
                        '</button>'+
                      '</div>'+
                     '</div>';
   
  view.captionHTML = '<div class="col-xs-12">'+
                          '<h4 class="text-center" id="stageCaption">'+
                         '</h4>'+
                        '</div>';
                        
  view.buttonLeftHTML =  buttonHTMLGenerator (view.buttonShablon, [['{{buttonId}}', 'leftButton']]);
  view.buttonRightHTML =  buttonHTMLGenerator (view.buttonShablon, [["{{buttonId}}", 'rightButton']]);
  view.buttonCenterHTML =  buttonHTMLGenerator (view.buttonShablon, [["{{buttonId}}", 'centerButton']]);
  view.elementsHTML = view.captionHTML + view.buttonLeftHTML + view.buttonCenterHTML + view.buttonRightHTML; 

 view.drawDOM = function  (targetID) {
  var answerHTML = view.answerShablon.replace('{{elements}}', view.elementsHTML);
  $(targetID).append(answerHTML);  
  }

  

  function Model () {
   var self = this;
   var firsVariant = { visible: false, value: '', lstr : []};
   var secondVariant = { visible: false, value: '', lstr : []};
   var trdVariant = { visible: false, value: '', lstr : []};
   var stageNumber = { visible: false, value: '', lstr : []};
   var stageText = { visible: false, value: '', lstr : []};
   var node = '';
   var curElement = 0;
    return {
     curElementSet : function ( element) { curElement = element; },
     firsVariantSet : function ( val) { setter (firsVariant, val); },
     secondVariantSet : function ( val) { setter (secondVariant, val); },
     trdVariantSet : function ( val) { setter (trdVariant, val); },
     stageNumberSet : function ( val) { setter (stageNumber, val); },
     stageTextSet : function ( val) { setter (stageText, val); },
     firsVariantAddLstr : function (  lstr) { firsVariant.lstr.push(lstr); },
     secondVariantAddLstr : function (  lstr) { secondVariant.lstr.push(lstr); },
     trdVariantAddLstr : function (  lstr) { trdVariant.lstr.push(lstr); },
     stageNumberAddLstr : function (  lstr) { stageNumber.lstr.push(lstr); },
     stageTextAddLstr : function (  lstr) { stageText.lstr.push(lstr); },
     firsVariantGet : function ( ) { return firsVarian.value; },
     secondVariantGet : function ( ) { return  secondVariant.value; },
     trdVariantGet : function ( ) { return trdVariant.value; },
     stageNumberGet : function ( ) { return stageNumber.value; },
     stageTextGet : function ( ) { return  stageText.value; },
     curElementGet : function ( ) { return curElement; },
     init : function (element) {
      this.curElementSet(element);
          this.stageTextSet(element.name);
    if (element.children[1] && element.children[0]) {
         this.firsVariantSet(element.children[0].name);
           this.trdVariantSet(element.children[1].name);
    } else if (element.children[0] ) {
        this.secondVariantSet(element.children[0].name);
    }
     },

     update : function ( index ) {
      
    if (curElement.children)   {
   var curElemChild = curElement.children[index];
    var newCurElem = curElemChild.children[0];
    this.curElementSet(newCurElem);
    var element = this.curElementGet();
      this.stageTextSet(element.name);
    if (curElement.children) {
    if (element.children[1] && element.children[0]) {
           this.firsVariantSet(element.children[0].name);
             this.trdVariantSet(element.children[1].name);
             this.secondVariantSet('');
    } else if (element.children[0] ) {
          this.secondVariantSet(element.children[0].name);
    }
  }
  else {
    this.firsVariantSet('');
    this.secondVariantSet('');
    this.trdVariantSet('');
  }
}
  }
   }
  }
  
 

  function setter  (element, val) {
        if (val){
        element.visible = true;
        element.value = val;
      } 
      else  {
         element.visible = false;
        element.value = '';
      }
       element.lstr.forEach( function (fn) {      
          fn(val); 
        });
     };

var    model = Model ();

  function controller  (model, view) {
    model.stageTextAddLstr(view.caption);
    model.firsVariantAddLstr(view.buttonLeft);
    model.secondVariantAddLstr(view.buttonCenter);
    model.trdVariantAddLstr(view.buttonRight);
    model.stageNumberAddLstr(view.stageNumber);
    view.buttonCenterSetHndl(model.update, model, 0);
    view.buttonRightSetHndl(model.update, model, 1);
    view.buttonLeftSetHndl(model.update, model, 0);
  }

  



/*
   function updateModel(element, stageIterator, arrAnswer) {
    stageIterator += 1;
 
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
  */
  /**

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
 
/*
  function buttonBack(element, stageIterator) {
    updateModel(element, stageIterator);
  }
  /**
   * @param {Array} arrAnswer
   * @return {undefined}
   */
 
/*

  function answerFormInit(arrAnswer) {

    var stageIterator = 1;
    formEmpty();
    if (arrAnswer[0].typeOf === "Stage-Start") {
  
      var stage = [];
      stage.caption = arrAnswer[0].name;
      stage.tooltip = arrAnswer[0].tooltip;
  
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

  */
  /**
   * @param {Object} element
   * @param {number} stageIterator
   * @return {undefined}
   */
  
  /**
  function addButton(element, stageIterator) {
    var elementType = element.typeOf;
    var id;
    if (btnTypeArr.indexOf(elementType) !== -1) {
      switch(elementType) {
        case "Answer-Yes":

          id = "#leftButton";
          break;
        case "Answer-No":
       
          id = "#rightButton";
          break;
        case "Answer-Next":
        
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

  */
  /** @type {Array} */
 //var btnTypeArr = ["Answer-Yes", "Answer-No", "Answer-Next"];
 

   return {
  draw: function(whereDraw) {
   view.drawDOM( whereDraw);

  }, 
  load: function (source, targetView) {
    data = source;    
    $.getJSON(data, function( data ) {
   // answerFormInit(data );
    controller(model, view);
  model.init(data[0]);

  // model.update(0);
  });
  }
}
};
