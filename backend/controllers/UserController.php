<?php
include_once '../config/database.php';
include_once '../models/User.php';

class UserController {
    private $db;
    private $user;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->user = new User($this->db);
    }

    public function register() {
        $data = json_decode(file_get_contents("php://input"));

        $this->user->username = $data->username;
        $this->user->email = $data->email;
        $this->user->password = $data->password;

        if ($this->user->register()) {
            echo json_encode(array("message" => "User registered successfully."));
        } else {
            echo json_encode(array("message" => "Unable to register user."));
        }
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"));

        $this->user->email = $data->email;
        $this->user->password = $data->password;

        $user = $this->user->login();

        if ($user) {
            echo json_encode(array("message" => "Login successful.", "user" => $user));
        } else {
            echo json_encode(array("message" => "Invalid email or password."));
        }
    }

    public function updateProfile() {
        $data = json_decode(file_get_contents("php://input"));

        $this->user->id = $data->id;
        $this->user->height = $data->height;
        $this->user->weight = $data->weight;
        $this->user->daily_activity = $data->daily_activity;
        $this->user->age = $data->age;
        $this->user->goal = $data->goal;

        if ($this->user->updateProfile()) {
            echo json_encode(array("message" => "Profile updated successfully."));
        } else {
            echo json_encode(array("message" => "Unable to update profile."));
        }
    }
}
?>