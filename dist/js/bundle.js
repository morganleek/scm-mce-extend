/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/bundle.js":
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  tinymce.PluginManager.add('scm_mce_extend_tinymce', function (editor, url) {
    // Button
    editor.addButton('scm_mce_extend_button', {
      title: 'Make Button',
      cmd: 'scm_mce_extend_button',
      image: url + '/../images/scm-tinymce-button.svg'
    });
    editor.addCommand('scm_mce_extend_button', function () {
      var node = editor.selection.getNode();

      switch (node.tagName) {
        case 'P':
        case 'p':
          var anchors = node.getElementsByTagName('a');

          if (anchors.length > 0) {
            for (var i = 0; i < anchors.length; i++) {
              anchors[i].classList.toggle('scm-mce-button');
            }
          }

          break;

        case 'A':
        case 'a':
          node.classList.toggle('scm-mce-button');
          break;

        default:
          window.alert('Please select a link and then click this button.');
          break;
      }

      return;
    }); // Spacer 

    editor.addButton('scm_mce_extend_spacer', {
      title: 'Spacer',
      cmd: 'scm_mce_extend_spacer',
      image: url + '/../images/scm-tinymce-spacer.svg'
    });
    editor.addCommand('scm_mce_extend_spacer', function () {
      var node = editor.selection.getNode();
      var mobileHeight,
          desktopHeight = ''; // Get details if they exist already

      console.log(node.classList);

      if (node.classList.contains('scm-mce-spacer')) {
        // var parent = node.parentNode;
        mobileHeight = node.dataset.mobile !== undefined ? node.dataset.mobile : '40px';
        desktopHeight = node.dataset.desktop !== undefined ? node.dataset.desktop : '30px'; // node.remove();
      } // Open Dialogue


      editor.windowManager.open({
        title: 'Insert Link',
        body: [{
          name: 'desktopHeight',
          label: 'Desktop Height (px)',
          type: 'textbox',
          size: 40,
          value: desktopHeight
        }, {
          name: 'mobileHeight',
          label: 'Mobile Height (px)',
          type: 'textbox',
          size: 40,
          value: mobileHeight
        }],
        onSubmit: function onSubmit(api) {
          var mobileHeight = api.data !== undefined ? api.data.mobileHeight : '';
          var desktopHeight = api.data !== undefined ? api.data.desktopHeight : '';
          tinymce.activeEditor.execCommand('mceInsertContent', false, '<hr class="scm-mce-spacer" style="--spacer-desktop-height: ' + desktopHeight + '; --spacer-mobile-height: ' + mobileHeight + ';" data-desktop="' + desktopHeight + '" data-mobile="' + mobileHeight + '" />');
        }
      });
      return;
    }); // Link Wrapper

    editor.addButton('scm_mce_extend_link_wrapper', {
      title: 'Make Link Wrapper',
      cmd: 'scm_mce_extend_link_wrapper',
      image: url + '/../images/scm-tinymce-link-wrapper.svg'
    }); // var linkFrame;

    editor.addCommand('scm_mce_extend_link_wrapper', function () {
      var node = editor.selection.getNode();
      var title = '';
      var url = '#';

      switch (node.tagName) {
        case 'P':
        case 'p':
          var anchors = node.getElementsByTagName('a');

          if (anchors.length > 0) {
            url = anchors[0].getAttribute('href') !== null ? anchors[0].getAttribute('href') : '';
            title = anchors[0].innerHTML.length > 0 ? anchors[0].innerHTML : '';
          }

          break;

        case 'A':
        case 'a':
          // node.classList.toggle('scm-mce-button');
          url = node.getAttribute('href') !== null ? node.getAttribute('href') : '';
          title = node.innerHTML.length > 0 ? node.innerHTML : '';
          break;

        default:
          return;
          break;
      }

      if (title !== '' && url !== '#') {
        node.remove();
        tinymce.activeEditor.execCommand('mceInsertContent', false, '<p class="scm-mce-link-wrapper">' + '<span class="link"><a href="' + url + '">&nbsp;</a></span>' + '<span class="title">' + title + '</span>' + '<span class="content small">Short description&hellip;</span>' + '</p>');
      }

      return;
    }); // Download

    editor.addButton('scm_mce_extend_download', {
      title: 'Make Download Wrapper',
      cmd: 'scm_mce_extend_download',
      image: url + '/../images/scm-tinymce-download.svg'
    });
    var fileFrame;
    editor.addCommand('scm_mce_extend_download', function () {
      var node = editor.selection.getNode();
      var title,
          url = '';

      switch (node.tagName) {
        case 'P':
        case 'p':
          var anchors = node.getElementsByTagName('a');

          if (anchors.length > 0) {
            url = anchors[0].getAttribute('href') !== null ? anchors[0].getAttribute('href') : '';
            title = anchors[0].innerHTML.length > 0 ? anchors[0].innerHTML : '';
          }

          break;

        case 'A':
        case 'a':
          // node.classList.toggle('scm-mce-button');
          url = node.getAttribute('href') !== null ? node.getAttribute('href') : '';
          title = node.innerHTML.length > 0 ? node.innerHTML : '';
          break;

        default:
          return;
          break;
      }

      if (title !== '' && url !== '#') {
        node.remove();
        tinymce.activeEditor.execCommand('mceInsertContent', false, '<p class="scm-mce-download-wrapper">' + '<span class="link"><a href="' + url + '">&nbsp;</a></span>' + '<span class="title">' + title + '</span>' + '<span class="content small">Short description&hellip;</span>' + '</p>');
      }

      return; // if ( fileFrame ) {
      //   fileFrame.open();
      //   return;
      // }
      // fileFrame = wp.media.frames.fileFrame = wp.media({
      //   title: 'Download Wrapper',
      //   button: {
      //     text: 'Insert Download',
      //   },
      //   multiple: false  // Set to true to allow multiple files to be selected
      // });
      // fileFrame.on( 'select', function() {
      //   // We set multiple to false so only get one image from the uploader
      //   // attachment = fileFrame.state().get('selection').first().toJSON();
      //   var results = fileFrame.state().get('selection').first().toJSON();
      //   var title = results.title;
      //   var url = results.url;
      //   var caption = results.caption;
      //   var description = results.description;        
      //   console.log(url);
      //   var html = '<p class="scm-mce-download-wrapper">';
      //     html += (url.length > 0) ? '<span class="link"><a href="' + url + '">Link</a></span>' : '';
      //     html += (title.length > 0) ? '<span class="title">Download Title</span>' : '';
      //     html += (caption.length > 0) ? '<span class="content small">' + caption + '</span>' : '';
      //     html += (description.length > 0) ? '<span class="content small">' + description + '</span>' : '';
      //   html += '</p>';
      //   console.log(html);
      //   // Do something with attachment.id and/or attachment.url here
      //   tinymce.activeEditor.execCommand('mceInsertContent', false, html + '&nbsp;');
      // });
      // fileFrame.open();
      // var node = editor.selection.getNode();
      // var title, content, url = '';
      // // Get details if they exist already
      // if(node.parentNode.classList.contains('scm-mce-download-wrapper')) {
      //   var parent = node.parentNode;
      //   console.log(parent.getElementsByTagName('a'));
      //   title = (parent.getElementsByClassName('title').length > 0) ? parent.getElementsByClassName('title')[0].innerHTML : '';
      //   content = (parent.getElementsByClassName('content').length > 0) ? parent.getElementsByClassName('content')[0].innerHTML : '';
      //   url = (parent.getElementsByTagName('a').length > 0) ? parent.getElementsByTagName('a')[0].getAttribute('href') : '';
      // }
      // // Open Dialogue
      // editor.windowManager.open({
      //   title: 'Insert Download',
      //   body: [
      //     {
      //       name: 'url',
      //       label: 'URL',
      //       type: 'textbox',
      //       size: 40,
      //       value: url
      //     },
      //     {
      //       name: 'title',
      //       label: 'Title',
      //       type: 'textbox',
      //       size: 40,
      //       value: title
      //     },
      //     {
      //       name: 'content',
      //       label: 'Content',
      //       type: 'textbox',
      //       size: 40,
      //       value: content
      //     }
      //   ],
      //   onSubmit: function (api) {
      //     var url = (api.data !== undefined) ? api.data.url : '';
      //     var title = (api.data !== undefined) ? api.data.title : '';
      //     var content = (api.data !== undefined) ? api.data.content : '';
      //     tinymce.activeEditor.execCommand('mceInsertContent', false, '<div class="scm-mce-download-wrapper"><p class="title">' + title + '</p><p class="content small">' + content + '</p><a href="' + url + '">&nbsp;</a></div>&nbsp;');
      //   }
      // });

      return;
    });
  });
})();

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./src/js/bundle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/wor/wp-content/plugins/scm-mce-extend/src/js/bundle.js */"./src/js/bundle.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2J1bmRsZS5qcyJdLCJuYW1lcyI6WyJ0aW55bWNlIiwiUGx1Z2luTWFuYWdlciIsImFkZCIsImVkaXRvciIsInVybCIsImFkZEJ1dHRvbiIsInRpdGxlIiwiY21kIiwiaW1hZ2UiLCJhZGRDb21tYW5kIiwibm9kZSIsInNlbGVjdGlvbiIsImdldE5vZGUiLCJ0YWdOYW1lIiwiYW5jaG9ycyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibGVuZ3RoIiwiaSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIndpbmRvdyIsImFsZXJ0IiwibW9iaWxlSGVpZ2h0IiwiZGVza3RvcEhlaWdodCIsImNvbnNvbGUiLCJsb2ciLCJjb250YWlucyIsImRhdGFzZXQiLCJtb2JpbGUiLCJ1bmRlZmluZWQiLCJkZXNrdG9wIiwid2luZG93TWFuYWdlciIsIm9wZW4iLCJib2R5IiwibmFtZSIsImxhYmVsIiwidHlwZSIsInNpemUiLCJ2YWx1ZSIsIm9uU3VibWl0IiwiYXBpIiwiZGF0YSIsImFjdGl2ZUVkaXRvciIsImV4ZWNDb21tYW5kIiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlIiwiZmlsZUZyYW1lIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsQ0FBQyxZQUFXO0FBQ1ZBLFNBQU8sQ0FBQ0MsYUFBUixDQUFzQkMsR0FBdEIsQ0FBMkIsd0JBQTNCLEVBQXFELFVBQVVDLE1BQVYsRUFBa0JDLEdBQWxCLEVBQXdCO0FBQzNFO0FBQ0FELFVBQU0sQ0FBQ0UsU0FBUCxDQUFpQix1QkFBakIsRUFBMEM7QUFDeENDLFdBQUssRUFBRSxhQURpQztBQUV4Q0MsU0FBRyxFQUFFLHVCQUZtQztBQUd4Q0MsV0FBSyxFQUFFSixHQUFHLEdBQUc7QUFIMkIsS0FBMUM7QUFNQUQsVUFBTSxDQUFDTSxVQUFQLENBQWtCLHVCQUFsQixFQUEyQyxZQUFXO0FBQ3BELFVBQUlDLElBQUksR0FBR1AsTUFBTSxDQUFDUSxTQUFQLENBQWlCQyxPQUFqQixFQUFYOztBQUNBLGNBQU9GLElBQUksQ0FBQ0csT0FBWjtBQUNFLGFBQUssR0FBTDtBQUNBLGFBQUssR0FBTDtBQUNFLGNBQUlDLE9BQU8sR0FBR0osSUFBSSxDQUFDSyxvQkFBTCxDQUEwQixHQUExQixDQUFkOztBQUNBLGNBQUdELE9BQU8sQ0FBQ0UsTUFBUixHQUFpQixDQUFwQixFQUF1QjtBQUNyQixpQkFBSSxJQUFJQyxDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUdILE9BQU8sQ0FBQ0UsTUFBM0IsRUFBbUNDLENBQUMsRUFBcEMsRUFBd0M7QUFDdENILHFCQUFPLENBQUNHLENBQUQsQ0FBUCxDQUFXQyxTQUFYLENBQXFCQyxNQUFyQixDQUE0QixnQkFBNUI7QUFDRDtBQUNGOztBQUNEOztBQUNGLGFBQUssR0FBTDtBQUNBLGFBQUssR0FBTDtBQUNFVCxjQUFJLENBQUNRLFNBQUwsQ0FBZUMsTUFBZixDQUFzQixnQkFBdEI7QUFDQTs7QUFDRjtBQUNFQyxnQkFBTSxDQUFDQyxLQUFQLENBQWMsa0RBQWQ7QUFDQTtBQWhCSjs7QUFrQkE7QUFDRCxLQXJCRCxFQVIyRSxDQStCM0U7O0FBQ0FsQixVQUFNLENBQUNFLFNBQVAsQ0FBaUIsdUJBQWpCLEVBQTBDO0FBQ3hDQyxXQUFLLEVBQUUsUUFEaUM7QUFFeENDLFNBQUcsRUFBRSx1QkFGbUM7QUFHeENDLFdBQUssRUFBRUosR0FBRyxHQUFHO0FBSDJCLEtBQTFDO0FBTUFELFVBQU0sQ0FBQ00sVUFBUCxDQUFrQix1QkFBbEIsRUFBMkMsWUFBVztBQUNwRCxVQUFJQyxJQUFJLEdBQUdQLE1BQU0sQ0FBQ1EsU0FBUCxDQUFpQkMsT0FBakIsRUFBWDtBQUNBLFVBQUlVLFlBQUo7QUFBQSxVQUFrQkMsYUFBYSxHQUFHLEVBQWxDLENBRm9ELENBSXBEOztBQUNBQyxhQUFPLENBQUNDLEdBQVIsQ0FBWWYsSUFBSSxDQUFDUSxTQUFqQjs7QUFDQSxVQUFHUixJQUFJLENBQUNRLFNBQUwsQ0FBZVEsUUFBZixDQUF3QixnQkFBeEIsQ0FBSCxFQUE4QztBQUM1QztBQUVBSixvQkFBWSxHQUFJWixJQUFJLENBQUNpQixPQUFMLENBQWFDLE1BQWIsS0FBd0JDLFNBQXpCLEdBQXNDbkIsSUFBSSxDQUFDaUIsT0FBTCxDQUFhQyxNQUFuRCxHQUE0RCxNQUEzRTtBQUNBTCxxQkFBYSxHQUFJYixJQUFJLENBQUNpQixPQUFMLENBQWFHLE9BQWIsS0FBeUJELFNBQTFCLEdBQXVDbkIsSUFBSSxDQUFDaUIsT0FBTCxDQUFhRyxPQUFwRCxHQUE4RCxNQUE5RSxDQUo0QyxDQU01QztBQUNELE9BYm1ELENBZXBEOzs7QUFDQTNCLFlBQU0sQ0FBQzRCLGFBQVAsQ0FBcUJDLElBQXJCLENBQTBCO0FBQ3hCMUIsYUFBSyxFQUFFLGFBRGlCO0FBRXhCMkIsWUFBSSxFQUFFLENBQ0o7QUFDRUMsY0FBSSxFQUFFLGVBRFI7QUFFRUMsZUFBSyxFQUFFLHFCQUZUO0FBR0VDLGNBQUksRUFBRSxTQUhSO0FBSUVDLGNBQUksRUFBRSxFQUpSO0FBS0VDLGVBQUssRUFBRWY7QUFMVCxTQURJLEVBUUo7QUFDRVcsY0FBSSxFQUFFLGNBRFI7QUFFRUMsZUFBSyxFQUFFLG9CQUZUO0FBR0VDLGNBQUksRUFBRSxTQUhSO0FBSUVDLGNBQUksRUFBRSxFQUpSO0FBS0VDLGVBQUssRUFBRWhCO0FBTFQsU0FSSSxDQUZrQjtBQWtCeEJpQixnQkFBUSxFQUFFLGtCQUFVQyxHQUFWLEVBQWU7QUFDdkIsY0FBSWxCLFlBQVksR0FBSWtCLEdBQUcsQ0FBQ0MsSUFBSixLQUFhWixTQUFkLEdBQTJCVyxHQUFHLENBQUNDLElBQUosQ0FBU25CLFlBQXBDLEdBQW1ELEVBQXRFO0FBQ0EsY0FBSUMsYUFBYSxHQUFJaUIsR0FBRyxDQUFDQyxJQUFKLEtBQWFaLFNBQWQsR0FBMkJXLEdBQUcsQ0FBQ0MsSUFBSixDQUFTbEIsYUFBcEMsR0FBb0QsRUFBeEU7QUFDQXZCLGlCQUFPLENBQUMwQyxZQUFSLENBQXFCQyxXQUFyQixDQUFpQyxrQkFBakMsRUFBcUQsS0FBckQsRUFBNEQsZ0VBQWdFcEIsYUFBaEUsR0FBZ0YsNEJBQWhGLEdBQStHRCxZQUEvRyxHQUE4SCxtQkFBOUgsR0FBb0pDLGFBQXBKLEdBQW9LLGlCQUFwSyxHQUF3TEQsWUFBeEwsR0FBdU0sTUFBblE7QUFDRDtBQXRCdUIsT0FBMUI7QUF5QkE7QUFDRCxLQTFDRCxFQXRDMkUsQ0FrRjNFOztBQUNBbkIsVUFBTSxDQUFDRSxTQUFQLENBQWlCLDZCQUFqQixFQUFnRDtBQUM5Q0MsV0FBSyxFQUFFLG1CQUR1QztBQUU5Q0MsU0FBRyxFQUFFLDZCQUZ5QztBQUc5Q0MsV0FBSyxFQUFFSixHQUFHLEdBQUc7QUFIaUMsS0FBaEQsRUFuRjJFLENBeUYzRTs7QUFFQUQsVUFBTSxDQUFDTSxVQUFQLENBQWtCLDZCQUFsQixFQUFpRCxZQUFXO0FBQzFELFVBQUlDLElBQUksR0FBR1AsTUFBTSxDQUFDUSxTQUFQLENBQWlCQyxPQUFqQixFQUFYO0FBQ0EsVUFBSU4sS0FBSyxHQUFHLEVBQVo7QUFBZ0IsVUFBSUYsR0FBRyxHQUFHLEdBQVY7O0FBQ2hCLGNBQU9NLElBQUksQ0FBQ0csT0FBWjtBQUNFLGFBQUssR0FBTDtBQUNBLGFBQUssR0FBTDtBQUNFLGNBQUlDLE9BQU8sR0FBR0osSUFBSSxDQUFDSyxvQkFBTCxDQUEwQixHQUExQixDQUFkOztBQUNBLGNBQUdELE9BQU8sQ0FBQ0UsTUFBUixHQUFpQixDQUFwQixFQUF1QjtBQUNyQlosZUFBRyxHQUFJVSxPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVc4QixZQUFYLENBQXdCLE1BQXhCLE1BQW9DLElBQXJDLEdBQTZDOUIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXOEIsWUFBWCxDQUF3QixNQUF4QixDQUE3QyxHQUErRSxFQUFyRjtBQUNBdEMsaUJBQUssR0FBSVEsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXK0IsU0FBWCxDQUFxQjdCLE1BQXJCLEdBQThCLENBQS9CLEdBQW9DRixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVcrQixTQUEvQyxHQUEyRCxFQUFuRTtBQUNEOztBQUNEOztBQUNGLGFBQUssR0FBTDtBQUNBLGFBQUssR0FBTDtBQUNFO0FBQ0F6QyxhQUFHLEdBQUlNLElBQUksQ0FBQ2tDLFlBQUwsQ0FBa0IsTUFBbEIsTUFBOEIsSUFBL0IsR0FBdUNsQyxJQUFJLENBQUNrQyxZQUFMLENBQWtCLE1BQWxCLENBQXZDLEdBQW1FLEVBQXpFO0FBQ0F0QyxlQUFLLEdBQUlJLElBQUksQ0FBQ21DLFNBQUwsQ0FBZTdCLE1BQWYsR0FBd0IsQ0FBekIsR0FBOEJOLElBQUksQ0FBQ21DLFNBQW5DLEdBQStDLEVBQXZEO0FBQ0E7O0FBQ0Y7QUFDRTtBQUNBO0FBakJKOztBQW9CQSxVQUFHdkMsS0FBSyxLQUFLLEVBQVYsSUFBZ0JGLEdBQUcsS0FBSyxHQUEzQixFQUFnQztBQUM5Qk0sWUFBSSxDQUFDb0MsTUFBTDtBQUNBOUMsZUFBTyxDQUFDMEMsWUFBUixDQUFxQkMsV0FBckIsQ0FBaUMsa0JBQWpDLEVBQXFELEtBQXJELEVBQTRELHFDQUMxRCw4QkFEMEQsR0FDekJ2QyxHQUR5QixHQUNuQixxQkFEbUIsR0FFMUQsc0JBRjBELEdBRWpDRSxLQUZpQyxHQUV6QixTQUZ5QixHQUcxRCw4REFIMEQsR0FJNUQsTUFKQTtBQUtEOztBQUVEO0FBQ0QsS0FqQ0QsRUEzRjJFLENBOEgzRTs7QUFDQUgsVUFBTSxDQUFDRSxTQUFQLENBQWlCLHlCQUFqQixFQUE0QztBQUMxQ0MsV0FBSyxFQUFFLHVCQURtQztBQUUxQ0MsU0FBRyxFQUFFLHlCQUZxQztBQUcxQ0MsV0FBSyxFQUFFSixHQUFHLEdBQUc7QUFINkIsS0FBNUM7QUFNQSxRQUFJMkMsU0FBSjtBQUVBNUMsVUFBTSxDQUFDTSxVQUFQLENBQWtCLHlCQUFsQixFQUE2QyxZQUFXO0FBQ3RELFVBQUlDLElBQUksR0FBR1AsTUFBTSxDQUFDUSxTQUFQLENBQWlCQyxPQUFqQixFQUFYO0FBQ0EsVUFBSU4sS0FBSjtBQUFBLFVBQVdGLEdBQUcsR0FBRyxFQUFqQjs7QUFDQSxjQUFPTSxJQUFJLENBQUNHLE9BQVo7QUFDRSxhQUFLLEdBQUw7QUFDQSxhQUFLLEdBQUw7QUFDRSxjQUFJQyxPQUFPLEdBQUdKLElBQUksQ0FBQ0ssb0JBQUwsQ0FBMEIsR0FBMUIsQ0FBZDs7QUFDQSxjQUFHRCxPQUFPLENBQUNFLE1BQVIsR0FBaUIsQ0FBcEIsRUFBdUI7QUFDckJaLGVBQUcsR0FBSVUsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXOEIsWUFBWCxDQUF3QixNQUF4QixNQUFvQyxJQUFyQyxHQUE2QzlCLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBVzhCLFlBQVgsQ0FBd0IsTUFBeEIsQ0FBN0MsR0FBK0UsRUFBckY7QUFDQXRDLGlCQUFLLEdBQUlRLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBVytCLFNBQVgsQ0FBcUI3QixNQUFyQixHQUE4QixDQUEvQixHQUFvQ0YsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXK0IsU0FBL0MsR0FBMkQsRUFBbkU7QUFDRDs7QUFDRDs7QUFDRixhQUFLLEdBQUw7QUFDQSxhQUFLLEdBQUw7QUFDRTtBQUNBekMsYUFBRyxHQUFJTSxJQUFJLENBQUNrQyxZQUFMLENBQWtCLE1BQWxCLE1BQThCLElBQS9CLEdBQXVDbEMsSUFBSSxDQUFDa0MsWUFBTCxDQUFrQixNQUFsQixDQUF2QyxHQUFtRSxFQUF6RTtBQUNBdEMsZUFBSyxHQUFJSSxJQUFJLENBQUNtQyxTQUFMLENBQWU3QixNQUFmLEdBQXdCLENBQXpCLEdBQThCTixJQUFJLENBQUNtQyxTQUFuQyxHQUErQyxFQUF2RDtBQUNBOztBQUNGO0FBQ0U7QUFDQTtBQWpCSjs7QUFvQkEsVUFBR3ZDLEtBQUssS0FBSyxFQUFWLElBQWdCRixHQUFHLEtBQUssR0FBM0IsRUFBZ0M7QUFDOUJNLFlBQUksQ0FBQ29DLE1BQUw7QUFDQTlDLGVBQU8sQ0FBQzBDLFlBQVIsQ0FBcUJDLFdBQXJCLENBQWlDLGtCQUFqQyxFQUFxRCxLQUFyRCxFQUE0RCx5Q0FDMUQsOEJBRDBELEdBQ3pCdkMsR0FEeUIsR0FDbkIscUJBRG1CLEdBRTFELHNCQUYwRCxHQUVqQ0UsS0FGaUMsR0FFekIsU0FGeUIsR0FHMUQsOERBSDBELEdBSTVELE1BSkE7QUFLRDs7QUFFRCxhQWhDc0QsQ0FpQ3REO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDRCxLQXpIRDtBQTBIRCxHQWpRRDtBQWtRRCxDQW5RRCxJIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgdGlueW1jZS5QbHVnaW5NYW5hZ2VyLmFkZCggJ3NjbV9tY2VfZXh0ZW5kX3RpbnltY2UnLCBmdW5jdGlvbiggZWRpdG9yLCB1cmwgKSB7XG4gICAgLy8gQnV0dG9uXG4gICAgZWRpdG9yLmFkZEJ1dHRvbignc2NtX21jZV9leHRlbmRfYnV0dG9uJywge1xuICAgICAgdGl0bGU6ICdNYWtlIEJ1dHRvbicsXG4gICAgICBjbWQ6ICdzY21fbWNlX2V4dGVuZF9idXR0b24nLFxuICAgICAgaW1hZ2U6IHVybCArICcvLi4vaW1hZ2VzL3NjbS10aW55bWNlLWJ1dHRvbi5zdmcnXG4gICAgfSk7XG4gIFxuICAgIGVkaXRvci5hZGRDb21tYW5kKCdzY21fbWNlX2V4dGVuZF9idXR0b24nLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub2RlID0gZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCk7XG4gICAgICBzd2l0Y2gobm9kZS50YWdOYW1lKSB7XG4gICAgICAgIGNhc2UgJ1AnOlxuICAgICAgICBjYXNlICdwJzpcbiAgICAgICAgICB2YXIgYW5jaG9ycyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcbiAgICAgICAgICBpZihhbmNob3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhbmNob3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGFuY2hvcnNbaV0uY2xhc3NMaXN0LnRvZ2dsZSgnc2NtLW1jZS1idXR0b24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICBub2RlLmNsYXNzTGlzdC50b2dnbGUoJ3NjbS1tY2UtYnV0dG9uJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgd2luZG93LmFsZXJ0KCAnUGxlYXNlIHNlbGVjdCBhIGxpbmsgYW5kIHRoZW4gY2xpY2sgdGhpcyBidXR0b24uJyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH0pO1xuXG4gICAgLy8gU3BhY2VyIFxuICAgIGVkaXRvci5hZGRCdXR0b24oJ3NjbV9tY2VfZXh0ZW5kX3NwYWNlcicsIHtcbiAgICAgIHRpdGxlOiAnU3BhY2VyJyxcbiAgICAgIGNtZDogJ3NjbV9tY2VfZXh0ZW5kX3NwYWNlcicsXG4gICAgICBpbWFnZTogdXJsICsgJy8uLi9pbWFnZXMvc2NtLXRpbnltY2Utc3BhY2VyLnN2ZydcbiAgICB9KTtcbiAgICBcbiAgICBlZGl0b3IuYWRkQ29tbWFuZCgnc2NtX21jZV9leHRlbmRfc3BhY2VyJywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbm9kZSA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpO1xuICAgICAgdmFyIG1vYmlsZUhlaWdodCwgZGVza3RvcEhlaWdodCA9ICcnO1xuICAgICAgXG4gICAgICAvLyBHZXQgZGV0YWlscyBpZiB0aGV5IGV4aXN0IGFscmVhZHlcbiAgICAgIGNvbnNvbGUubG9nKG5vZGUuY2xhc3NMaXN0KTtcbiAgICAgIGlmKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzY20tbWNlLXNwYWNlcicpKSB7XG4gICAgICAgIC8vIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIFxuICAgICAgICBtb2JpbGVIZWlnaHQgPSAobm9kZS5kYXRhc2V0Lm1vYmlsZSAhPT0gdW5kZWZpbmVkKSA/IG5vZGUuZGF0YXNldC5tb2JpbGUgOiAnNDBweCc7XG4gICAgICAgIGRlc2t0b3BIZWlnaHQgPSAobm9kZS5kYXRhc2V0LmRlc2t0b3AgIT09IHVuZGVmaW5lZCkgPyBub2RlLmRhdGFzZXQuZGVza3RvcCA6ICczMHB4JztcblxuICAgICAgICAvLyBub2RlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBPcGVuIERpYWxvZ3VlXG4gICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5vcGVuKHtcbiAgICAgICAgdGl0bGU6ICdJbnNlcnQgTGluaycsXG4gICAgICAgIGJvZHk6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZGVza3RvcEhlaWdodCcsXG4gICAgICAgICAgICBsYWJlbDogJ0Rlc2t0b3AgSGVpZ2h0IChweCknLFxuICAgICAgICAgICAgdHlwZTogJ3RleHRib3gnLFxuICAgICAgICAgICAgc2l6ZTogNDAsXG4gICAgICAgICAgICB2YWx1ZTogZGVza3RvcEhlaWdodFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ21vYmlsZUhlaWdodCcsXG4gICAgICAgICAgICBsYWJlbDogJ01vYmlsZSBIZWlnaHQgKHB4KScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dGJveCcsXG4gICAgICAgICAgICBzaXplOiA0MCxcbiAgICAgICAgICAgIHZhbHVlOiBtb2JpbGVIZWlnaHRcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG9uU3VibWl0OiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgICAgdmFyIG1vYmlsZUhlaWdodCA9IChhcGkuZGF0YSAhPT0gdW5kZWZpbmVkKSA/IGFwaS5kYXRhLm1vYmlsZUhlaWdodCA6ICcnO1xuICAgICAgICAgIHZhciBkZXNrdG9wSGVpZ2h0ID0gKGFwaS5kYXRhICE9PSB1bmRlZmluZWQpID8gYXBpLmRhdGEuZGVza3RvcEhlaWdodCA6ICcnO1xuICAgICAgICAgIHRpbnltY2UuYWN0aXZlRWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VJbnNlcnRDb250ZW50JywgZmFsc2UsICc8aHIgY2xhc3M9XCJzY20tbWNlLXNwYWNlclwiIHN0eWxlPVwiLS1zcGFjZXItZGVza3RvcC1oZWlnaHQ6ICcgKyBkZXNrdG9wSGVpZ2h0ICsgJzsgLS1zcGFjZXItbW9iaWxlLWhlaWdodDogJyArIG1vYmlsZUhlaWdodCArICc7XCIgZGF0YS1kZXNrdG9wPVwiJyArIGRlc2t0b3BIZWlnaHQgKyAnXCIgZGF0YS1tb2JpbGU9XCInICsgbW9iaWxlSGVpZ2h0ICsgJ1wiIC8+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICByZXR1cm47XG4gICAgfSk7XG5cbiAgICAvLyBMaW5rIFdyYXBwZXJcbiAgICBlZGl0b3IuYWRkQnV0dG9uKCdzY21fbWNlX2V4dGVuZF9saW5rX3dyYXBwZXInLCB7XG4gICAgICB0aXRsZTogJ01ha2UgTGluayBXcmFwcGVyJyxcbiAgICAgIGNtZDogJ3NjbV9tY2VfZXh0ZW5kX2xpbmtfd3JhcHBlcicsXG4gICAgICBpbWFnZTogdXJsICsgJy8uLi9pbWFnZXMvc2NtLXRpbnltY2UtbGluay13cmFwcGVyLnN2ZydcbiAgICB9KTtcblxuICAgIC8vIHZhciBsaW5rRnJhbWU7XG4gICAgXG4gICAgZWRpdG9yLmFkZENvbW1hbmQoJ3NjbV9tY2VfZXh0ZW5kX2xpbmtfd3JhcHBlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vZGUgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldE5vZGUoKTtcbiAgICAgIHZhciB0aXRsZSA9ICcnOyB2YXIgdXJsID0gJyMnO1xuICAgICAgc3dpdGNoKG5vZGUudGFnTmFtZSkge1xuICAgICAgICBjYXNlICdQJzpcbiAgICAgICAgY2FzZSAncCc6XG4gICAgICAgICAgdmFyIGFuY2hvcnMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG4gICAgICAgICAgaWYoYW5jaG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB1cmwgPSAoYW5jaG9yc1swXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSAhPT0gbnVsbCkgPyBhbmNob3JzWzBdLmdldEF0dHJpYnV0ZSgnaHJlZicpIDogJyc7XG4gICAgICAgICAgICB0aXRsZSA9IChhbmNob3JzWzBdLmlubmVySFRNTC5sZW5ndGggPiAwKSA/IGFuY2hvcnNbMF0uaW5uZXJIVE1MIDogJyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgY2FzZSAnYSc6XG4gICAgICAgICAgLy8gbm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdzY20tbWNlLWJ1dHRvbicpO1xuICAgICAgICAgIHVybCA9IChub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpICE9PSBudWxsKSA/IG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJykgOiAnJztcbiAgICAgICAgICB0aXRsZSA9IChub2RlLmlubmVySFRNTC5sZW5ndGggPiAwKSA/IG5vZGUuaW5uZXJIVE1MIDogJyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZih0aXRsZSAhPT0gJycgJiYgdXJsICE9PSAnIycpIHtcbiAgICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICAgICAgdGlueW1jZS5hY3RpdmVFZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUluc2VydENvbnRlbnQnLCBmYWxzZSwgJzxwIGNsYXNzPVwic2NtLW1jZS1saW5rLXdyYXBwZXJcIj4nICsgXG4gICAgICAgICAgJzxzcGFuIGNsYXNzPVwibGlua1wiPjxhIGhyZWY9XCInICsgdXJsICsgJ1wiPiZuYnNwOzwvYT48L3NwYW4+JyArXG4gICAgICAgICAgJzxzcGFuIGNsYXNzPVwidGl0bGVcIj4nICsgdGl0bGUgKyAnPC9zcGFuPicgKyBcbiAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJjb250ZW50IHNtYWxsXCI+U2hvcnQgZGVzY3JpcHRpb24maGVsbGlwOzwvc3Bhbj4nICsgXG4gICAgICAgICc8L3A+Jyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybjtcbiAgICB9KTtcblxuICAgIC8vIERvd25sb2FkXG4gICAgZWRpdG9yLmFkZEJ1dHRvbignc2NtX21jZV9leHRlbmRfZG93bmxvYWQnLCB7XG4gICAgICB0aXRsZTogJ01ha2UgRG93bmxvYWQgV3JhcHBlcicsXG4gICAgICBjbWQ6ICdzY21fbWNlX2V4dGVuZF9kb3dubG9hZCcsXG4gICAgICBpbWFnZTogdXJsICsgJy8uLi9pbWFnZXMvc2NtLXRpbnltY2UtZG93bmxvYWQuc3ZnJ1xuICAgIH0pO1xuXG4gICAgdmFyIGZpbGVGcmFtZTtcbiAgICBcbiAgICBlZGl0b3IuYWRkQ29tbWFuZCgnc2NtX21jZV9leHRlbmRfZG93bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub2RlID0gZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCk7XG4gICAgICB2YXIgdGl0bGUsIHVybCA9ICcnO1xuICAgICAgc3dpdGNoKG5vZGUudGFnTmFtZSkge1xuICAgICAgICBjYXNlICdQJzpcbiAgICAgICAgY2FzZSAncCc6XG4gICAgICAgICAgdmFyIGFuY2hvcnMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG4gICAgICAgICAgaWYoYW5jaG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB1cmwgPSAoYW5jaG9yc1swXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSAhPT0gbnVsbCkgPyBhbmNob3JzWzBdLmdldEF0dHJpYnV0ZSgnaHJlZicpIDogJyc7XG4gICAgICAgICAgICB0aXRsZSA9IChhbmNob3JzWzBdLmlubmVySFRNTC5sZW5ndGggPiAwKSA/IGFuY2hvcnNbMF0uaW5uZXJIVE1MIDogJyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgY2FzZSAnYSc6XG4gICAgICAgICAgLy8gbm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdzY20tbWNlLWJ1dHRvbicpO1xuICAgICAgICAgIHVybCA9IChub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpICE9PSBudWxsKSA/IG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJykgOiAnJztcbiAgICAgICAgICB0aXRsZSA9IChub2RlLmlubmVySFRNTC5sZW5ndGggPiAwKSA/IG5vZGUuaW5uZXJIVE1MIDogJyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZih0aXRsZSAhPT0gJycgJiYgdXJsICE9PSAnIycpIHtcbiAgICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICAgICAgdGlueW1jZS5hY3RpdmVFZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUluc2VydENvbnRlbnQnLCBmYWxzZSwgJzxwIGNsYXNzPVwic2NtLW1jZS1kb3dubG9hZC13cmFwcGVyXCI+JyArIFxuICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxpbmtcIj48YSBocmVmPVwiJyArIHVybCArICdcIj4mbmJzcDs8L2E+PC9zcGFuPicgK1xuICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRpdGxlXCI+JyArIHRpdGxlICsgJzwvc3Bhbj4nICsgXG4gICAgICAgICAgJzxzcGFuIGNsYXNzPVwiY29udGVudCBzbWFsbFwiPlNob3J0IGRlc2NyaXB0aW9uJmhlbGxpcDs8L3NwYW4+JyArIFxuICAgICAgICAnPC9wPicpO1xuICAgICAgfVxuICAgICAgXG4gICAgICByZXR1cm47XG4gICAgICAvLyBpZiAoIGZpbGVGcmFtZSApIHtcbiAgICAgIC8vICAgZmlsZUZyYW1lLm9wZW4oKTtcbiAgICAgIC8vICAgcmV0dXJuO1xuICAgICAgLy8gfVxuXG4gICAgICAvLyBmaWxlRnJhbWUgPSB3cC5tZWRpYS5mcmFtZXMuZmlsZUZyYW1lID0gd3AubWVkaWEoe1xuICAgICAgLy8gICB0aXRsZTogJ0Rvd25sb2FkIFdyYXBwZXInLFxuICAgICAgLy8gICBidXR0b246IHtcbiAgICAgIC8vICAgICB0ZXh0OiAnSW5zZXJ0IERvd25sb2FkJyxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgbXVsdGlwbGU6IGZhbHNlICAvLyBTZXQgdG8gdHJ1ZSB0byBhbGxvdyBtdWx0aXBsZSBmaWxlcyB0byBiZSBzZWxlY3RlZFxuICAgICAgLy8gfSk7XG5cbiAgICAgIC8vIGZpbGVGcmFtZS5vbiggJ3NlbGVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgLy8gICAvLyBXZSBzZXQgbXVsdGlwbGUgdG8gZmFsc2Ugc28gb25seSBnZXQgb25lIGltYWdlIGZyb20gdGhlIHVwbG9hZGVyXG4gICAgICAvLyAgIC8vIGF0dGFjaG1lbnQgPSBmaWxlRnJhbWUuc3RhdGUoKS5nZXQoJ3NlbGVjdGlvbicpLmZpcnN0KCkudG9KU09OKCk7XG4gICAgICAvLyAgIHZhciByZXN1bHRzID0gZmlsZUZyYW1lLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS5maXJzdCgpLnRvSlNPTigpO1xuICAgICAgICBcbiAgICAgIC8vICAgdmFyIHRpdGxlID0gcmVzdWx0cy50aXRsZTtcbiAgICAgIC8vICAgdmFyIHVybCA9IHJlc3VsdHMudXJsO1xuICAgICAgLy8gICB2YXIgY2FwdGlvbiA9IHJlc3VsdHMuY2FwdGlvbjtcbiAgICAgIC8vICAgdmFyIGRlc2NyaXB0aW9uID0gcmVzdWx0cy5kZXNjcmlwdGlvbjsgICAgICAgIFxuXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHVybCk7XG5cbiAgICAgIC8vICAgdmFyIGh0bWwgPSAnPHAgY2xhc3M9XCJzY20tbWNlLWRvd25sb2FkLXdyYXBwZXJcIj4nO1xuICAgICAgLy8gICAgIGh0bWwgKz0gKHVybC5sZW5ndGggPiAwKSA/ICc8c3BhbiBjbGFzcz1cImxpbmtcIj48YSBocmVmPVwiJyArIHVybCArICdcIj5MaW5rPC9hPjwvc3Bhbj4nIDogJyc7XG4gICAgICAvLyAgICAgaHRtbCArPSAodGl0bGUubGVuZ3RoID4gMCkgPyAnPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPkRvd25sb2FkIFRpdGxlPC9zcGFuPicgOiAnJztcbiAgICAgIC8vICAgICBodG1sICs9IChjYXB0aW9uLmxlbmd0aCA+IDApID8gJzxzcGFuIGNsYXNzPVwiY29udGVudCBzbWFsbFwiPicgKyBjYXB0aW9uICsgJzwvc3Bhbj4nIDogJyc7XG4gICAgICAvLyAgICAgaHRtbCArPSAoZGVzY3JpcHRpb24ubGVuZ3RoID4gMCkgPyAnPHNwYW4gY2xhc3M9XCJjb250ZW50IHNtYWxsXCI+JyArIGRlc2NyaXB0aW9uICsgJzwvc3Bhbj4nIDogJyc7XG4gICAgICAvLyAgIGh0bWwgKz0gJzwvcD4nO1xuXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGh0bWwpO1xuXG4gICAgICAvLyAgIC8vIERvIHNvbWV0aGluZyB3aXRoIGF0dGFjaG1lbnQuaWQgYW5kL29yIGF0dGFjaG1lbnQudXJsIGhlcmVcbiAgICAgIC8vICAgdGlueW1jZS5hY3RpdmVFZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUluc2VydENvbnRlbnQnLCBmYWxzZSwgaHRtbCArICcmbmJzcDsnKTtcbiAgICAgIC8vIH0pO1xuXG4gICAgICAvLyBmaWxlRnJhbWUub3BlbigpO1xuICAgICAgXG4gICAgICBcbiAgICAgIC8vIHZhciBub2RlID0gZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCk7XG4gICAgICAvLyB2YXIgdGl0bGUsIGNvbnRlbnQsIHVybCA9ICcnO1xuICAgICAgXG4gICAgICAvLyAvLyBHZXQgZGV0YWlscyBpZiB0aGV5IGV4aXN0IGFscmVhZHlcbiAgICAgIC8vIGlmKG5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NjbS1tY2UtZG93bmxvYWQtd3JhcHBlcicpKSB7XG4gICAgICAvLyAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpKTtcbiAgICAgIC8vICAgdGl0bGUgPSAocGFyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RpdGxlJykubGVuZ3RoID4gMCkgPyBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGl0bGUnKVswXS5pbm5lckhUTUwgOiAnJztcbiAgICAgIC8vICAgY29udGVudCA9IChwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpLmxlbmd0aCA+IDApID8gcGFyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQnKVswXS5pbm5lckhUTUwgOiAnJztcbiAgICAgIC8vICAgdXJsID0gKHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpLmxlbmd0aCA+IDApID8gcGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF0uZ2V0QXR0cmlidXRlKCdocmVmJykgOiAnJztcbiAgICAgIC8vIH1cbiAgICAgIFxuICAgICAgLy8gLy8gT3BlbiBEaWFsb2d1ZVxuICAgICAgLy8gZWRpdG9yLndpbmRvd01hbmFnZXIub3Blbih7XG4gICAgICAvLyAgIHRpdGxlOiAnSW5zZXJ0IERvd25sb2FkJyxcbiAgICAgIC8vICAgYm9keTogW1xuICAgICAgLy8gICAgIHtcbiAgICAgIC8vICAgICAgIG5hbWU6ICd1cmwnLFxuICAgICAgLy8gICAgICAgbGFiZWw6ICdVUkwnLFxuICAgICAgLy8gICAgICAgdHlwZTogJ3RleHRib3gnLFxuICAgICAgLy8gICAgICAgc2l6ZTogNDAsXG4gICAgICAvLyAgICAgICB2YWx1ZTogdXJsXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICB7XG4gICAgICAvLyAgICAgICBuYW1lOiAndGl0bGUnLFxuICAgICAgLy8gICAgICAgbGFiZWw6ICdUaXRsZScsXG4gICAgICAvLyAgICAgICB0eXBlOiAndGV4dGJveCcsXG4gICAgICAvLyAgICAgICBzaXplOiA0MCxcbiAgICAgIC8vICAgICAgIHZhbHVlOiB0aXRsZVxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgICAge1xuICAgICAgLy8gICAgICAgbmFtZTogJ2NvbnRlbnQnLFxuICAgICAgLy8gICAgICAgbGFiZWw6ICdDb250ZW50JyxcbiAgICAgIC8vICAgICAgIHR5cGU6ICd0ZXh0Ym94JyxcbiAgICAgIC8vICAgICAgIHNpemU6IDQwLFxuICAgICAgLy8gICAgICAgdmFsdWU6IGNvbnRlbnRcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIF0sXG4gICAgICAvLyAgIG9uU3VibWl0OiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAvLyAgICAgdmFyIHVybCA9IChhcGkuZGF0YSAhPT0gdW5kZWZpbmVkKSA/IGFwaS5kYXRhLnVybCA6ICcnO1xuICAgICAgLy8gICAgIHZhciB0aXRsZSA9IChhcGkuZGF0YSAhPT0gdW5kZWZpbmVkKSA/IGFwaS5kYXRhLnRpdGxlIDogJyc7XG4gICAgICAvLyAgICAgdmFyIGNvbnRlbnQgPSAoYXBpLmRhdGEgIT09IHVuZGVmaW5lZCkgPyBhcGkuZGF0YS5jb250ZW50IDogJyc7XG4gICAgICAvLyAgICAgdGlueW1jZS5hY3RpdmVFZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUluc2VydENvbnRlbnQnLCBmYWxzZSwgJzxkaXYgY2xhc3M9XCJzY20tbWNlLWRvd25sb2FkLXdyYXBwZXJcIj48cCBjbGFzcz1cInRpdGxlXCI+JyArIHRpdGxlICsgJzwvcD48cCBjbGFzcz1cImNvbnRlbnQgc21hbGxcIj4nICsgY29udGVudCArICc8L3A+PGEgaHJlZj1cIicgKyB1cmwgKyAnXCI+Jm5ic3A7PC9hPjwvZGl2PiZuYnNwOycpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9KTtcbiAgICAgIFxuICAgICAgcmV0dXJuO1xuICAgIH0pO1xuICB9KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==