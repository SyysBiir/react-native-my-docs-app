<?php
header('Access-Control-Allow-Origin:*');
error_reporting(0);
$bd = mysqli_connect("localhost", "user", "pass", "my_docs");

if ((isset($_POST['event'])) OR ($_POST['event'] != '')) {
switch($_POST["event"])
{
    case "register":
            if ((empty($_POST['login'])) OR ($_POST['login'] == '')) {
                $msg = array("status"=>"error 0");
				echo json_encode($msg);
                exit();
            } elseif ((empty($_POST['pass'])) OR ($_POST['pass'] == '')) {
                $msg = array("status"=>"error 0");
				echo json_encode($msg);
                exit();
            } elseif ((empty($_POST['pass2'])) OR ($_POST['pass2'] == '')) {
                $msg = array("status"=>"error 0");
				echo json_encode($msg);
                exit();
            } elseif ($_POST['pass'] != $_POST['pass2']) {
                $msg = array("status"=>"error 2");
				echo json_encode($msg);
                exit();
            } elseif ((empty($_POST['name'])) OR ($_POST['name'] == '')) {
                $msg = array("status"=>"error 0");
				echo json_encode($msg);
                exit();
            } else {
                $name     = trim(htmlspecialchars(stripslashes($_POST['name'])));
                $login    = trim(htmlspecialchars(stripslashes($_POST['login'])));
                $pass = md5(trim(htmlspecialchars(stripslashes($_POST['pass']))));
                $query    = ("SELECT * FROM users WHERE login='$login' ORDER BY id_user");
                $sql = mysqli_query($bd, $query);
                $row_cnt = mysqli_num_rows($sql);
                if ($row_cnt > 0) {
                    $msg = array("status"=>"error 1");
					echo json_encode($msg);
                    exit();
                } else {
                    $query   = "INSERT INTO users (login, pass, name)
                    VALUES ('$login', '$pass', '$name')";
                    $result = mysqli_query($bd, $query);
                    $msg = array("status"=>"success");
					echo json_encode($msg);
                	exit();
                }
            }
    break;

	case "login":
            $login = trim(htmlspecialchars(stripslashes($_POST['login'])));
            $pass = md5(trim(htmlspecialchars(stripslashes($_POST['pass']))));
            $user_inspection = mysqli_query($bd, "SELECT * FROM users WHERE login = '$login' AND pass = '$pass' ORDER BY id_user");
            $row_cnt = mysqli_num_rows($user_inspection);
            if ($row_cnt > 0) {
                $row = mysqli_fetch_assoc($user_inspection);
                $msg = array("status"=>"success", "id_user"=>$row['id_user'], "name"=>$row['name']);
				echo json_encode($msg);
				exit();
            } else {
                $msg = array("status"=>"error");
				echo json_encode($msg);
				exit();
            }
    break;

	case "get_list":
            $login = trim(htmlspecialchars(stripslashes($_POST['login'])));
            $pass = md5(trim(htmlspecialchars(stripslashes($_POST['pass']))));
            $user_inspection = mysqli_query($bd, "SELECT * FROM users WHERE login = '$login' AND pass = '$pass' ORDER BY id_user");
            $row_cnt = mysqli_num_rows($user_inspection);
            if ($row_cnt > 0) {
                $row = mysqli_fetch_assoc($user_inspection);
                $id_user = $row['id_user'];
                $get_docs = mysqli_query($bd, "SELECT * FROM docs WHERE id_user = '$id_user'");
                $row_cnt_docs = mysqli_num_rows($get_docs);
                if ($row_cnt_docs > 0) {
                	while ($row_docs = mysqli_fetch_assoc($get_docs)){
                		$msg[] = array("count"=>$row_cnt_docs,"status"=>"success","id_doc"=>$row_docs['id_doc'],"name"=>$row_docs['name'],"src"=>$row_docs['src']);
                	}
                	echo json_encode($msg);
                	exit();
                }else{
                	$msg = array("status"=>"none");
					echo json_encode($msg);
					exit();
                }
            } else {
                $msg = array("status"=>"error");
				echo json_encode($msg);
				exit();
            }
    break;

	case "remove":
            $login = trim(htmlspecialchars(stripslashes($_POST['login'])));
            $pass = md5(trim(htmlspecialchars(stripslashes($_POST['pass']))));
            $id_doc = trim(htmlspecialchars(stripslashes($_POST['doc'])));
            $user_inspection = mysqli_query($bd, "SELECT * FROM users WHERE login = '$login' AND pass = '$pass' ORDER BY id_user");
            $row_cnt = mysqli_num_rows($user_inspection);
            if ($row_cnt > 0) {
                $row = mysqli_fetch_assoc($user_inspection);
                $id_user = $row['id_user'];
                $get_docs = mysqli_query($bd, "SELECT * FROM docs WHERE id_user = '$id_user'");
                $row_cnt_docs = mysqli_num_rows($get_docs);
                if ($row_cnt_docs > 0) {
                	$row_docs = mysqli_fetch_assoc($get_docs);	
                		unlink("docs/".$row_docs['src']);
                		mysqli_query($bd, "DELETE FROM docs WHERE id_doc = '$id_doc'");
                		$msg = array("status"=>"success");
                		echo json_encode($msg);
                		exit();
                }else{
                	$msg = array("status"=>"error");
					echo json_encode($msg);
					exit();
                }
            } else {
                $msg = array("status"=>"error");
				echo json_encode($msg);
				exit();
            }
    break;

	default:
	break;
}
}else
{
	$user_inspection = mysqli_query($bd, "SELECT * FROM users");
	if($user_inspection){
		echo "Connected";
	}
}