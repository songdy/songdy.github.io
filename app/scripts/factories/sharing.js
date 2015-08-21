'use strict';

app.factory('sharing', function() {

  var show = function() {
    var SHARING_TPL =
    '<div class="backdrop visible active"></div>' +
    '<div class="backdrop-container visible active">' +
    '<img src="/images/guide-arrow.png" style="position: fixed; right: 0; width: 100%;"></img>' +
    '</div>';

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
