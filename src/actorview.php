<?php
	$link = mysqli_connect("mysql-site.alwaysdata.net", "site", "A37377912074a", "site_post") or die("Ошибка " . mysqli_error($link)); 

	$token = $_POST['token'];
	$id = $_POST['id'];
	$querypost = "SELECT * FROM `Users` WHERE `Token` LIKE '{$token}' AND `IsModerator` = true";
	$resultpost = mysqli_query($link, $querypost) or die("Ошибка " . mysqli_error($linkpost)); 
	$r = mysqli_fetch_row($resultpost);

	if($r[6] == '1')
	{
		$query ="SELECT * FROM `Actors` WHERE `ID` = {$id}";
		$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
		$r = mysqli_fetch_row($result);
		
		echo json_encode(array("id" => $r[0], "Image" => $r[1], 'Name' => $r[2], 'DateofBirth' => $r[3], 'Growth' => $r[4]));
	}else{
		echo json_encode(null);
	}
?>