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
  var questShablonHTML = '<div id="{{id}}" class="col-sm-{{col}}">'+
                      '<button type="button" class="btn btn-default delete">delete</button>'+
  						        '<p>{{name}}<p>'+
  						        '<p>{{tooltip}}<p>'+
                      '<button type="button" class="btn btn-default yes">+да</button>'+
                      '<button type="button" class="btn btn-default no">+нет</button>'+
                      '<button type="button" class="btn btn-default next">+дальше</button>'+
					          '</div>'
                    ;

   var actionShablonHTML = '<div id="{{id}}" class="col-sm-{{col}}">'+
                      '<button type="button" class="btn btn-default delete">delete</button>'+
                      '<p>{{name}}<p>'+
                      '<p>{{tooltip}}<p>'+
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

var srchResult = '';
 function seraschAndReturn(arr, id) {
    arr.forEach (function (item, index) 
    {
      if (item.id === id) {
        console.log('ok: '+ item.id);
        srchResult = item;
      } else if (item.children.length!==0) {
        seraschAndReturn(arr[index].children, id);
      }
    }) ;
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

function returTmp () {
  var tmp;
    seraschAndReturn(tree, 3); 
    console.log(srchResult);
    tmp = srchResult.children.length;
  return tmp;
}
 

    $('#generate').bind("click", function(e) {   
       $('#resultText').val(JSON.stringify(tree));
       $('#result').removeClass("hidden");
  });

    function drawElement(element, target, type, pref) {
    if (element.figure === "rhomb") {
      var newHTML = questShablonHTML;
    } else {
      var newHTML = actionShablonHTML;
    }
    var curID = id;    
    var that = this;
    var name='';
    if (curID < 3) {
     var parrentChildCount = 0;      
        } 
        else {
    seraschAndReturn(tree, element.parrentId); 
    console.log(element.parrentId);
    seraschAndReturn(tree, srchResult.parrentId); 
     console.log(srchResult.parrentId);
    var parrentChildCount =  srchResult.children.length; 
    };
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

    if (parrentChildCount === 2) {
    newHTML =  newHTML.replace('{{col}}', 4); 
    };

       if (parrentChildCount === 1) {
    newHTML =  newHTML.replace('{{col}}', 6); 
    };

       if (parrentChildCount === 0) {
    newHTML =  newHTML.replace('{{col}}', 12); 
    };
  
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
