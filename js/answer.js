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
  load: function (source) {
    data = source;   
 $.getJSON(data, function( data ) {
    answerFormInit(data );
  });
  }
}
};
