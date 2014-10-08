var answerApp = function() {
  /**
   * @param {string} elementId
   * @param {?} val
   * @return {undefined}
   */
  function domSetter(elementId, val) {
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
  /**
   * @param {string} shablon
   * @param {Array} replaceArr
   * @return {?}
   */
  function buttonHTMLGenerator(shablon, replaceArr) {
    /** @type {string} */
    var result = "";
    /** @type {string} */
    result = shablon;
    replaceArr.forEach(function(item) {
      result = result.replace(item[0], item[1]);
    });
    if (result) {
      return result;
    }
  }
  /**
   * @return {?}
   */
  function Model() {
    var self = this;
    var history = [];
    var firsVariant = {
      visible : false,
      value : "",
      lstr : []
    };
    var secondVariant = {
      visible : false,
      value : "",
      lstr : []
    };
    var trdVariant = {
      visible : false,
      value : "",
      lstr : []
    };
    var stageNumber = {
      visible : false,
      value : "",
      lstr : []
    };
    var stageText = {
      visible : false,
      value : "",
      lstr : []
    };
    /** @type {string} */
    var node = "";
    /** @type {number} */
    var curElement = 0;
    return{
      /**
       * @param {number} element
       * @return {undefined}
       */
      curElementSet : function(element) {
        /** @type {number} */
        curElement = element;
      },
      /**
       * @param {string} val
       * @return {undefined}
       */
      firsVariantSet : function(val) {
        setter(firsVariant, val);
      },
      /**
       * @param {string} val
       * @return {undefined}
       */
      secondVariantSet : function(val) {
        setter(secondVariant, val);
      },
      /**
       * @param {string} val
       * @return {undefined}
       */
      trdVariantSet : function(val) {
        setter(trdVariant, val);
      },
      /**
       * @param {string} val
       * @return {undefined}
       */
      stageNumberSet : function(val) {
        setter(stageNumber, val);
      },
      /**
       * @param {string} val
       * @return {undefined}
       */
      stageTextSet : function(val) {
        setter(stageText, val);
      },
      /**
       * @param {?} lstr
       * @return {undefined}
       */
      firsVariantAddLstr : function(lstr) {
        firsVariant.lstr.push(lstr);
      },
      /**
       * @param {?} lstr
       * @return {undefined}
       */
      secondVariantAddLstr : function(lstr) {
        secondVariant.lstr.push(lstr);
      },
      /**
       * @param {?} lstr
       * @return {undefined}
       */
      trdVariantAddLstr : function(lstr) {
        trdVariant.lstr.push(lstr);
      },
      /**
       * @param {?} lstr
       * @return {undefined}
       */
      stageNumberAddLstr : function(lstr) {
        stageNumber.lstr.push(lstr);
      },
      /**
       * @param {?} lstr
       * @return {undefined}
       */
      stageTextAddLstr : function(lstr) {
        stageText.lstr.push(lstr);
      },
      /**
       * @return {?}
       */
      firsVariantGet : function() {
        return firsVarian.value;
      },
      /**
       * @return {?}
       */
      secondVariantGet : function() {
        return secondVariant.value;
      },
      /**
       * @return {?}
       */
      trdVariantGet : function() {
        return trdVariant.value;
      },
      /**
       * @return {?}
       */
      stageNumberGet : function() {
        return stageNumber.value;
      },
      /**
       * @return {?}
       */
      stageTextGet : function() {
        return stageText.value;
      },
      /**
       * @return {?}
       */
      curElementGet : function() {
        return curElement;
      },
      /**
       * @param {Object} element
       * @return {undefined}
       */
      init : function(element) {
        this.curElementSet(element);
        this.stageTextSet(element.name);
        if (element.children[1] && element.children[0]) {
          this.firsVariantSet(element.children[0].name);
          this.trdVariantSet(element.children[1].name);
          this.secondVariantSet('');
        } else {
          if (element.children[0]) {
            this.secondVariantSet(element.children[0].name);
              this.firsVariantSet('');
                this.trdVariantSet('');
          }
        }
      },
      /**
       * @param {?} index
       * @return {undefined}
       */
      update : function(index) {
        if (curElement.children && (index===0||index===1)) {
          //alert(JSON.stringify(curElement)+' called in update '+index);
          var tmp = {};
        tmp.element = curElement;
        tmp.index = index;
          history.push(tmp);
         // alert('history added');
          var curElemChild = curElement.children[index];
          var newCurElem = curElemChild.children[0];
          this.curElementSet(newCurElem);
          var element = this.curElementGet();
          this.stageTextSet(element.name);
          //alert(JSON.stringify(element)+' new elem in update, becose index = '+index);
//alert('caption drowe');
          if (curElement.children) {
            if (element.children[1] && element.children[0]) {
              this.firsVariantSet(element.children[0].name);
              this.trdVariantSet(element.children[1].name);
              this.secondVariantSet("");
              // alert('children=2');
            } else {
              if (element.children[0]) {
                this.firsVariantSet("");
                this.secondVariantSet(element.children[0].name);
                this.trdVariantSet("");
               //  alert('children=1');
              }
            }
            // alert('children drow');
          } else {
            this.firsVariantSet("");
            this.secondVariantSet("");
            this.trdVariantSet("");
           //  alert('children drow as null');
          }
        }
      },
      back : function () {       
      var elemForHistory = history.pop();
      if ( history.length > 0) {
              var elemForHistory = history.pop();
    // alert(history.length+elemForHistory.element+ ' _________________'+elemForHistory.index);
      curElement = elemForHistory.element;
      this.update(elemForHistory.index); }
      else {
        curElement = elemForHistory.element;
        this.init(curElement);
        alert('mm');
       
      }      
      }
    };
  }
  /**
   * @param {?} element
   * @param {string} val
   * @return {undefined}
   */
  function setter(element, val) {
    if (val) {
      /** @type {boolean} */
      element.visible = true;
      /** @type {string} */
      element.value = val;
    } else {
      /** @type {boolean} */
      element.visible = false;
      /** @type {string} */
      element.value = "";
    }
    element.lstr.forEach(function(fn) {
      fn(val);
    });
  }
  /**
   * @param {Array} model
   * @param {Object} view
   * @return {undefined}
   */
  

  var data;
  var targetID;
  var view = {
    answerShablon : "",
    buttonShablon : "",
    captionHTML : "",
    buttonLeftHTML : "",
    buttonRightHTML : "",
    buttonCenterHTML : "",
    /**
     * @param {?} val
     * @return {undefined}
     */
    buttonBack : function(val) {
      domSetter('#buttonBack', val);
    },
    buttonLeft : function(val) {
      domSetter("#leftButton", val);
    },
    /**
     * @param {?} val
     * @return {undefined}
     */
    buttonRight : function(val) {
      domSetter("#rightButton", val);
    },
    /**
     * @param {?} val
     * @return {undefined}
     */
    buttonCenter : function(val) {
      domSetter("#centerButton", val);
    },
    /**
     * @param {?} val
     * @return {undefined}
     */
    caption : function(val) {
      domSetter("#stageCaption", val);
    },
    /**
     * @param {?} val
     * @return {undefined}
     */
    stageNumber : function(val) {
      domSetter("#stageNumber", val);
    },
    /**
     * @param {Function} fn
     * @param {Array} context
     * @param {number} arg
     * @return {undefined}
     */

    buttonBakcSetHndl : function(fn, context, arg) {
      setHndlCustom("#buttonBack", fn, context, arg);
    },
    buttonLeftSetHndl : function(fn, context, arg) {
      setHndlCustom("#leftButton", fn, context, arg);
    },
    /**
     * @param {Function} fn
     * @param {Array} context
     * @param {number} arg
     * @return {undefined}
     */
    buttonRightSetHndl : function(fn, context, arg) {
      setHndlCustom("#rightButton", fn, context, arg);
    },
    /**
     * @param {Function} fn
     * @param {Array} context
     * @param {number} arg
     * @return {undefined}
     */
    buttonCenterSetHndl : function(fn, context, arg) {
      setHndlCustom("#centerButton", fn, context, arg);
    }
  };

  function setHndlCustom (targetID, fn, context, arg) {
    $(targetID).bind("click", {
        index : arg
      }, function() {
        fn.call(context, arg);
      });
  }

  /** @type {string} */
  view.answerShablon = '<div class="panel panel-default" id="answerPanel">' + '<div class="panel-heading">' + ' <button id="buttonBack" class="btn btn-default btn-sm">' + '<span class="glyphicon glyphicon-chevron-left">' + "</span>" + "</button>" + '\u0428\u0430\u0433 <span id="stageNumber"></span>' + "</div>" + '<form id="answerForm" class="form-horizontal">' + '<div class="form-group">' + "{{elements}}" + "</div>" + "</div>" + "</form>" + "</div>";
  /** @type {string} */
  view.buttonShablon = '<div class="col-xs-4">' + '<div  class="text-center">' + '<button id="{{buttonId}}" type="submit" class="btn btn-primary btn-lg hidden">' + "</button>" + "</div>" + "</div>";
  /** @type {string} */
  view.captionHTML = '<div class="col-xs-12">' + '<h4 class="text-center" id="stageCaption">' + "</h4>" + "</div>";
  view.buttonLeftHTML = buttonHTMLGenerator(view.buttonShablon, [["{{buttonId}}", "leftButton"]]);
  view.buttonRightHTML = buttonHTMLGenerator(view.buttonShablon, [["{{buttonId}}", "rightButton"]]);
  view.buttonCenterHTML = buttonHTMLGenerator(view.buttonShablon, [["{{buttonId}}", "centerButton"]]);
  /** @type {string} */
  view.elementsHTML = view.captionHTML + view.buttonLeftHTML + view.buttonCenterHTML + view.buttonRightHTML;
  /**
   * @param {?} targetID
   * @return {undefined}
   */
  view.drawDOM = function(targetID) {
    /** @type {string} */
    var answerHTML = view.answerShablon.replace("{{elements}}", view.elementsHTML);
    $(targetID).append(answerHTML);
  };

  function controller(model, view) {
    model.stageTextAddLstr(view.caption);
    model.firsVariantAddLstr(view.buttonLeft);
    model.secondVariantAddLstr(view.buttonCenter);
    model.trdVariantAddLstr(view.buttonRight);
    model.stageNumberAddLstr(view.stageNumber);
    view.buttonCenterSetHndl(model.update, model, 0);
    view.buttonRightSetHndl(model.update, model, 1);
    view.buttonLeftSetHndl(model.update, model, 0);
    view.buttonBakcSetHndl(model.back, model, 0);
  }

  return{
    /**
     * @param {?} whereDraw
     * @return {undefined}
     */
    draw : function(whereDraw) {
      view.drawDOM(whereDraw);
    },
    /**
     * @param {?} source
     * @param {?} targetView
     * @return {undefined}
     */
    load : function(source, targetView) {
      data = source;
      $.getJSON(data, function(data) {
        var model = Model();
        controller(model, view);
        model.init(data[0]);
      });
    }
  };
};
