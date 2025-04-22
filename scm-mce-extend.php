<?php
/**
 * Plugin Name: SCM TinyMCE Extend
 * Version: 0.1.2
 * Author: Morgan Leek
 */

define( 'SCM_MCE_EXTEND_BASENAME', plugin_basename( __FILE__ ) );
define( 'SCM_MCE_EXTEND_PATH', realpath( plugin_dir_path( __FILE__ ) ) . '/' );
define( 'SCM_MCE_EXTEND_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'build/' );

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Custom Styles
// add_filter( 'tiny_mce_before_init', 'scm_mce_extend_custom_styles', 10, 1 );
// Custom Buttons
add_filter( 'mce_buttons', 'scm_mce_extend_add_mce_style_buttons', 10, 1 );
// Init
add_action( 'init', 'scm_mce_extend_tinymce' );


function scm_mce_extend_tinymce() {
	if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
		return;
	}

	if ( get_user_option( 'rich_editing' ) !== 'true' ) {
		return;
	}

	add_editor_style( SCM_MCE_EXTEND_ASSETS_URL . '/style-index.css' );

	add_filter( 'mce_external_plugins', 'scm_mce_extend_tinymce_external_plugins' );
	add_filter( 'mce_buttons', 'scm_mce_extend_tiny_mce_button', 10 );
	// add_filter( 'mce_buttons', 'scm_mce_extend_tiny_mce_link_wrapper', 10 );
	// add_filter( 'mce_buttons', 'scm_mce_extend_tiny_mce_download', 10 );
	add_filter( 'mce_buttons', 'scm_mce_extend_tiny_mce_spacer', 10 );
	add_filter( 'mce_buttons', 'scm_mce_extend_tiny_mce_transcript', 10 );
}

// TinyMCE
function scm_mce_extend_add_mce_style_buttons( $buttons ) {
	// Remove default WP Heading and Paragraph style selector
	if ( ( $key = array_search( 'formatselect', $buttons ) ) !== false ) {
		unset( $buttons[ $key ] );
	}

	// Add custom style dropdown
	array_unshift( $buttons, 'styleselect' );

	return $buttons;
}

function scm_mce_extend_custom_styles( $init_array ) {
	$style_formats = [ 
		[ 
			'title' => 'Headings',
			'items' => [ 
				[ 
					'title'      => 'Heading Serif Large',
					'block'      => 'h2',
					'attributes' => [ 
						'class' => 'serif',
					],
				],
				[ 
					'title'      => 'Heading Sans Large',
					'block'      => 'h2',
					'attributes' => [ 
						'class' => 'sans',
					],
				],
				[ 
					'title'      => 'Heading Small',
					'block'      => 'h3',
					'attributes' => [ 
						'class' => 'serif',
					],
				],
				[ 
					'title'      => 'Heading Extra Small',
					'block'      => 'h4',
					'attributes' => [ 
						'class' => 'sans',
					],
				],
			],
		],
		[ 
			'title' => 'Heading Colours',
			'items' => [ 
				[ 
					'title'    => 'Gold (Dark)',
					'selector' => 'h1,h2,h3,h4,h5,h6',
					'classes'  => 'gold-dark',
				],
			],
		],
		[ 
			'title' => 'Paragraph',
			'items' => [ 
				[ 
					'title'      => 'Regular',
					'block'      => 'p',
					'attributes' => [ 
						'class' => 'regular',
					],
				],
				[ 
					'title'      => 'Small',
					'block'      => 'p',
					'attributes' => [ 
						'class' => 'small',
					],
				],
				[ 
					'title'      => 'Legal',
					'block'      => 'p',
					'attributes' => [ 
						'class' => 'legal',
					],
				],
				[ 
					'title'      => 'Small Caps',
					'block'      => 'p',
					'attributes' => [ 
						'class' => 'small-caps',
					],
				],
			],
		],
		[ 
			'title' => 'Paragraph Colours',
			'items' => [ 
				[ 
					'title'    => 'Gold (Dark)',
					'selector' => 'p',
					'classes'  => 'gold-dark',
				],
			],
		],
		[ 
			'title' => 'Links',
			'items' => [ 
				[ 
					'title'    => 'Button',
					'selector' => 'a',
					'classes'  => 'scm-mce-button',
				],
				[ 
					'title'    => 'Button Light',
					'selector' => 'a',
					'classes'  => 'scm-mce-button-light',
				],
				[ 
					'title'    => 'Button Inactive',
					'selector' => 'a',
					'classes'  => 'scm-mce-button-inactive',
				],
			],
		],
		[ 
			'title' => 'Lists',
			'items' => [ 
				[ 
					'title'      => 'Two column grid',
					'block'      => 'ul',
					'wrapper'    => true,
					'attributes' => [ 
						'class' => 'grid-two-column',
					],
				],
				[ 
					'title'      => 'Three column grid',
					'block'      => 'ul',
					'wrapper'    => true,
					'attributes' => [ 
						'class' => 'grid-three-column',
					],
				],
			],
		],
	];

	$init_array['style_formats'] = json_encode( $style_formats );

	return $init_array;
}

function scm_mce_extend_tinymce_external_plugins( $plugin_array ) {
	$plugin_array['scm_mce_extend_tinymce'] = SCM_MCE_EXTEND_ASSETS_URL . '/index.js?v=1.0.1';
	return $plugin_array;
}

function scm_mce_extend_tiny_mce_button( $buttons_array ) {
	array_push( $buttons_array, 'scm_mce_extend_button' );
	return $buttons_array;
}

function scm_mce_extend_tiny_mce_link_wrapper( $buttons_array ) {
	array_push( $buttons_array, 'scm_mce_extend_link_wrapper' );
	return $buttons_array;
}

function scm_mce_extend_tiny_mce_download( $buttons_array ) {
	array_push( $buttons_array, 'scm_mce_extend_download' );
	return $buttons_array;
}

function scm_mce_extend_tiny_mce_spacer( $buttons_array ) {
	array_push( $buttons_array, 'scm_mce_extend_spacer' );
	return $buttons_array;
}

function scm_mce_extend_tiny_mce_transcript( $buttons_array ) {
	array_push( $buttons_array, 'scm_mce_extend_transcript' );
	return $buttons_array;
}
