<?php

$add_table = "
	CREATE TABLE users(
		user_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
		user_login VARCHAR(30) NOT NULL,
		user_password VARCHAR(32) NOT NULL,
		PRIMARY KEY (user_id)
	)";


$mysqli = new mysqli('127.0.0.1:8080', 'root', '1q2w3e', 'learn');

if ($mysqli->connect_errno) {
	printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
	exit();
}

$mysqli->query($add_table);
$mysqli->close();

session_start();
echo json_encode($_SESSION);
?>