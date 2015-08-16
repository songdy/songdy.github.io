'use strict';

  app.factory('prompting', function() {

    var show = function(title, placeholder) {
      title = title || '';
      placeholder = placeholder || '';
      var  PROMPTING_TPL =
        '<div class="backdrop visible active"></div>' +
        '<div class="backdrop-container visible active">' +
        '<div class="prompting">' +
        '<header>' +
        title +
        '</header>' +
        '<input type="text" placeholder="' + placeholder + '"></input>' +
        '<footer>' +
        '<a href="#" class="cancel">取消</a>' +
        '<a href="#" class="ok">确定</a>' +
        '</footer>' +
        '</div>' +
        '</div>';

        console.log(title);

      var promptingContent = document.createElement('div');
      promptingContent.id = 'prompting-box';
      promptingContent.innerHTML = PROMPTING_TPL;
      document.body.appendChild(promptingContent);
    };

    var hide = function() {
      var el = document.getElementById('prompting-box');
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
