<?php
header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['eventNumber'], $data['message'], $data['timestamp'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$file = 'events.json';

if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$events = json_decode(file_get_contents($file), true);

$events[] = [
    'eventNumber' => $data['eventNumber'],
    'message' => $data['message'],
    'timestamp' => $data['timestamp'],
    'savedAt' => date('Y-m-d H:i:s')
];

if (file_put_contents($file, json_encode($events, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save event']);
}
?>
