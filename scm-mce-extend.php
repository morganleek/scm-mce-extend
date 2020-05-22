<?php 
/**
 * Plugin Name: SCM TinyMCE Extend
 * Version: 0.0.1
 * Author: Morgan Leek
 */

  define('SCM_MCE_EXTEND_BASENAME', plugin_basename(__FILE__));
  define('SCM_MCE_EXTEND_PATH', realpath(plugin_dir_path(__FILE__)) . '/');
  define('SCM_MCE_EXTEND_ASSETS_URL', plugin_dir_url(__FILE__) . 'assets/');

 // TinyMCE
 function _themename_add_mce_style_buttons($buttons) {
    // Remove default WP Heading and Paragraph style selector
    if (($key = array_search('formatselect', $buttons)) !== false) {
      unset($buttons[$key]);
    }
    // Add custom style dropdown
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
  }

  // add_filter( 'teeny_mce_buttons', '_themename_add_mce_style_buttons', 9, 1 );
  add_filter( 'mce_buttons', '_themename_add_mce_style_buttons', 10, 1 );

  function _themename_custom_styles($init_array) {

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
          // array(
          //   'title' => 'Heading Sans Small',
          //   'block' => 'h3',
          //   'attributes' => array(
          //     'class' => 'sans'
          //   )
          // ),
          // array(
          //   'title' => 'Heading Serif Extra Small',
          //   'block' => 'h4',
          //   'attributes' => array(
          //     'class' => 'serif'
          //   )
          // ),
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
        'title' => 'Links',
        'items' => array(
          array(
            'title' => 'Button',
            'selector' => 'a',
            'classes' => 'theme-button'
          ),
          array(
            'title' => 'Button Light',
            'selector' => 'a',
            'classes' => 'theme-button-light'
          ),
          array(
            'title' => 'Button Inactive',
            'selector' => 'a',
            'classes' => 'theme-button-inactive'
          )
        )
      )
    );  
    $init_array['style_formats'] = json_encode( $style_formats );  
    
    return $init_array;  
  }

  add_filter( 'tiny_mce_before_init', '_themename_custom_styles', 10, 1 );

  // Custom Buttons

  function _themename_tinymce() {
    if(!current_user_can( 'edit_posts') &&!current_user_can( 'edit_pages')) {
      return;
    }
    
    if( get_user_option( 'rich_editing') !== 'true') {
      return;
    }
    
    add_filter( 'mce_external_plugins', '_themename_tinymce_external_plugins');
    add_filter( 'mce_buttons', '_themename_timymce_buttons');
  }

  add_action( 'init', '_themename_tinymce' );

  function _themename_tinymce_external_plugins($plugin_array) {
    $plugin_array['_themename_tinymce'] = SCM_MCE_EXTEND_PATH . '/dist/js/tinymce.js?v=1.0.1';

    return $plugin_array;
  }

  function _themename_timymce_buttons($buttons_array) {
    array_push( $buttons_array, '_themename_button' );
    array_push( $buttons_array, '_themename_link_wrapper' );
    array_push( $buttons_array, '_themename_download' );
    array_push( $buttons_array, '_themename_spacer' );

    return $buttons_array;
  }