<?php 
/**
 * Plugin Name: SCM TinyMCE Extend
 * Version: 0.1.0
 * Author: Morgan Leek
 */

  define('SCM_MCE_EXTEND_BASENAME', plugin_basename(__FILE__));
  define('SCM_MCE_EXTEND_PATH', realpath(plugin_dir_path(__FILE__)) . '/');
  define('SCM_MCE_EXTEND_ASSETS_URL', plugin_dir_url(__FILE__) . 'dist/');

 // TinyMCE
 function scm_mce_extend_add_mce_style_buttons($buttons) {
    // Remove default WP Heading and Paragraph style selector
    if (($key = array_search('formatselect', $buttons)) !== false) {
      unset($buttons[$key]);
    }
    // Add custom style dropdown
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
  }

  // add_filter( 'teeny_mce_buttons', 'scm_mce_extend_add_mce_style_buttons', 9, 1 );
  add_filter( 'mce_buttons', 'scm_mce_extend_add_mce_style_buttons', 10, 1 );

  function scm_mce_extend_custom_styles($init_array) {

    $style_formats = array(  
      array(
        'title' => 'Headings',
        'items' => array(
          array(
            'title' => 'Heading Serif Large',
            'block' => 'h2',
            'attributes' => array(
              'class' => 'serif'
            )
          ),
          array(
            'title' => 'Heading Sans Large',
            'block' => 'h2',
            'attributes' => array(
              'class' => 'sans'
            )
          ),
          array(
            'title' => 'Heading Small',
            'block' => 'h3',
            'attributes' => array(
              'class' => 'serif'
            )
          ),
          array(
            'title' => 'Heading Extra Small',
            'block' => 'h4',
            'attributes' => array(
              'class' => 'sans'
            )
          )
        )
      ),
      array(
        'title' => 'Heading Colours',
        'items' => array(
          array(
            'title' => 'Gold (Dark)',
            'selector' => 'h1,h2,h3,h4,h5,h6',
            'classes' => 'gold-dark'
          )
        )
      ),
      array(
        'title' => 'Paragraph',
        'items' => array(
          array(
            'title' => 'Regular',
            'block' => 'p',
            'attributes' => array(
              'class' => 'regular'
            )
          ),
          array(
            'title' => 'Small',
            'block' => 'p',
            'attributes' => array(
              'class' => 'small'
            )
          ),
          array(
            'title' => 'Legal',
            'block' => 'p',
            'attributes' => array(
              'class' => 'legal'
            )
          ),
          array(
            'title' => 'Small Caps',
            'block' => 'p',
            'attributes' => array(
              'class' => 'small-caps'
            )
          )
        )
      ),
      array(
        'title' => 'Paragraph Colours',
        'items' => array(
          array(
            'title' => 'Gold (Dark)',
            'selector' => 'p',
            'classes' => 'gold-dark'
          )
        )
      ),
      array(
        'title' => 'Links',
        'items' => array(
          array(
            'title' => 'Button',
            'selector' => 'a',
            'classes' => 'scm-mce-button'
          ),
          array(
            'title' => 'Button Light',
            'selector' => 'a',
            'classes' => 'scm-mce-button-light'
          ),
          array(
            'title' => 'Button Inactive',
            'selector' => 'a',
            'classes' => 'scm-mce-button-inactive'
          )
        )
      ),
      array(
        'title' => 'Lists',
        'items' => array(
          array(
            'title' => 'Two column grid',
            'block' => 'ul',
            'wrapper' => true,
            'attributes' => array(
              'class' => 'grid-two-column'
            )
          ),
          array(
            'title' => 'Three column grid',
            'block' => 'ul',
            'wrapper' => true,
            'attributes' => array(
              'class' => 'grid-three-column'
            )
          )
        )
      )
    );  
    $init_array['style_formats'] = json_encode( $style_formats );  
    
    return $init_array;  
  }

  add_filter( 'tiny_mce_before_init', 'scm_mce_extend_custom_styles', 10, 1 );

  // Custom Buttons

  function scm_mce_extend_tinymce() {
    if(!current_user_can( 'edit_posts') &&!current_user_can( 'edit_pages')) {
      return;
    }
    
    if( get_user_option( 'rich_editing') !== 'true') {
      return;
    }

		add_editor_style(SCM_MCE_EXTEND_ASSETS_URL . '/css/scm-mce-extends.css');
    
    add_filter( 'mce_external_plugins', 'scm_mce_extend_tinymce_external_plugins');
    add_filter( 'mce_buttons', 'scm_mce_extend_timymce_buttons');
  }

  add_action( 'init', 'scm_mce_extend_tinymce' );

  function scm_mce_extend_tinymce_external_plugins($plugin_array) {
    $plugin_array['scm_mce_extend_tinymce'] = SCM_MCE_EXTEND_ASSETS_URL . '/js/scm-mce-extends.js?v=1.0.1';

    return $plugin_array;
  }

  function scm_mce_extend_timymce_buttons($buttons_array) {
    array_push( $buttons_array, 'scm_mce_extend_button' );
    array_push( $buttons_array, 'scm_mce_extend_link_wrapper' );
    array_push( $buttons_array, 'scm_mce_extend_download' );
    array_push( $buttons_array, 'scm_mce_extend_spacer' );

    return $buttons_array;
  }