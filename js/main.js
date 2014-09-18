$( document ).ready(function() {

(function($, windod, drawGrafMethod) {

  $("#getStart, #getStartMenu").bind("click", function() {
    $("#" + "main").removeClass("hidden");
    $("#home").addClass("hidden");
  });
  $("#goHome").bind("click", function() {
    $("#home").removeClass("hidden");
    $("#main").addClass("hidden");
  });  
})(jQuery, window);


(function($, windod) {
function loadTheme () { 
alert('yo!'); 
};
var itemShablon = ' <li><a id="{{id}}" href="#">{{name}}</a></li>';
var id = 0;
$.getJSON("js/listOftheme.json", function(json) {
addListOfTheme(json);
});
function addListOfTheme ( listOfTheme ) {
  listOfTheme.list.forEach(addItem);
};
function addItem (item) {
  var itemHTML = itemShablon;
  var itemId = "listThemeItem"+(id++);
 itemHTML =  itemHTML.replace("{{name}}", item.name);
  itemHTML =  itemHTML.replace("{{id}}", itemId);
$("#listOfSubject").append(itemHTML);
$("#"+itemId).bind("click", function(e) {
  drawGraf(item.file);
  });  
};
})(jQuery, window, drawGraf);


});