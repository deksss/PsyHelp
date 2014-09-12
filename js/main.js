$( document ).ready(function() {


function updateModel (element) {
  var stage = [];
  stage.caption = element.name;
  stage.tooltip = element.tooltip;
 $( "#stageCaption" ).empty();
 $( "#centerButton" ).empty();
 $( "#tooltip" ).empty();
$( "#leftButton" ).empty();
  $( "#rightButton" ).empty();
 $( "#centerButton" ).addClass("hidden");
 $( "#leftButton" ).addClass("hidden");
 $( "#rightButton" ).addClass("hidden");
  $( "#stageCaption" ).append( stage.caption );  
 $( "#tooltip" ).append( stage.tooltip);
  if ( element.children ) {
      element.children.forEach(addButton);  
  }
}

$.getJSON( "treeData.json", function( json ) {
  answerFormInit(json);
});

function answerFormInit (arrAnswer) {
if(arrAnswer[0].typeOf==="Stage-Start") {
  var stage = [];
  stage.caption = arrAnswer[0].name;
  stage.tooltip = arrAnswer[0].tooltip;
  stage.button = 'Начать';
  $( "#tooltip" ).empty();
  $( "#tooltip" ).append( stage.tooltip );
  $( "#stageCaption" ).append( stage.caption );
  $( "#centerButton" ).append( stage.button );
  if (arrAnswer[0].children){
    var childrenOne = arrAnswer[0].children[0];
    $( "#centerButton" ).removeClass("hidden");
    $( "#centerButton" ).bind( "click", function( ) { updateModel (childrenOne); });
    }
  }
}


function addButton (element, index, array) {
 var elementType = element.typeOf;
 if (elementType==="Answer-Yes" || elementType==="Answer-No") {
    if (elementType==="Answer-Yes") {
        var id = "#leftButton";  
    }
    if (elementType==="Answer-No") {
        var id = "#rightButton";  
    }
    var name = element.name || "null";
    var elementChildren = element.children || "null";
    if ( id && name && elementChildren ) {
      $( id ).append( name );
      $( id ).removeClass("hidden");
      $( id ).bind( "click", function( ) { updateModel (elementChildren[0]); });
    }
  }
}





// Draw Graf
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;
	
var i = 0;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.x, d.y]; });

var svg = d3.select("[id=diagramView]").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load the external data
d3.json("treeData.json", function(error, treeData) {
  root = treeData[0];
  update(root);
});

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);
	

  // Normalize for fixed-depth. тут вычисляеться растояние между нодами
  nodes.forEach(function(d) { d.y = d.depth * 50; });

  // Declare the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")"; });	  
 
 var circles = nodeEnter.filter(function (d) {
        return d.figure == "rhomb"
    })
            .append("rect")
            .attr("x", function(d) { d.x = d.x + 10; })
            .attr("width", 20)
            .attr("height", 20)
            .attr("rx", 1)
            .attr("ry", 1)
            .attr("transform", "rotate(45)")
            ;

    var rect = nodeEnter.filter(function (d) {
        return d.figure == "rect"
    })
            .append("rect")
            .attr("x", function(d) { d.x = d.x + 10; })
            .attr("width", 20)
            .attr("height", 20)
            .attr("rx", 1)
            .attr("ry", 1)
            ;

              var rect = nodeEnter.filter(function (d) {
        return d.figure == "line"
    })
            .append("rect")
            .attr("x", function(d) { d.x = d.x + 10; })
            .attr("width", 1)
            .attr("height", 1)
            .attr("rx", 1)
            .attr("ry", 1)
            ;

  nodeEnter.append("text")
	  .attr("x", function(d) { 
		  return d.children || d._children ? 30 : -13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { 
		  return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1);

  // Declare the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", diagonal);

}

});