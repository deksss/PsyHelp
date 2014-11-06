$(document).ready(function() {

var tree = [];
var yes = 'да';
var no = 'нет';
var next = 'продолжить';
  var id = 0;
  var shablon = {
  	name: '',
    tooltip: '',
    id: '',
    children: []
  };
  var shablonHTML = '<div id="{{id}}" class="col-sm-{{col}}">'+
                      '<button type="button" class="btn btn-default delete">delete</button>'+
  						        '<p>{{name}}<p>'+
  						        '<p>{{tooltip}}<p>'+
                      '<button type="button" class="btn btn-default yes">+да</button>'+
                      '<button type="button" class="btn btn-default no">+нет</button>'+
                      '<button type="button" class="btn btn-default next">+дальше</button>'+
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


  function addElement(target, parrentId, type, pref) {
  	var newElement = shablon;
    id++;
    newElement.id = id;
    newElement.parrentId = parrentId;
    newElement.figure = 'line';
    newElement.tooltip = '';
    if (type === 'yes') {
      newElement.name = yes;
      tree = seraschAndAdd(tree, parrentId, newElement);
      addElement( $('#'+parrentId), newElement.id, 'custom', 'yes');
    
    };
    if (type === 'no') {
      newElement.name = no;
      tree = seraschAndAdd(tree, parrentId, newElement);
      addElement( $('#'+parrentId), id, 'custom', 'no');

    };
    if (type === 'next') {
      newElement.name = next;
      tree = seraschAndAdd(tree, parrentId, newElement);
      addElement( $('#'+parrentId), id, 'custom', 'next');
      console.log('next dome');
    };
    if (type === 'custom') {
  	   newElement.name = $('#name').val();
  	   newElement.figure = $('#figure option:selected').val();
  	  newElement.tooltip = $('#tooltip').val();
      drawElement(newElement, target, 'custom', pref);
      tree = seraschAndAdd(tree, parrentId, newElement);
    }
    }

  function textAreaFilling() {
  };

  $('#add').bind("click", function(e) {
    var target = $('#target');
    addElement(target, 'null', 'custom');
  });

    $('#generate').bind("click", function(e) {    
      console.log(JSON.stringify(tree));
       $('#resultText').val(JSON.stringify(tree));
       $('#result').removeClass("hidden");
  });

    function drawElement(element, target, type, pref) {
    console.log(JSON.stringify(element) + JSON.stringify(target) + type);
    var newHTML = shablonHTML;
    var that = this;
    var curID = id;
    var name='';
    if (pref === 'yes') {
     name = yes + ': '; 
    }
    if (pref === 'no') {
     name = no + ': '; 
    }
    if (pref === 'next') {
     name = next+ ': '; 
    }
    newHTML =  newHTML.replace('{{id}}', curID);
    newHTML =  newHTML.replace('{{name}}', name + element.name);
    newHTML =  newHTML.replace('{{tooltip}}', element.tooltip);
    if (element.figure === "rhomb" || element.figure === "rect"){
    newHTML =  newHTML.replace('{{col}}', 12); 
   } else {
    newHTML =  newHTML.replace('{{col}}', 4);
  }

    target.append(newHTML);

    $('#'+curID+' .yes').bind("click", function(e) {
    var neWtarget =  $('#'+(curID));
    var parrentId = curID;
    addElement(neWtarget, parrentId, 'yes');
  });

    $('#'+curID+' .no').bind("click", function(e) {
    var neWtarget =  $('#'+(curID));
    var parrentId = curID;
    addElement(neWtarget, parrentId, 'no');
  });

    $('#'+curID+' .next').bind("click", function(e) {
    var neWtarget =  $('#'+(curID));
    var parrentId = curID;
    addElement(neWtarget, parrentId, 'next');
  });

    $('#'+curID+' .delete').bind("click", function(e) {
     tree =  seraschAndDelete(tree, curID);
     $('#'+curID).empty();
  });
  }


	});
