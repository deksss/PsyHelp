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
                      '<div class="children">'+
                      '</div>'+
					          '<div>';


  function drawElement(element, target) {
  	var newHTML = shablonHTML;
    var that = this;
    id++;
    var curID = id;
    newHTML =  newHTML.replace('{{id}}', curID);
  	newHTML =  newHTML.replace('{{name}}', element.name);
  	newHTML =  newHTML.replace('{{tooltip}}', element.tooltip);
  	newHTML =  newHTML.replace('{{type}}', element.type);
    target.append(newHTML);
    $('#'+curID).find('.btn').bind("click", function(e) {
    var target =  $(this).parent().find('.children');
    addElement(target);
  });

  }

  function addElement(target) {
  	var newElement = shablon;
    alert($('#type option:selected').text());
  	newElement.name = $('#name').val();
  	newElement.type = $('#type option:selected').text();
  	newElement.tooltip = $('#tooltip').val();
    if (curElem.children){
      curElem.children.push(newElement);
    } else {
      curElem = newElement;
    }
  	drawElement(newElement, target);
    alert('ok');
  }

  function textAreaFilling() {
  }

  $('#add').bind("click", function(e) {
    var target = $('#target').find('.children');
    addElement(target);
  });

	});
