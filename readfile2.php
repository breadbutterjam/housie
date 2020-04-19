<?php

    $myfile = fopen("newfile2.txt", "r") or die("Unable to open file!");
    echo fread($myfile,filesize("newfile2.txt"));
    fclose($myfile);

?>