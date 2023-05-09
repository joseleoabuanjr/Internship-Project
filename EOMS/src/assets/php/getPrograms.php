<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR);
if ($_SERVER['REQUEST_METHOD'] !== 'GET') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Reqeust Detected! Only get method is allowed',
    ]);
    exit;
endif;

require 'connectdb.php';
$database = new Operations();
$conn = $database->dbConnection();
$id = null;

if (isset($_GET['id'])) {
  $id =  $_GET['id'];
    // $id = filter_var($_GET['id'], FILTER_VALIDATE_INT, [
    //     'options' => [
    //         'default' => 'all_program',
    //         'min_range' => 1
    //     ]
    // ]);
}

try {

  $sql = is_numeric($id) ? "SELECT * FROM `programs` WHERE id ='$id'" : "SELECT * FROM `programs`";


    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :

        $data = null;
        if (is_numeric($id)) {
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
          $item = $stmt->fetchAll(PDO::FETCH_ASSOC);
          foreach ($item as $row) {
              $program_title = $row["program_title"];
              $date_time_start = $row["date_time_start"];
              $date_time_end = $row["date_time_end"];
              $place = $row["place"];
              $program_details = $row["program_details"];
              $program_lead = $row["program_lead"];
              $program_members = $row["program_members"];
              $participants = $row["participants"];
              $program_flow = $row["program_flow"];
              $additional_details = $row["additional_details"];
              $partners = $row["partners"];
              $banner = base64_encode($row["image"]);
              $upload_files = $row["upload_files"];
              $id = $row["id"];
          }

          $data = array(
              "program_title" => $program_title,
              "description" => $description,
              "date_time_end" => $date_time_end,
              "place" => $place,
              "program_details" => $program_details,
              "program_lead" => $program_lead,
              "program_members" => $program_members,
              "participants" => $participants,
              "program_flow" => $program_flow,
              "additional_details" => $additional_details,
              "partners" => $partners,
              "banner" => $banner,
              "upload_files" => $upload_files,
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
