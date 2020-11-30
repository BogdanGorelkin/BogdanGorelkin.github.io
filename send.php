<?php
$name = $_POST['Name'];
$email = $_POST['Email'];
$subject = $_POST['Subject'];
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$subject = htmlspecialchars($subject);
$name = urldecode($name);
$email = urldecode($email);
$subject = urldecode($subject);
$name = trim($name);
$email = trim($email);
$subject = trim($subject);
//echo $fio;
//echo "<br>";
//echo $email;
if (mail("b.gorelkin@yandex.ru", "Новое сообщение с персонального сайта", "Имя:".$name.". E-mail: ".$email ,"From: example2@mail.ru \r\n"))
 {     echo "Message sent successfully";
} else {
    echo "errors occurred while sending message";
}?>