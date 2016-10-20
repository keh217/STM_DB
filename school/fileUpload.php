<?php
/**
 * User: Seth Deal
 */
?>
<head>
    <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css"
          integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
            integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
            crossorigin="anonymous"></script>

</head>
<?php
if (isset($_POST['submit'])) { //submit has been pressed
    if(getimagesize($_FILES['students']['tmp_name']) == TRUE){
        if($_FILES['students']['size'] < 500000) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo, $_FILES['students']['tmp_name']);
            $mime = strtolower($mime);
            $ok = false;
            switch ($mime) { //check file type
                case 'text/csv':
                    $ok = true;
                    break;
                default:
                    $errors[] = lang("ACCOUNT_PIC_WRONG_FILETYPE");
                // die("Unknown/not permitted file type");
            }
            if ($ok == true) {
                $upload= addslashes($_FILES['students']['tmp_name']); //addslashes() function returns a string with backslashes in front of predefined
                $name= addslashes($_FILES['students']['name']);      //characters: ', ", \, NULL. To prepare string for storage in a database and database queries
                $upload= file_get_contents($upload);
                $upload= base64_encode($upload);
                //$query = "INSERT INTO bookPics (FK,img) VALUES (?,?);";
                //$stmt = $connection->prepare($query);
                //$stmt->bind_param("ss",$FK,$img);
                //$FK = $theFK;
                //$img = $image;
                //$stmt->execute();
                //$stmt->close();
            }
        }else{
            $errors[] = lang("FILESIZE_TOO_LARGE");
        }
    }
    if(empty($errors)){
        ?>
<!--        <script>-->
<!--            window.location.href = "/login/account.php"-->
<!--        </script>-->
        <?php
        exit();
    }else{
        die();
    }
}
?>
<body>
<div class="container-fluid center-block col-md-4 col-md-offset-4" style="margin-top: 100px; float: none;">
    <form id="entryForm" name="entryForm" action="" enctype="multipart/form-data" method="post">
        <div class="form-group">
            <label>File to Upload</label>
            <input class="form-control" type="file" name="students" id="students" required />
            <button type="submit" name="submit" id="submit" class="btn btn-default">Submit</button>
        </div>
    </form>
</div>
</body>
</html>
