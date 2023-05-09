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


if (!isset($data->name) || !isset($data->start_date) || !isset($data->end_date) || !isset($data->description) || !isset($data->address) || !isset($data->contact_p) || !isset($data->contact_num) || !isset($data->location) || !isset($data->website) || !isset($data->image) || !isset($data->upload_files)) :
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  Partner Name, Date and Time: Start to End, Description, Partner Address, Contact Person, Contact Number, Location, Website, Image, and Files',
    ]);
    exit;
elseif (empty(trim($data->name)) || empty(trim($data->start_date)) || empty(trim($data->end_date)) || empty(trim($data->description)) || empty(trim($data->address)) || empty(trim($data->contact_p)) || empty(trim($data->contact_num)) || empty(trim($data->location)) || empty(trim($data->website)) || empty(trim($data->image)) || empty(trim($data->upload_files))) :
    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;
endif;
try {
    $name = $data->name;
    $start_date = $data->start_date;
    $end_date = $data->end_date;
    $description = $data->description;
    $address = $data->address;
    $contact_p = $data->contact_p;
    $contact_num = $data->contact_num;
    $location = $data->location;
    $website = $data->website;
    $image = $data->image;
    $upload_files = $data->upload_files;

    $query = "INSERT INTO `partners`(
    name,
    start_date,
    end_date,
    description,
    address,
    contact_p,
    contact_num,
    location,
    website,
    image,
    upload_files
    )
    VALUES(
    :name,
    :start_date,
    :end_date,
    :description,
    :address,
    :contact_p,
    :contact_num,
    :location,
    :website,
    :image
    :upload_files
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->bindValue(':start_date', $start_date, PDO::PARAM_STR);
    $stmt->bindValue(':end_date', $end_date, PDO::PARAM_STR);
    $stmt->bindValue(':description', $description, PDO::PARAM_STR);
    $stmt->bindValue(':address', $address, PDO::PARAM_STR);
    $stmt->bindValue(':contact_p', $contact_p, PDO::PARAM_STR);
    $stmt->bindValue(':contact_num', $contact_num, PDO::PARAM_STR);
    $stmt->bindValue(':location', $location, PDO::PARAM_STR);
    $stmt->bindValue(':website', $website, PDO::PARAM_STR);
    $stmt->bindValue(':image', $image, PDO::PARAM_STR);
    $stmt->bindValue(':upload_files', $upload_files, PDO::PARAM_STR);

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
