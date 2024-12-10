<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the request path
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/api/', '', $path);

// Basic routing
switch ($path) {
    case 'health':
        echo json_encode(['status' => 'ok']);
        break;
        
    case 'auth/register':
        handleRegister();
        break;
        
    case 'auth/login':
        handleLogin();
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
}

function handleRegister() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    
    // Add your registration logic here
    echo json_encode([
        'status' => 'success',
        'message' => 'Registration endpoint'
    ]);
}

function handleLogin() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    
    // Add your login logic here
    echo json_encode([
        'status' => 'success',
        'message' => 'Login endpoint'
    ]);
}
?> 