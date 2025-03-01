<?php
class User {
    private $conn;
    private $table = 'users';

    public $id;
    public $username;
    public $email;
    public $password;
    public $height;
    public $weight;
    public $daily_activity;
    public $age;
    public $goal;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function register() {
        $query = "INSERT INTO " . $this->table . " (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $this->conn->prepare($query);

        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function login() {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);

        $this->email = htmlspecialchars(strip_tags($this->email));
        $stmt->bindParam(':email', $this->email);

        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($this->password, $user['password'])) {
            return $user;
        }
        return false;
    }

    public function updateProfile() {
        $query = "UPDATE " . $this->table . " SET height = :height, weight = :weight, daily_activity = :daily_activity, age = :age, goal = :goal WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $this->height = htmlspecialchars(strip_tags($this->height));
        $this->weight = htmlspecialchars(strip_tags($this->weight));
        $this->daily_activity = htmlspecialchars(strip_tags($this->daily_activity));
        $this->age = htmlspecialchars(strip_tags($this->age));
        $this->goal = htmlspecialchars(strip_tags($this->goal));

        $stmt->bindParam(':height', $this->height);
        $stmt->bindParam(':weight', $this->weight);
        $stmt->bindParam(':daily_activity', $this->daily_activity);
        $stmt->bindParam(':age', $this->age);
        $stmt->bindParam(':goal', $this->goal);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>