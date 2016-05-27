<?php

$params = json_decode(trim(file_get_contents('php://input')), true);

$mysqli = new mysqli("127.0.0.1:8080", "root", "1q2w3e", "learn");

/* проверка соединения */
if ($mysqli->connect_errno) {
	printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
	exit();
}

session_start();

if (isset($params['login']) && isset($params['pass'])){
	$login = $mysqli->real_escape_string(htmlspecialchars($params['login']));
	$pass = md5(trim($params['pass']));

	$chech_user = "
		SELECT user_id, user_login
			FROM users
			WHERE user_login= '$login' AND user_password = '$pass'
			LIMIT 1";

	$result = $mysqli->query($chech_user);
	$row = $result->fetch_assoc();
	if (!$row) {
		$reg_user = "
			INSERT INTO users 
				SET user_login='".$login."', user_password='".$pass."'
		";
		$mysqli->query($reg_user);
		$result = $mysqli->query($chech_user);
		$row = $result->fetch_assoc();
	}
	$_SESSION['user_id'] = $row['user_id'];
	$_SESSION['user_login'] = $row['user_login'];
	setcookie("CookieMy", $row['user_login'], time()+60*60*24*10);
}
$mysqli->close();
echo json_encode($_SESSION);
?>