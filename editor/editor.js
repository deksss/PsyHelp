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


  var shablonHTML = '<div id="{{id}}" class="inline">'+
  						        '<p>{{name}}<p>'+
  						        '<p>{{tooltip}}<p>'+
  						        '<p>{{type}}<p>'+
                      '<button type="button" class="btn btn-default addChildren">+</button>'+
					          '</div>'
                    ;




  function seraschAndAdd(arr, id, element) {
    //alert(JSON.stringify(element));
   // alert(id);
   // alert(arr.stringify+' arr');
    if (id === 'null') {
      arr.push(cloneObj(element));
//alert("zapushili nul")
    } else {
    arr.forEach (function (item, index) 
    {
     // alert("item:"+item.id +' parid'+ id);
      if (item.id === id) {
       // alert("we in space")
        arr[index].children.push(cloneObj(element));
       // alert("we done push");
      } else if (item.children.length!==0) {
        seraschAndAdd(arr[index].children, id, cloneObj(element));
      //  alert("we done recurs");
      }
    }) 
  }
         return arr;
  };
var cloneObj = function( obj ){ return $.extend(true, {}, obj); }
  function addElement(target, parrentId) {
  	var newElement = shablon;
    id++;
    newElement.id = id;
    newElement.parrentId = parrentId;
  	newElement.name = $('#name').val();
  	newElement.type = $('#figure option:selected').val();
  	newElement.tooltip = $('#tooltip').val();
    tree = seraschAndAdd(tree, parrentId, newElement);
   
  // superPush( tree,  cloneObj(newElement));
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
    target.css('border','1px solid red');
    target.attr('id');
    var newHTML = shablonHTML;
    var that = this;
    var curID = id;
  //  alert(curID + ' '+element.id );
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


	});
