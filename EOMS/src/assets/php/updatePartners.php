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

$data = json_decode(file_get_contents("php://input"));

// print_r($data);

//die();


if (!isset($data->id)) {
    echo json_encode(['success' => 0, 'message' => 'Please enter correct Program id.']);
    exit;
}

    $file = $data->file;
    $filename = $file->name;
    $filetype = $file->type;
    $filedata = file_get_contents($file->tempFilePath);

    echo($filedata);
try {

    $fetch_post = "SELECT * FROM `partners` WHERE id=:id";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
     //echo 'AAA';
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        $name = isset($data->name) ? $data->name : $row['name'];
        $start_date = isset($data->start_date) ? $data->start_date : $row['start_date'];
        $end_date = isset($data->end_date) ? $data->end_date : $row['end_date'];
        $description = isset($data->description) ? $data->description : $row['description'];
        $address = isset($data->address) ? $data->address : $row['address'];
        $contact_p = isset($data->contact_p) ? $data->contact_p : $row['contact_p'];
        $contact_num = isset($data->contact_num) ? $data->contact_num : $row['contact_num'];
        $location = isset($data->location) ? $data->location : $row['location'];
        $website = isset($data->website) ? $data->website : $row['website'];
        $image = isset($data->image) ? $data->image : $row['image'];
        $upload_files = isset($data->upload_files) ? $data->upload_files : $row['upload_files'];



        $update_query = "UPDATE `partners` SET name = :name, start_date = :start_date, end_date = :end_date, description = :description, address = :address, contact_p = :contact_p, contact_num = :contact_num,  location = :location,  website = :website,  image = :image, upload_files = :upload_files
        WHERE id = :id";

        $update_stmt = $conn->prepare($update_query);

        $update_stmt->bindValue(':name', htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
        $update_stmt->bindValue(':start_date', htmlspecialchars(strip_tags($start_date)), PDO::PARAM_STR);
        $update_stmt->bindValue(':end_date', htmlspecialchars(strip_tags($end_date)), PDO::PARAM_STR);
        $update_stmt->bindValue(':description', htmlspecialchars(strip_tags($description)), PDO::PARAM_STR);
        $update_stmt->bindValue(':address', htmlspecialchars(strip_tags($address)), PDO::PARAM_STR);
        $update_stmt->bindValue(':contact_p', htmlspecialchars(strip_tags($contact_p)), PDO::PARAM_STR);
        $update_stmt->bindValue(':contact_num', htmlspecialchars(strip_tags($contact_num)), PDO::PARAM_STR);
        $update_stmt->bindValue(':location', htmlspecialchars(strip_tags($location)), PDO::PARAM_STR);
        $update_stmt->bindValue(':website', htmlspecialchars(strip_tags($website)), PDO::PARAM_STR);
        $update_stmt->bindValue(':image', htmlspecialchars(strip_tags($image)), PDO::PARAM_STR);
        $update_stmt->bindValue(':upload_files', htmlspecialchars(strip_tags($upload_files)), PDO::PARAM_STR);
        $update_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);


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
