$(document).ready(function() {

  var tree = [{}];
  var curElem = tree[0];
  var id = 0;

  var shablon = {
  	name: '',
    parent: '',
    figure: '',
    tooltip: '',
    children: []
  };


  var shablonHTML = '<div id="{{id}}" class="col-sm-4">'+
  						        '<p>{{name}}<p>'+
  						        '<p>{{tooltip}}<p>'+
  						        '<p>{{type}}<p>'+
                      '<button type="button" class="btn btn-default addChildren">+</button>'+
                      '<div class="children">'
                      '</div>'
					          '<div>';

  function drawElement(element, target) {
  	var newHTML = shablonHTML;
    id++;
    var curID = id;
    newHTML =  newHTML.replace('{{id}}', curID);
  	newHTML =  newHTML.replace('{{name}}', element.name);
  	newHTML =  newHTML.replace('{{tooltip}}', element.tooltip);
  	newHTML =  newHTML.replace('{{type}}', element.type);
    target.append(newHTML);
    $('.btn btn-default addChildren').bind("click", function(e) {
      alert(1);
    var target =  $(this).parent().find('.children');
    addElement(target);
  });
  }

  function addElement(target) {
  	var newElement = shablon;
  	newElement.name = $('#name').value;
  	newElement.type = $('#type').type
  	newElement.tooltip = $('#tooltip').value;
    if (curElem.children){
      curElem.children.push(newElement);
    } else {
      curElem = newElement;
    }
  	drawElement(newElement, target);
  }

  function textAreaFilling() {
  }

  $('#add').bind("click", function(e) {
$('#target');
    var target = $('#target').find('.children');
    addElement(target);
  });




	});
