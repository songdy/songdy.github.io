'use strict';

app.factory('loading', function($timeout) {

  var show = function(tips, showDelay, hideDelay) {
    var el = document.getElementById('loading-box');
    if (!!el) {
      return;
    }

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
    if (!!showDelay && showDelay > 0) {
      loadingContent.style.display = 'none';

      $timeout(function () {
        var el = document.getElementById('loading-box');
        if (!!el) {
          loadingContent.style.display = 'block';
        }
      }, showDelay);
    }

    if (!!hideDelay && hideDelay > 0) {
      $timeout(function () {
        hide();
      }, hideDelay);
    }

    document.body.appendChild(loadingContent);


  };

  var hide = function() {
    var el = document.getElementById('loading-box');
    if (!!el) {
      if (el.remove) {
        el.remove();
      } else {
        el.parentNode.removeChild(el);
      }
    }
  };

  // Public API here
  return {
    show: show,
    hide: hide
  };
});
