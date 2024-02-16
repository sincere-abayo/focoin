<?php

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'conn.php';
  
    if (isset($_POST['address'])) {

        // Retrieve the 'address' parameter value
        $address = $_POST['address'];
        $checkAddress=$conn->query("SELECT * from connected_wallet where wallet_address='$address'");
       
        if (mysqli_num_rows($checkAddress)) {
    
            $query=$conn->query("SELECT sum(focoin) AS totalFocoin from connected_wallet where wallet_address='$address'");
            $row = $query->fetch_assoc(); 
            $totalFocoin = $row['totalFocoin'];   
            
            //  $totalFocoin=$totalFocoin==NULL?0:$totalFocoin;
             if ($totalFocoin==NULL) {
               echo 0;
               return;
             }
             else
             {
                echo $totalFocoin;
                return;
             }
        }
        else{
            
            $insertAddress=$conn->query("INSERT into connected_wallet (wallet_address) values('$address')");
            if ($insertAddress) {
                
                $query=$conn->query("SELECT sum(focoin) AS totalFocoin from connected_wallet where wallet_address='$address'");
                $row = $query->fetch_assoc(); 
                $totalFocoin = $row['totalFocoin'];   
                
                $totalFocoin=$totalFocoin==null?0:$totalFocoin;
                 echo $totalFocoin;
            }
            else{
                echo "address not inserted ";
            }

        }
    } 
    else {
        // If 'id' parameter is not set in the POST request
        http_response_code(400); // Bad Request
        echo "address parameter is missing";
    }
} else {
    // If the request method is not POST
    http_response_code(405); // Method Not Allowed
    echo "Only POST method is allowed";
}
?>
