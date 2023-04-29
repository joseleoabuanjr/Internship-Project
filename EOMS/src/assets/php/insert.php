<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request!.Only POST method is allowed',
    ]);
    exit;
endif;

require 'connectdb.php';
$database = new Operations();
$conn = $database->dbConnection();
$data = json_decode(file_get_contents('php://input'));


if (!isset($data->firstname) || !isset($data->lastname) || !isset($data->email) || !isset($data->username) || !isset($data->password) || !isset($data->faculty_id)) :
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  First Name, Last Name, Email, Username, Password and Faculty ID',
    ]);
    exit;
elseif (empty(trim($data->firstname)) || empty(trim($data->lastname)) || empty(trim($data->email)) || empty(trim($data->username)) || empty(trim($data->password)) || empty(trim($data->faculty_id))) :
    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;
endif;
try {
    $first_name = $data->firstname;
    $last_name = $data->lastname;
    $email = $data->email;
    $username = $data->username;
    $password = $data->password;
    $faculty_id = $data->faculty_id;

    $query = "INSERT INTO `users`(
    username,
    password,
    first_name,
    last_name,
    email,
    faculty_id
    ) 
    VALUES(
    :username,
    :password,
    :first_name,
    :last_name,
    :email,
    :faculty_id
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':first_name', $first_name, PDO::PARAM_STR);
    $stmt->bindValue(':last_name', $last_name, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':username', $username, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);
    $stmt->bindValue(':faculty_id', $faculty_id, PDO::PARAM_STR);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully.'
        ]);
        exit;
    }
    
    echo json_encode([
        'success' => 0,
        'message' => 'There is some problem in data inserting'
    ]);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
?>
