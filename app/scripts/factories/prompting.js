'use strict';

  app.factory('prompting', function() {

    var show = function(title, placeholder, custom) {
      var opts = {
        title: '',
        placeholder: '',
        inputType: 'text',
        cancelBtn: {
          text: '取消',
          onClick: function () {
            // body...
          }
        },
        okBtn: {
          text: '确定',
          onClick: function (value) {
            console.log(value);
          }
        }
      };
      if (typeof(title) === 'object') {
        angular.extend(opts, title);
      } else if (typeof(placeholder) === 'object') {
        angular.extend(opts, placeholder);
        opts.title = title || '';
      } else {
        angular.extend(opts, custom);
        opts.title = title || '';
        opts.placeholder = placeholder || '';
      }
      var  PROMPTING_TPL = '<div class="backdrop visible active"></div>';

      var backdropElem = document.createElement('div');
      backdropElem.id = 'prompting-box';
      backdropElem.innerHTML = PROMPTING_TPL;

      var backdropContainerElem = document.createElement('div');
      backdropContainerElem.setAttribute('class', 'backdrop-container visible active');

      var promptingElem = document.createElement('div');
      promptingElem.setAttribute('class', 'prompting');

      var headerElem = document.createElement('header');
      headerElem.innerText = opts.title;

      var inputElem = document.createElement('input');
      inputElem.setAttribute('type', opts.inputType);
      inputElem.setAttribute('placeholder', opts.placeholder);

      var footerElem = document.createElement('footer');

      var cancelLinkElem = document.createElement('a');
      cancelLinkElem.setAttribute('class', 'cancel');
      cancelLinkElem.innerText = opts.cancelBtn.text;
      cancelLinkElem.onclick = function () {
        hide();
        opts.cancelBtn.onClick();
      }

      var okLinkElem = document.createElement('a');
      okLinkElem.setAttribute('class', 'ok');
      okLinkElem.innerText = opts.okBtn.text;
      okLinkElem.onclick = function () {
        hide();
        opts.okBtn.onClick(inputElem.value);
      }


      footerElem.appendChild(cancelLinkElem);
      footerElem.appendChild(okLinkElem);
      promptingElem.appendChild(headerElem);
      promptingElem.appendChild(inputElem);
      promptingElem.appendChild(footerElem);
      backdropContainerElem.appendChild(promptingElem);
      backdropElem.appendChild(backdropContainerElem);

      document.body.appendChild(backdropElem);
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
