<?php
   
    $myfile = fopen("newfile2.txt", "w") or die("Unable to open file!");
    $txt = $_POST['hData'];
    fwrite($myfile, $txt);


    $popsicle = 'done';
    
    echo $popsicle;
    // echo json_encode($popsicle)

?>