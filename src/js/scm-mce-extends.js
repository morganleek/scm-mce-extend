(function() {
  tinymce.PluginManager.add( 'scm_mce_extend_tinymce', function( editor, url ) {
    // Button
    editor.addButton('scm_mce_extend_button', {
      title: 'Make Button',
      cmd: 'scm_mce_extend_button',
      image: url + '/../images/scm-tinymce-button.svg'
    });
  
    editor.addCommand('scm_mce_extend_button', function() {
      var node = editor.selection.getNode();
      switch(node.tagName) {
        case 'P':
        case 'p':
          var anchors = node.getElementsByTagName('a');
          if(anchors.length > 0) {
            for(var i = 0; i < anchors.length; i++) {
              anchors[i].classList.toggle('scm-mce-button');
            }
          }
          break;
        case 'A':
        case 'a':
          node.classList.toggle('scm-mce-button');
          break;
        default:
          window.alert( 'Please select a link and then click this button.' );
          break;
      }
      return;
    });

    // Spacer 
    editor.addButton('scm_mce_extend_spacer', {
      title: 'Spacer',
      cmd: 'scm_mce_extend_spacer',
      image: url + '/../images/scm-tinymce-spacer.svg'
    });
    
    editor.addCommand('scm_mce_extend_spacer', function() {
      var node = editor.selection.getNode();
      var mobileHeight, desktopHeight = '';
      
      // Get details if they exist already
      console.log(node.classList);
      if(node.classList.contains('scm-mce-spacer')) {
        // var parent = node.parentNode;
        
        mobileHeight = (node.dataset.mobile !== undefined) ? node.dataset.mobile : '40px';
        desktopHeight = (node.dataset.desktop !== undefined) ? node.dataset.desktop : '30px';

        // node.remove();
      }
      
      // Open Dialogue
      editor.windowManager.open({
        title: 'Insert Link',
        body: [
          {
            name: 'desktopHeight',
            label: 'Desktop Height (px)',
            type: 'textbox',
            size: 40,
            value: desktopHeight
          },
          {
            name: 'mobileHeight',
            label: 'Mobile Height (px)',
            type: 'textbox',
            size: 40,
            value: mobileHeight
          }
        ],
        onSubmit: function (api) {
          var mobileHeight = (api.data !== undefined) ? api.data.mobileHeight : '';
          var desktopHeight = (api.data !== undefined) ? api.data.desktopHeight : '';
          tinymce.activeEditor.execCommand('mceInsertContent', false, '<hr class="scm-mce-spacer" style="--spacer-desktop-height: ' + desktopHeight + '; --spacer-mobile-height: ' + mobileHeight + ';" data-desktop="' + desktopHeight + '" data-mobile="' + mobileHeight + '" />');
        }
      });
      
      return;
    });

    // Link Wrapper
    editor.addButton('scm_mce_extend_link_wrapper', {
      title: 'Make Link Wrapper',
      cmd: 'scm_mce_extend_link_wrapper',
      image: url + '/../images/scm-tinymce-link-wrapper.svg'
    });

    // var linkFrame;
    
    editor.addCommand('scm_mce_extend_link_wrapper', function() {
      var node = editor.selection.getNode();
      var title = ''; var url = '#';
      switch(node.tagName) {
        case 'P':
        case 'p':
          var anchors = node.getElementsByTagName('a');
          if(anchors.length > 0) {
            url = (anchors[0].getAttribute('href') !== null) ? anchors[0].getAttribute('href') : '';
            title = (anchors[0].innerHTML.length > 0) ? anchors[0].innerHTML : '';
          }
          break;
        case 'A':
        case 'a':
          // node.classList.toggle('scm-mce-button');
          url = (node.getAttribute('href') !== null) ? node.getAttribute('href') : '';
          title = (node.innerHTML.length > 0) ? node.innerHTML : '';
          break;
        default:
          return;
          break;
      }

      if(title !== '' && url !== '#') {
        node.remove();
        tinymce.activeEditor.execCommand('mceInsertContent', false, '<p class="scm-mce-link-wrapper">' + 
          '<span class="link"><a href="' + url + '">&nbsp;</a></span>' +
          '<span class="title">' + title + '</span>' + 
          '<span class="content small">Short description&hellip;</span>' + 
        '</p>');
      }
      
      return;
    });

    // Download
    editor.addButton('scm_mce_extend_download', {
      title: 'Make Download Wrapper',
      cmd: 'scm_mce_extend_download',
      image: url + '/../images/scm-tinymce-download.svg'
    });

    var fileFrame;
    
    editor.addCommand('scm_mce_extend_download', function() {
      var node = editor.selection.getNode();
      var title, url = '';
      switch(node.tagName) {
        case 'P':
        case 'p':
          var anchors = node.getElementsByTagName('a');
          if(anchors.length > 0) {
            url = (anchors[0].getAttribute('href') !== null) ? anchors[0].getAttribute('href') : '';
            title = (anchors[0].innerHTML.length > 0) ? anchors[0].innerHTML : '';
          }
          break;
        case 'A':
        case 'a':
          // node.classList.toggle('scm-mce-button');
          url = (node.getAttribute('href') !== null) ? node.getAttribute('href') : '';
          title = (node.innerHTML.length > 0) ? node.innerHTML : '';
          break;
        default:
          return;
          break;
      }

      if(title !== '' && url !== '#') {
        node.remove();
        tinymce.activeEditor.execCommand('mceInsertContent', false, '<p class="scm-mce-download-wrapper">' + 
          '<span class="link"><a href="' + url + '">&nbsp;</a></span>' +
          '<span class="title">' + title + '</span>' + 
          '<span class="content small">Short description&hellip;</span>' + 
        '</p>');
      }
      
      return;
      // if ( fileFrame ) {
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