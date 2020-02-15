<?php
    header("Access-Control-Allow-Origin: *");

    if (!isset($_FILES['video-blob'])) {
        die("no file");
    }

    $tmp_path = $_FILES["video-blob"]["tmp_name"];
    $id = md5(rand());
    $file_path = "$id.webm";
    move_uploaded_file($tmp_path, $file_path);