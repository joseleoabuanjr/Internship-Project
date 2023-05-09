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

    $fetch_post = "SELECT * FROM `programs` WHERE id=:id";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
     //echo 'AAA';
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        $program_title = isset($data->program_title) ? $data->program_title : $row['program_title'];
        $date_time_start = isset($data->date_time_start) ? $data->date_time_start : $row['date_time_start'];
        $date_time_end = isset($data->date_time_end) ? $data->date_time_end : $row['date_time_end'];
        $place = isset($data->place) ? $data->place : $row['place'];
        $program_details = isset($data->program_details) ? $data->program_details : $row['program_details'];
        $program_lead = isset($data->program_lead) ? $data->program_lead : $row['program_lead'];
        $program_members = isset($data->program_members) ? $data->program_members : $row['program_members'];
        $participants = isset($data->participants) ? $data->participants : $row['participants'];
        $program_flow = isset($data->program_flow) ? $data->program_flow : $row['program_flow'];
        $additional_details = isset($data->additional_details) ? $data->additional_details : $row['additional_details'];
        $partners = isset($data->partners) ? $data->partners : $row['partners'];
        $banner = isset($data->banner) ? $data->banner : $row['banner'];
        $upload_files = isset($data->upload_files) ? $data->upload_files : $row['upload_files'];



        $update_query = "UPDATE `programs` SET program_title = :program_title, date_time_start = :date_time_start, date_time_end = :date_time_end, place = :place, program_details = :program_details,  program_lead = :program_lead,  program_members = :program_members,  participants = :participants,  program_flow = :program_flow,  additional_details = :additional_details, partners = :partners,  banner = :banner,  upload_files = :upload_files
        WHERE id = :id";

        $update_stmt = $conn->prepare($update_query);

        $update_stmt->bindValue(':program_title', htmlspecialchars(strip_tags($program_title)), PDO::PARAM_STR);
        $update_stmt->bindValue(':date_time_start', htmlspecialchars(strip_tags($date_time_start)), PDO::PARAM_STR);
        $update_stmt->bindValue(':date_time_end', htmlspecialchars(strip_tags($date_time_end)), PDO::PARAM_STR);
        $update_stmt->bindValue(':place', htmlspecialchars(strip_tags($place)), PDO::PARAM_STR);
        $update_stmt->bindValue(':program_details', htmlspecialchars(strip_tags($program_details)), PDO::PARAM_STR);
        $update_stmt->bindValue(':program_lead', htmlspecialchars(strip_tags($program_lead)), PDO::PARAM_STR);
        $update_stmt->bindValue(':program_members', htmlspecialchars(strip_tags($program_members)), PDO::PARAM_STR);
        $update_stmt->bindValue(':participants', htmlspecialchars(strip_tags($participants)), PDO::PARAM_STR);
        $update_stmt->bindValue(':program_flow', htmlspecialchars(strip_tags($program_flow)), PDO::PARAM_STR);
        $update_stmt->bindValue(':additional_details', htmlspecialchars(strip_tags($additional_details)), PDO::PARAM_STR);
        $update_stmt->bindValue(':partners', htmlspecialchars(strip_tags($partners)), PDO::PARAM_STR);
        $update_stmt->bindValue(':banner', htmlspecialchars(strip_tags($banner)), PDO::PARAM_STR);
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
