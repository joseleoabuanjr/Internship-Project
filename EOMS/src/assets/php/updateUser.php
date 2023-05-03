<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


 $method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}


if ($_SERVER['REQUEST_METHOD'] !== 'PUT') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request detected! Only PUT method is allowed',
    ]);
    exit;
endif;

require 'connectdb.php';
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

// print_r($data);

//die();


if (!isset($data->account_id)) {
    echo json_encode(['success' => 0, 'message' => 'Please enter correct Students id.']);
    exit;
}

    $file = $data->file;
    $filename = $file->name;
    $filetype = $file->type;
    $filedata = file_get_contents($file->tempFilePath);

    echo($filedata);
try {

    $fetch_post = "SELECT * FROM `users` WHERE account_id=:id";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
     //echo 'AAA';
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        $first_name = isset($data->first_name) ? $data->first_name : $row['first_name'];
        $last_name = isset($data->last_name) ? $data->last_name : $row['last_name'];
        $email = isset($data->email) ? $data->email : $row['email'];

        $password = isset($data->password) ? $data->password : $row['password'];


        $update_query = "UPDATE `students` SET first_name = :first_name, last_name = :last_name, email = :email, password = :password,
        gender = :gender, hobbies = :hobbies,
        country = :country
        WHERE account_id = :id";

        $update_stmt = $conn->prepare($update_query);

        $update_stmt->bindValue(':first_name', htmlspecialchars(strip_tags($first_name)), PDO::PARAM_STR);
        $update_stmt->bindValue(':last_name', htmlspecialchars(strip_tags($last_name)), PDO::PARAM_STR);
        $update_stmt->bindValue(':email', htmlspecialchars(strip_tags($email)), PDO::PARAM_STR);
        $update_stmt->bindValue(':password', htmlspecialchars(strip_tags($password)), PDO::PARAM_STR);
        $update_stmt->bindValue(':file', htmlspecialchars(strip_tags($password)), PDO::PARAM_STR);
        $update_stmt->bindValue(':id', $data->account_id, PDO::PARAM_INT);


        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Record udated successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Did not udpate. Something went  wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No record found by the ID.']);
        exit;
    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}