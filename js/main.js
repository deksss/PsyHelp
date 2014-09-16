$( document ).ready(function() {

(function($, windod) {

  $("#getStart, #getStartMenu").bind("click", function() {
    $("#" + "main").removeClass("hidden");
    $("#home").addClass("hidden");
  });
  $("#goHome").bind("click", function() {
    $("#home").removeClass("hidden");
    $("#main").addClass("hidden");
  });
  
})(jQuery, window);


});