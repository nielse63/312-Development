<?php

// header('Content-type: application/json');

require_once __DIR__ . '/functions.php';

function create_new_post($content)
{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://api.contentful.com/spaces/o4irotzruet8/entries");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HEADER, FALSE);
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		"Authorization: Bearer e0a925313b3d7cffe092e3cb7fb4d8be4024f2adb91d68ff953d05f071b0881f",
		"Content-Type: application/vnd.contentful.management.v1+json",
		"X-Contentful-Content-Type: 47g12FQ9BKOiU0A2OwYIkA"
	));
	$response = curl_exec($ch);
	curl_close($ch);
	debug($response);
}

function getPosts($xml_string)
{
	$xml = simplexml_load_string($xml_string);
	$json = json_encode($xml, JSON_PRETTY_PRINT);
	$object = json_decode($json);
	return $object->channel->item;
}

function make_excerpt($string)
{
	// strip tags and extra whitespace
	$string = preg_replace( '@<(script|style|pre)[^>]*?>.*?</\\1>@si', '', $string );
	$string = strip_tags($string);
	$string = preg_replace('/[\r\n\t ]+/', ' ', $string);
	$string = trim( $string );

	// limit character count
	$string = mb_substr( $string, 0, 100 );
	$string = preg_replace( '/&[^;\s]{0,6}$/', '', $string );
	$string = trim( $string );
	return $string;
}

$root = '/Users/eriknielsen/Downloads';
$xml_filepath = $root . '/wordpress.xml';
if( ! file_exists($xml_filepath) ) {
	exit;
}
$xml_string = file_get_contents($xml_filepath);

// posts
$posts = getPosts($xml_string);
foreach( $posts as $post ) {
	unset( $post->description );
	unset( $post->link );
	unset( $post->guid );
	$post->category = $post->category->{'@attributes'}->nicename;
}

// parse raw xml file
preg_match_all('/<item>(.*?)<\/item>/s', $xml_string, $matches);
foreach( $matches[1] as $i => $item ) {

	// get content
	preg_match('/<content:encoded><\!\[CDATA\[(.*?)\]\]><\/content:encoded>/s', $item, $content_matches);
	$content = trim($content_matches[1]);
	$posts[$i]->content = $content;
	$posts[$i]->excerpt = make_excerpt($content);

	// get post meta
	$values = [];
	$string = [];
	$short_link = '';

	preg_match_all('/<wp:postmeta>(.*?)<\/wp:postmeta>/s', $item, $meta_matches);
	foreach( $meta_matches[1] as $meta_item ) {
		$meta_item = trim( str_replace( ["\n", "\t"], '', $meta_item ) );
		preg_match_all('/<wp:meta_key><\!\[CDATA\[(.*?)\]\]><\/wp:meta_key>/', $meta_item, $key_matches);
		$key = reset( $key_matches[1] );

		preg_match_all('/<wp:meta_value><\!\[CDATA\[(.*?)\]\]><\/wp:meta_value>/', $meta_item, $val_matches);
		$val = reset( $val_matches[1] );

		if( $key === '_shortened_url' ) {
			$short_link = $val;
			continue;
		}

		if( stripos($key, 'links_') !== 0 ) {
			continue;
		}

		$string[] = $val;
		if( stripos($key, '_url') !== false ) {
			$values[] = implode( ': ', $string );
			$string = [];
		}
	}

	// set new values to post object
	$posts[$i]->links = $values;
	$posts[$i]->short_link = $short_link;
}
// debug($posts);

foreach( $posts as $i => $post ) {

	$new_object = (object)array(
		'title' => [
			'en-US' => $post->title
		],
		'publishedDate' => [
			'en-US' => $post->pubDate
		],
		'content' => [
			'en-US' => $post->content
		],
		'excerpt' => [
			'en-US' => $post->excerpt
		],
		'category' => [
			'en-US' => $post->category
		],
		'links' => [
			'en-US' => $post->links
		],
		'shortLink' => [
			'en-US' => $post->short_link
		],
	);
	create_new_post("{\"fields\": " . json_encode( $new_object ) . "}");
}

