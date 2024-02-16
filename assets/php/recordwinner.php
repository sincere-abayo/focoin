<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'conn.php';
  
    if (isset($_POST['data'])) {

        // Retrieve the 'address' parameter value
        $data=explode(',',$_POST['data']);
        $address = $data[0];
        $focoin=$data[1];
        $email=$data[2];
        $phone=$data[3];

     $insertTransaction=$conn->query("INSERT into winners (w_token,w_adress,w_email,w_phone,created_at) values('$focoin','$address','$email',$phone,now())");
            
                
            if ($insertTransaction) {
                echo "thank u for applying for winner trade program";
            } else {
                echo "failed to apply";
            }

        // }
    } 
    else {
        // If 'id' parameter is not set in the POST request
        http_response_code(400); // Bad Request
        echo "address parameter is missing";
    }
}
 else {
    // If the request method is not POST
    http_response_code(405); // Method Not Allowed
    echo "Only POST method is allowed";
}
?>
