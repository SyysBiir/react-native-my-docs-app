<?php
header('Access-Control-Allow-Origin:*');
error_reporting(0);
$bd = mysqli_connect("localhost", "id1802248_root", "qweqweqwe", "id1802248_my_docs");

$login    = trim(htmlspecialchars(stripslashes($_POST['login'])));
$pass = md5(trim(htmlspecialchars(stripslashes($_POST['pass']))));
$custom_name    = trim(htmlspecialchars(stripslashes($_POST['f_name'])));
function _RandomValue($length){
	$chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
	$numChars = strlen($chars);
	$string = '';
	for ($i = 0; $i < $length; $i++) {
	$string .= substr($chars, rand(1, $numChars) - 1, 1);
	}
	return $string;
}

$mime = mime_content_type($_FILES['file']['tmp_name']);
$new_name = _RandomValue(13).".pdf";

if($mime == "application/pdf")
{
	if (move_uploaded_file($_FILES['file']['tmp_name'], "docs/".$new_name)) {
	            $query    = ("SELECT * FROM users WHERE login='$login' AND pass='$pass' ORDER BY id_user");
                $sql = mysqli_query($bd, $query);
                $row_cnt = mysqli_num_rows($sql);
                if ($row_cnt > 0) {
                	$row = mysqli_fetch_assoc($sql);
                	$id_user = $row['id_user'];
                    $query   = "INSERT INTO docs (id_user, name, src)
                    VALUES ('$id_user', '$custom_name', '$new_name')";
                    $result = mysqli_query($bd, $query);
                    print "Документ успешно загружен ";
                } else {
                    print "Что-то пошло не так, попробуйте еще раз";
                }
	} else {
	    print "Не удалось загрузить документ";
	}
}else{
	print "Можно загрузить только файлы PDF";
}
?>