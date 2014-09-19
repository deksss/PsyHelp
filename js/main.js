$( document ).ready(function() {

(function($, windod) {
  $("#getStart, #getStartMenu").bind("click", function() {
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
   
    if (!$("#goHelp").hasClass('active'))
    {
      alert("w");
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


var pageController = {};

pageController.elementList = 
[
{"id":"#getStart","contentId" : "#main"},
{"id":"#getStartMenu","contentId" : "#main"},
{"id":"#goHome","contentId" : "#home"},
{"id":"#goHelp","contentId" : "#help"},
{"id":"#goAbou","contentId" : "#about"}
];

pageController.contentList = [
"#main","#home","#help","#about"
]

pageController.controll = function () {
  self = this;
  self.elementList.forEach(self.addHndl);
}

pageController.addHndl = function (element) {
  if (!$(element).hasClass('active'))
    {
        $(element).parent().find('li').removeClass('active');
        $(element).addClass('active');
    } 

}


var listOftheme = {
"itemShablon" : ' <li><a id="{{id}}" href="#">{{name}}</a></li>',
"id" : 0,
"curSelected" : "null"
};


listOftheme.drawActive = function (element) {
self = this;
element = element.parent();
if (self.curSelected!=="null") {
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
function addItem ( item ) {
  var itemHTML = self.itemShablon;
  var itemId = "listThemeItem"+(self.id++);
 itemHTML =  itemHTML.replace("{{name}}", item.name);
 itemHTML =  itemHTML.replace("{{id}}", itemId);
$("#listOfSubject").append(itemHTML);
$("#"+itemId).bind("click", function(e) {
  answerMethod(item.file);
  drawGrafMethod(item.file);
  self.drawActive($("#"+itemId));
  $("#shemeApp").removeClass("hidden");
  });  
};
}

listOftheme.load(drawGraf, answerApp,  "js/listOftheme.json");

});