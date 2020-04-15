<?php
   
    $myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
    $txt = $_POST['hNumber'];
    fwrite($myfile, $txt);


    $popsicle = 'done';
    
    echo $popsicle;
    // echo json_encode($popsicle)

?>