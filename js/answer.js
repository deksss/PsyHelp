var answerApp = function() {
  function showCustom(elementId, val) {
    if (val) {
      $(elementId).empty();
      $(elementId).append(val);
      if ($(elementId).hasClass("hidden")) {
        $(elementId).removeClass("hidden");
      }
    } else {
      if (!$(elementId).hasClass("hidden")) {
        $(elementId).addClass("hidden");
      }
    }
  }
  function setHndlCustom(targetID, fn, context, arg) {
    $(targetID).bind("click", function() {
      fn.call(context, arg);
    });
  }
  function replaceCustom(shablon, replaceArr) {
    var result = "";
    result = shablon;
    replaceArr.forEach(function(item) {
      result = result.replace(item[0], item[1]);
    });
    if (result) {
      return result;
    }
  }
  function setter(element, val) {
    if (val) {
      element.value = val;
    } else {
      element.value = "";
    }
    element.lstr.forEach(function(fn) {
      fn(val);
    });
  }
  function Model(elements) {
    var history = [];
    var firsVariant = {
      value : "",
      lstr : []
    };
    var secondVariant = {
      value : "",
      lstr : []
    };
    var trdVariant = {
      value : "",
      lstr : []
    };
    var stageNumber = {
      value : "",
      lstr : []
    };
    var stageText = {
      value : "",
      lstr : []
    };
    var tooltip = {
      value : "",
      lstr : []
    };
    var curObj = 0;
    return{
      curObjSet : function(obj) {
        curObj = obj;
      },
      firsVariantSet : function(val) {
        setter(firsVariant, val);
      },
      secondVariantSet : function(val) {
        setter(secondVariant, val);
      },
      trdVariantSet : function(val) {
        setter(trdVariant, val);
      },
      stageNumberSet : function(val) {
        setter(stageNumber, val);
      },
      stageTextSet : function(val) {
        setter(stageText, val);
      },
      tooltipSet : function(val) {
        setter(tooltip, val);
      },
      firsVariantAddLstr : function(lstr) {
        firsVariant.lstr.push(lstr);
      },
      secondVariantAddLstr : function(lstr) {
        secondVariant.lstr.push(lstr);
      },
      trdVariantAddLstr : function(lstr) {
        trdVariant.lstr.push(lstr);
      },
      stageNumberAddLstr : function(lstr) {
        stageNumber.lstr.push(lstr);
      },
      stageTextAddLstr : function(lstr) {
        stageText.lstr.push(lstr);
      },
      tooltipAddLstr : function(lstr) {
        tooltip.lstr.push(lstr);
      },
      firsVariantGet : function() {
        return firsVarian.value;
      },
      secondVariantGet : function() {
        return secondVariant.value;
      },
      trdVariantGet : function() {
        return trdVariant.value;
      },
      stageNumberGet : function() {
        return stageNumber.value;
      },
      stageTextGet : function() {
        return stageText.value;
      },
      tooltipGet : function() {
        return tooltip.value;
      },
      curObjGet : function() {
        return curObj;
      },
      init : function(element) {
       if (element) {
        this.firsVariantSet("");
        this.secondVariantSet("");
        this.trdVariantSet("");
        this.curObjSet(element);
        this.stageTextSet(element.name);
        this.tooltipSet(element.tooltip || "");
        if (element.children[1] && element.children[0]) {
          this.firsVariantSet(element.children[0].name);
          this.trdVariantSet(element.children[1].name);
        } else {
          if (element.children[0]) {
            this.secondVariantSet(element.children[0].name);
          }
        }
      }
      },
      update : function(index) {
        if (curObj.children && (index === 0 || index === 1)) {
          var tmp = {};
          tmp.element = curObj;
          tmp.index = index;
          history.push(tmp);
          var curElemChild = curObj.children[index];
          var newCurElem = curElemChild.children[0];
          this.curObjSet(newCurElem);
          var element = this.curObjGet();
          this.stageTextSet(element.name);
          this.tooltipSet(element.tooltip || "");
          if (curObj.children) {
            if (element.children[1] && element.children[0]) {
              this.firsVariantSet(element.children[0].name);
              this.trdVariantSet(element.children[1].name);
              this.secondVariantSet("");
            } else {
              if (element.children[0]) {
                this.firsVariantSet("");
                this.secondVariantSet(element.children[0].name);
                this.trdVariantSet("");
              }
            }
          } else {
            this.firsVariantSet("");
            this.secondVariantSet("");
            this.trdVariantSet("");
          }
        }
      },
      back : function() {
         if (history.length) {
        var elemForHistory = history.pop();
        if (history.length > 0) {
          elemForHistory = history.pop();
          curObj = elemForHistory.element;
          this.update(elemForHistory.index);
        } else {
          curObj = elemForHistory.element;
          this.init(curObj);
        }
      }
      }
    };
  }
  function controller(model, view) {
    model.stageTextAddLstr(view.caption);
    model.tooltipAddLstr(view.tooltip);
    model.firsVariantAddLstr(view.buttonLeft);
    model.secondVariantAddLstr(view.buttonCenter);
    model.trdVariantAddLstr(view.buttonRight);
    model.stageNumberAddLstr(view.stageNumber);
    view.buttonCenterSetHndl(model.update, model, 0);
    view.buttonRightSetHndl(model.update, model, 1);
    view.buttonLeftSetHndl(model.update, model, 0);
    view.buttonBakcSetHndl(model.back, model, 0);
  }
  var view$$0 = {
    answerShablon : "",
    buttonShablon : "",
    captionHTML : "",
    buttonLeftHTML : "",
    buttonRightHTML : "",
    buttonCenterHTML : "",
    buttonBack : function(val) {
      showCustom("#buttonBack", val);
    },
    buttonLeft : function(val) {
      showCustom("#leftButton", val);
    },
    buttonRight : function(val) {
      showCustom("#rightButton", val);
    },
    buttonCenter : function(val) {
      showCustom("#centerButton", val);
    },
    caption : function(val) {
      showCustom("#stageCaption", val);
    },
    tooltip : function(val) {
      showCustom("#tooltip", val);
      showCustom("#tooltipMd", val);
    },
    stageNumber : function(val) {
      showCustom("#stageNumber", val);
    },
    buttonBakcSetHndl : function(fn, context, arg) {
      setHndlCustom("#buttonBack", fn, context, arg);
    },
    buttonLeftSetHndl : function(fn, context, arg) {
      setHndlCustom("#leftButton", fn, context, arg);
    },
    buttonRightSetHndl : function(fn, context, arg) {
      setHndlCustom("#rightButton", fn, context, arg);
    },
    buttonCenterSetHndl : function(fn, context, arg) {
      setHndlCustom("#centerButton", fn, context, arg);
    }
  };
  view$$0.answerShablon = '<div class="panel panel-default" id="answerPanel">' + '<div class="panel-heading">' + ' <button id="buttonBack" class="btn btn-default btn-sm">' + '<span class="glyphicon glyphicon-chevron-left">' + "</span>" + "</button>" + '<span id="stageNumber"></span>' + "</div>" + '<form id="answerForm" class="form-horizontal">' + '<div class="form-group">' + "{{elements}}" + "</div>" + "</div>" + "</form>" + "</div>";
  view$$0.buttonShablon = '<div class="col-xs-4">' + '<div  class="text-center">' + '<button id="{{buttonId}}" type="submit" class="btn btn-primary btn-lg hidden">' + "</button>" + "</div>" + "</div>";
  view$$0.captionHTML = '<div class="col-xs-12">' + '<h4 class="text-center" id="stageCaption">' + "</h4>" + "</div>";
  view$$0.buttonLeftHTML = replaceCustom(view$$0.buttonShablon, [["{{buttonId}}", "leftButton"]]);
  view$$0.buttonRightHTML = replaceCustom(view$$0.buttonShablon, [["{{buttonId}}", "rightButton"]]);
  view$$0.buttonCenterHTML = replaceCustom(view$$0.buttonShablon, [["{{buttonId}}", "centerButton"]]);
  view$$0.elementsHTML = view$$0.captionHTML + view$$0.buttonLeftHTML + view$$0.buttonCenterHTML + view$$0.buttonRightHTML;
  view$$0.drawDOM = function(targetID) {
    var answerHTML = view$$0.answerShablon.replace("{{elements}}", view$$0.elementsHTML);
    $(targetID).append(answerHTML);
  };
  return{
    draw : function(whereDraw) {
      view$$0.drawDOM(whereDraw);
    },
    load : function(source, targetView) {
      data = source;
      $.getJSON(data, function(data) {
        var model = Model();
        controller(model, view$$0);
        model.init(data[0]);
      });
    }
  };
};
