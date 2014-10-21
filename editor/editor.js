$(document).ready(function() {

  var tree = [];
  var curElem = tree[0];
  var id = 0;

  var shablon = {
  	name: '',
    parent: '',
    figure: '',
    tooltip: '',
    id: '',
    parentId: '',
    children: []
  };


  var shablonHTML = '<div id="{{id}}" class="inline">'+
  						        '<p>{{name}}<p>'+
  						        '<p>{{tooltip}}<p>'+
  						        '<p>{{type}}<p>'+
                      '<button type="button" class="btn btn-default addChildren">+</button>'+
					          '</div>'
                    ;


  function drawElement(element, target) {
  	target.css('border','1px solid red');
  target.attr('id');
    var newHTML = shablonHTML;
    var that = this;
    var curID = id;
    newHTML =  newHTML.replace('{{id}}', curID);
  	newHTML =  newHTML.replace('{{name}}', element.name);
  	newHTML =  newHTML.replace('{{tooltip}}', element.tooltip);
  	newHTML =  newHTML.replace('{{type}}', element.type);
    target.append(newHTML);
    $('#'+curID+' .btn').bind("click", function(e) {
    var neWtarget =  $('#'+curID);
    var parrentId = curID;
    addElement(neWtarget, parrentId);
  });

  }


  function addElement(target, parrentId) {
  	var newElement = shablon;
    id++;
    newElement.id = id;
    newElement.parrentId = id;
  	newElement.name = $('#name').val();
  	newElement.type = $('#figure option:selected').val();
  	newElement.tooltip = $('#tooltip').val();
  	drawElement(newElement, target);
    tree.push(newElement);
  }

  function textAreaFilling() {
  }

  $('#add').bind("click", function(e) {
    var target = $('#target');
    addElement(target);
  });

    $('#generate').bind("click", function(e) {
    var resultTree = [];
    resultTree.push(tree.shift());

  });

function convertArr(arrDonor, result, cur) {
  if (arrDonor[0]) {
    arrDonor.forEach ( function (item, index) {
      if item.parrentId = curID {
        result.children = [];
        result.children.push(arrDonor.slice(index,1));

          convertArr(arrDonor, result, item.id);
      }
    })
  }
}

	});
