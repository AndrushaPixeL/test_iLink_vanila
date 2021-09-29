<?php
$to = "ZaphKieL7@yandex.ru"; // емайл получателя данных из формы
$tema = "Форма iLink"; // тема полученного емайла
$message = "Name: ".$_POST['name']."<br>";//присвоить переменной значение, полученное из формы name=name
  $message .= "Gender: ".$_POST['email']."<br>"; //полученное из формы name=email
$message .= "Country: ".$_POST['country']."<br>"; //полученное из формы name=phone
$message .= "City: ".$_POST['city']."<br>"; //полученное из формы name=message
$file = fopen($filename, "r"); //Открываем файл
$text = fread($file, filesize($filename)); //Считываем весь файл
fclose($file); //Закрываем файл
$headers  = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
  $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
mail($to, $tema, $message, $headers); //отправляет получателю на емайл значения переменных
?>