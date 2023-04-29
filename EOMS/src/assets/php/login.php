<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
error_reporting(E_ERROR);

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

if (!isset($data->username) || !isset($data->password)) :

    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  Username and Password',
    ]);
    exit;

elseif (empty(trim($data->username)) || empty(trim($data->password))) :

    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;

endif;

try {
    $username = $data->username;
    $password = $data->password;

    $query = "SELECT * FROM `users`
    WHERE 
    username = :username 
    AND 
    password = :password
    ";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':username', $username, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);

    if ($stmt->execute()) {
        // $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // print_r($result);
        // print_r($stmt->errorInfo());
        if ($stmt->rowCount() > 0) {
            ;
            while ($row = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
                $data = $row[0];
            }
            http_response_code(201);
            echo json_encode([
                'success' => 1,
                'message' => 'Username and Password Selected Successfully.',
                'data' => $data
            ]);
        } else {
            echo json_encode([
                'success' => 0,
                'message' => 'There is no results.'
            ]);
        }
        exit;
    }
    
    echo json_encode([
        'success' => 0,
        'message' => 'There is some problem in data selecting'
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