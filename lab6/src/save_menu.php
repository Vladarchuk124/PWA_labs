<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $filePath = __DIR__ . '/page2/menu_data.json';

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "Помилка декодування JSON: " . json_last_error_msg();
        exit;
    }

    if (file_put_contents($filePath, json_encode($input, JSON_PRETTY_PRINT))) {
        echo "Меню успішно збережено!";
    } else {
        echo "Не вдалося зберегти меню.";
    }
} else {
    echo "Неправильний метод запиту.";
}
?>
