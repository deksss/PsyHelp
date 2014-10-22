$(document).ready(function() {

var tree = [];

  var id = 0;

  var shablon = {
  	name: '',
    tooltip: '',
    id: '',
    parentId: '',
    children: []
  };

  var shablonHTML = '<div id="{{id}}" class="col-sm-{{col}}">'+
                      '<button type="button" class="btn btn-default delete">delete</button>'+
  						        '<p>{{name}}<p>'+
  						        '<p>{{tooltip}}<p>'+
                      '<button type="button" class="btn btn-default addChildren">+</button>'+
					          '</div>'
                    ;

  function seraschAndAdd(arr, id, element) {
    if (id === 'null') {
      arr.push(cloneObj(element));
    } else {
    arr.forEach (function (item, index) 
    {
      if (item.id === id) {
        arr[index].children.push(cloneObj(element));
      } else if (item.children.length!==0) {
        seraschAndAdd(arr[index].children, id, cloneObj(element));
      }
    }) 
  }
         return arr;
  };


    function seraschAndDelete(arr, id) {
    if (id === 'null') {
      arr=[];
    } else {
    arr.forEach (function (item, index) 
    {
      if (item.id === id) {
        arr.splice (index, 1);
      } else if (item.children.length!==0) {
        seraschAndDelete(arr[index].children, id);
      }
    }) 
  }
         return arr;
  };



var cloneObj = function( obj ) { 
  return $.extend(true, {}, obj); 
};

  function addElement(target, parrentId) {
  	var newElement = shablon;
    id++;
    newElement.id = id;
    newElement.parrentId = parrentId;
  	newElement.name = $('#name').val();
  	newElement.figure = $('#figure option:selected').val();
  	newElement.tooltip = $('#tooltip').val();
    tree = seraschAndAdd(tree, parrentId, newElement);
  	drawElement(newElement, target);
    }

    //push wraper from more control
    function superPush(arr, element) {
      console.log(arr);
      console.log(JSON.stringify(element));
      arr.push(element);
    }

  function textAreaFilling() {
  };

  $('#add').bind("click", function(e) {
    var target = $('#target');
    addElement(target, 'null');
  });

    $('#generate').bind("click", function(e) {    
      console.log(JSON.stringify(tree));
  });

      function drawElement(element, target) {
    var newHTML = shablonHTML;
    var that = this;
    var curID = id;
  //  alert(curID + ' '+element.id );
    newHTML =  newHTML.replace('{{id}}', curID);
    newHTML =  newHTML.replace('{{name}}', element.name);
    newHTML =  newHTML.replace('{{tooltip}}', element.tooltip);
    //newHTML =  newHTML.replace('{{type}}', element.type);
    if (element.figure === "rhomb" || element.figure === "rect"){
    newHTML =  newHTML.replace('{{col}}', 12); 
   } else {
    newHTML =  newHTML.replace('{{col}}', 4);
  }
    target.append(newHTML);
    $('#'+curID+' .btn').bind("click", function(e) {
    var neWtarget =  $('#'+curID);
    var parrentId = curID;
    addElement(neWtarget, parrentId);
  });

    $('#'+curID+' .delete').bind("click", function(e) {
     tree =  seraschAndDelete(tree, curID);
     $('#'+curID).empty();
  });

  }


	});
