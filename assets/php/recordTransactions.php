<?php

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'conn.php';
  
    if (isset($_POST['data'])) {

        // Retrieve the 'address' parameter value
        $data=explode(',',$_POST['data']);
        $address = $data[0];
        $focoin=$data[1];
        $price=0.001;
        // $checkAddress=$conn->query("SELECT * from connected_wallet where wallet_address='$address'");
       
        // if (mysqli_num_rows($checkAddress)) 
        // {
        //     $addressData=mysqli_fetch_array($checkAddress);
        //     // echo "address found";
        //     $update=$conn->query("UPDATE connected_wallet set focoin='$focoin', current_price='$price' where wallet_address='$address'");
        //     if ($update) {
        //         echo "thank u for buying focoin, transaction recorded well";
        //     } else {
        //         echo "failed to record transaction";
        //     }
        // }

        // else{
            $insertTransaction=$conn->query("INSERT into connected_wallet (wallet_address,focoin,current_price,created_at) values('$address','$focoin','$price',now())");
            
                
            if ($insertTransaction) {
                echo "thank u for buying focoin, transaction recorded well";
            } else {
                echo "failed to record transaction";
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
