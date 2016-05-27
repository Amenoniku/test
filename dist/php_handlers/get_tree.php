<?php

$path = '../';
$queue = '';
function createDir($path = '.') {
	if ($handle = opendir($path)) {
		while (false !== ($file = readdir($handle))) {
			if (is_dir($path.$file) && $file != '.' && $file !='..') {
				printSubDir($file, $path);
			}
			else if ($file != '.' && $file !='..') {
				$queue[] = $file;
			}
		}
		printQueue($queue, $path);
	}
}

function printQueue($queue, $path) {
	foreach ($queue as $file) {
		printFile($file, $path);
	}
}
function printFile($file, $path) {
	$term = '';
	if ($path != '../') {
		$term = '---';
	}
	echo '<li class="file"><a href="'.$path.$file.'">'.$term.$file.'</a></li>';
	$term = '';
}

function printSubDir($dir, $path) {
	echo '<li class="toggle">' . $dir;
	createDir($path.$dir.'/');
	echo '</li>';
}

createDir($path);