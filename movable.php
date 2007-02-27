<?php
/*
Plugin Name: Movable Anything
Plugin URI: http://dancameron.org/wordpress/wordpress-plugins/movable-anything/
Description: Drag and drop anything anywhere. A web 2.0 plugin.
Author: Daniel Cameron
Version: 0.2
Author URI: http://dancameron.org
License: Creative Commons Attribution-ShareAlike | If you are going to change any code and distribute it please notify me first.
Tags: K2, commenting, ajax, dhtml, binarybonsai, kickass
Notes: Thanks to Todd's ajax Drag and Drop tutorial found here: http://www.ditchnet.org/wp/2005/06/15/ajax-freakshow-drag-n-drop-events-2/ and Zeo of K2.
*/


$movable_version = "0.2";
$movable_url = get_bloginfo('wpurl') . "/";


function movable_header() {

        global $movable_version, $movable_url;

        echo '
        <!-- Added by K2 Movable Comment Form. Version '.$movable_version.' -->
        <link rel="stylesheet" type="text/css" media="screen" href="'.$movable_url.'wp-content/plugins/movable/movable.css" />
        <script type="text/javascript" src="'.$movable_url.'wp-content/plugins/movable/movable.js"></script>
        ';
}

function movable() {

global $movable_url;

echo "


<div id='box'
	 style='position:relative; text-align: left; left:0px;  top:00px; padding: 20px; width: 91%; filter: alpha(opacity=100); opacity: 1;'
	 onmousedown='dragPress(event);'>


";
}

add_action('wp_head', 'movable_header');
?>
