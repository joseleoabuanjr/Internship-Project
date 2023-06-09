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


if (!isset($data->program_title) || !isset($data->date_time_start) || !isset($data->date_time_end) || !isset($data->place) || !isset($data->program_details) || !isset($data->program_lead) || !isset($data->program_members) || !isset($data->participants) || !isset($data->program_flow) || !isset($data->additional_details) || !isset($data->partners) || !isset($data->banner) || !isset($data->upload_files)) :
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  Program Title, Date and Time: Start to End, Place, Program Details, Program Lead, Program Members, Participants, Program Flow, Additional Details, and Partners',
    ]);
    exit;
elseif (empty(trim($data->program_title)) || empty(trim($data->date_time_start)) || empty(trim($data->date_time_end)) || empty(trim($data->place)) || empty(trim($data->program_details)) || empty(trim($data->program_lead)) || empty(trim($data->program_members)) || empty(trim($data->participants)) || empty(trim($data->program_flow)) || empty(trim($data->additional_details)) || empty(trim($data->partners)) || empty(trim($data->banner)) || empty(trim($data->upload_files))) :
    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;
endif;
try {
    $program_title = $data->program_title;
    $date_time_start = $data->date_time_start;
    $date_time_end = $data->date_time_end;
    $place = $data->place;
    $program_details = $data->program_details;
    $program_lead = $data->program_lead;
    $program_members = $data->program_members;
    $participants = $data->participants;
    $program_flow = $data->program_flow;
    $additional_details = $data->additional_details;
    $partners = $data->partners;
    $banner = $data->banner;
    $upload_files = $data->upload_files;

    $query = "INSERT INTO `programs`(
    program_title,
    date_time_start,
    date_time_end,
    place,
    program_details,
    program_lead,
    program_members,
    participants,
    program_flow,
    additional_details,
    partners,
    banner,
    upload_files
    )
    VALUES(
    :program_title,
    :date_time_start,
    :date_time_end,
    :place,
    :program_details,
    :program_lead,
    :program_members,
    :participants,
    :program_flow,
    :additional_details,
    :partners,
    :banner,
    :upload_files
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':program_title', $program_title, PDO::PARAM_STR);
    $stmt->bindValue(':date_time_start', $date_time_start, PDO::PARAM_STR);
    $stmt->bindValue(':date_time_end', $date_time_end, PDO::PARAM_STR);
    $stmt->bindValue(':place', $place, PDO::PARAM_STR);
    $stmt->bindValue(':program_details', $program_details, PDO::PARAM_STR);
    $stmt->bindValue(':program_lead', $program_lead, PDO::PARAM_STR);
    $stmt->bindValue(':program_members', $program_members, PDO::PARAM_STR);
    $stmt->bindValue(':participants', $participants, PDO::PARAM_STR);
    $stmt->bindValue(':program_flow', $program_flow, PDO::PARAM_STR);
    $stmt->bindValue(':additional_details', $additional_details, PDO::PARAM_STR);
    $stmt->bindValue(':partners', $partners, PDO::PARAM_STR);
    $stmt->bindValue(':banner', $banner, PDO::PARAM_STR);
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
