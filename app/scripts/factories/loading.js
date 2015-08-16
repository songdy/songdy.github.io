'use strict';

  app.factory('loading', function() {

    var show = function(tips) {
      tips = tips ? tips : '加载中...';
      var LOADING_TPL =
        '<div class="backdrop visible  active"></div>' +
        '<div class="backdrop-container visible active">' +
        '<div class="loading">' +
        '<span>' +
        tips +
        '</span>' +
        '</div>' +
        '</div>';

      var loadingContent = document.createElement('div');
      loadingContent.id = 'loading-box';
      loadingContent.innerHTML = LOADING_TPL;
      document.body.appendChild(loadingContent);
    };

    var hide = function() {
      var el = document.getElementById('loading-box');
      if(el.remove) {
        el.remove();
      } else {
        el.parentNode.removeChild(el);
      }
    };

    // Public API here
    return {
      show: show,
      hide: hide
    };
  });
