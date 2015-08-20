'use strict';

app.factory('sharing', function() {

  var show = function() {
    var SHARING_TPL =
    '<div class="backdrop visible active"></div>' +
    '<div class="tips-sharing"></div>';

    var sharingContent = document.createElement('div');
    sharingContent.id = 'sharing-box';
    sharingContent.innerHTML = SHARING_TPL;
    sharingContent.onclick = function () {
      hide();
    };
    document.body.appendChild(sharingContent);
  };

  var hide = function() {
    var el = document.getElementById('sharing-box');
    if (el.remove) {
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
