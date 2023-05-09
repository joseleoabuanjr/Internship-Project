<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: access");
// header("Access-Control-Allow-Methods: GET");
// header("Access-Control-Allow-Credentials: true");
// header("Content-Type: application/json; charset=UTF-8");
// error_reporting(E_ERROR);
// if ($_SERVER['REQUEST_METHOD'] !== 'GET') :
//     http_response_code(405);
//     echo json_encode([
//         'success' => 0,
//         'message' => 'Bad Reqeust Detected! Only get method is allowed',
//     ]);
//     exit;
// endif;

require 'connectdb.php';
$database = new Operations();
$conn = $database->dbConnection();

$id = null;

if (isset($_GET['id'])) {
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_students',
            'min_range' => 1
        ]
    ]);
}

try {

    $sql = is_numeric($id) ? "SELECT * FROM `partners` WHERE id='$id'" : "SELECT * FROM `partners`";
    
    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :

        $data = null;
        if (is_numeric($id)) {
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $item = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($item as $row) {
                $imagebased64 = base64_encode($row["image"]);
                $name = $row["name"];
                $description = $row["description"];
                $address = $row["address"];
                $contact_p = $row["contact_p"];
                $contact_num = $row["contact_num"];
                $location = $row["location"];
                $website = $row["website"];
                $id = $row["id"];
            }

            $data = array(
                "name" => $name,
                "description" => $description,
                "address" => $address,
                "contact_p" => $contact_p,
                "contact_num" => $contact_num,
                "location" => $location,
                "website" => $website,
                "image" => $imagebased64,
            );

        }
        echo json_encode([
            'success' => 1,
            'data' => $data,
        ]);

    else :
        echo json_encode([
            'success' => 0,
            'message' => 'No Record Found!',
        ]);
    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
?>