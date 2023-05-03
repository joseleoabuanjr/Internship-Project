<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request!.Only DELETE method is allowed',
    ]);
    exit;
endif;

require 'connectdb.php';
$database = new Operations();
$conn = $database->dbConnection();

if (isset($_GET['id'])) {
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_user',
            'min_range' => 1
        ]
    ]);
}

try {

    $sql = "DELETE FROM `approvals` WHERE account_id = $id";
    

    $stmt = $conn->prepare($sql);

    if ($stmt->execute()) :

        echo json_encode([
            'success' => 1,
            'message' => 'Data Deleted Successfully.',
        ]);

    else :
        echo json_encode([
            'success' => 0,
            'message' => 'There is some problem in data Deletion'
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