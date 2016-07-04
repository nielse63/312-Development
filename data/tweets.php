<?php

require_once __DIR__ . '/functions.php';
require_once dirname(__DIR__) . '/vendor/autoload.php';


function add_tweet_links( $string )
{
	$array = explode( ' ', $string );
	foreach($array as $i => $word) {

		// hashtags
		if( stripos( $word, '#' ) === 0 ) {
			$url = 'https://twitter.com/hashtag/' . trim( $word, '#' );
			$word = '<a href="' . $url . '" target="_blank" rel="nofollow" data-text="' . $word . '">' . $word . '</a>';
			$array[$i] = $word;
		} elseif( stripos( $word, '@' ) === 0 ) {

			// users
			$url = 'https://twitter.com/' . trim( $word, '@' );
			$word = '<a href="' . $url . '" target="_blank" rel="nofollow" data-text="' . $word . '">' . $word . '</a>';
			$array[$i] = $word;
		} elseif( stripos( $word, '.@' ) === 0 ) {

			// users
			$url = 'https://twitter.com/' . trim( $word, '.@' );
			$word = '<a href="' . $url . '" target="_blank" rel="nofollow" data-text="' . $word . '">' . $word . '</a>';
			$array[$i] = $word;
		} elseif( stripos( $word, 'http' ) === 0 ) {

			// urls
			$word = '<a href="' . $word . '" target="_blank" rel="nofollow" data-text="' . $word . '">' . $word . '</a>';
			$array[$i] = $word;
		}
	}
	return implode( ' ', $array );
}

function relative_time( $ts )
{
	if( ! ctype_digit( $ts ) ) {
		$ts = strtotime( $ts );
	}

	$diff = time() - $ts;

	if($diff == 0) {
		return 'now';
	} elseif($diff > 0) {
		$day_diff = floor($diff / 86400);
		if($day_diff == 0) {
			if($diff < 60) {
				return 'just now';
			}
			if($diff < 120) {
				return '1 minute ago';
			}
			if($diff < 3600) {
				return floor( $diff / 60 ) . ' minutes ago';
			}
			if($diff < 7200) {
				return '1 hour ago';
			}
			if($diff < 86400) {
				return floor( $diff / 3600 ) . ' hours ago';
			}
		}
		if($day_diff == 1) {
			// return 'Yesterday';
			return 'Yesterday<br> @ ' . date('g:i a', $ts);
		}
		if($day_diff < 7) {
			return $day_diff . ' days ago';
		}
		if($day_diff < 31) {
			return ceil( $day_diff / 7 ) . ' weeks ago';
		}
		if($day_diff < 60) {
			return 'last month';
		}
		return date('F Y', $ts);
	} else {
		$diff = abs($diff);
		$day_diff = floor($diff / 86400);
		if($day_diff == 0) {
			if($diff < 120) {
				return 'in a minute';
			}
			if($diff < 3600) {
				return 'in ' . floor($diff / 60) . ' minutes';
			}
			if($diff < 7200) {
				return 'in an hour';
			}
			if($diff < 86400) {
				return 'in ' . floor($diff / 3600) . ' hours';
			}
		}
		if($day_diff == 1) {
			return 'Tomorrow';
		}
		if($day_diff < 4) {
			return date('l', $ts);
		}
		if($day_diff < 7 + (7 - date('w'))) {
			return 'next week';
		}
		if(ceil($day_diff / 7) < 4) {
			return 'in ' . ceil($day_diff / 7) . ' weeks';
		}
		if(date('n', $ts) == date('n') + 1) {
			return 'next month';
		}
		return date('F Y', $ts);
	}
}

function get_tweets( $count = 3 )
{
	$settings = array(
		'oauth_access_token'        => "35834611-PpDsgjEVrzeGSycrrY0COeNoTC1FGcQ1240Syxs20",
		'oauth_access_token_secret' => "xhhhzQbmugnOqymv6cwn5RdgCKoZwbQg92rWa1h0BNvqr",
		'consumer_key'              => "MO8xyPFoZGa9G36Cbg8vkly3t",
		'consumer_secret'           => "Mzsh4W8SYfZCOfOnKFm5qxZjoRrr2Chu4WCkxI6m5hahghmQua"
	);
	$username = 'ErikKyleNielsen';
	$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
	$requestMethod = 'GET';
	$getfield = '?screen_name=' . $username . '&count=' . $count;
	$twitter = new TwitterAPIExchange($settings);
	// debug($twitter);
	// exit;
	$output = $twitter
		->setGetfield($getfield)
		->buildOauth($url, $requestMethod)
		->performRequest();
	$tweets = json_decode($output);
	$output = array();
	foreach($tweets as $tweet) {

		if( is_array($tweet) ) {
			$tweet = (object)$tweet;
		}
		// debug($tweet);

		$message = $tweet->text;
		$message = add_tweet_links( $message );
		$time    = relative_time( strtotime( $tweet->created_at ) );
		$output[] = (object)array(
			'id'           => $tweet->id,
			'message'      => $message,
			'time'         => $time,
			'time_literal' => strtotime( $tweet->created_at ),
			'url'          => 'https://twitter.com/' . $username . '/status/' . $tweet->id,
		);
	}
	// update_option( 'custom_latest_tweets', $output );
	// update_option( 'custom_last_checked_tweets', $time );
	return $output;
}

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
echo json_encode( get_tweets(4) );
