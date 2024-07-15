<?php

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.brevo.com/v3/smtp/email");
curl_setopt($ch, CURLOPT_POST, 1);

$name = $_POST['name'];
$subject = $_POST['subject'];
$email = $_POST['email'];
$message = $_POST['message'];

$html = "<h4>Contact - A Class Plumbing.</h4>";
$html = $html . "<p><b>Name: </b> ${name}</p>";
$html = $html . "<p><b>Subject: </b> ${subject}</p>";
$html = $html . "<p><b>Email: </b> ${email}</p>";
$html = $html . "<p><b>Message: </b> ${message}</p>";
$html = $html . "<br>";

$json = "{\n    \"sender\": {\n        \"name\": \”Name\”,\n        \"email\": \"info@domain.ca\"\n    },\n    \"to\": [\n        {\n            \"email\": \”to@domain.ca\",\n            \"name\": \”A Class Plumbing Admin\"\n        }\n    ],\n    \"subject\": \"New Contact Reuest\",\n    \"htmlContent\": \"${html}\"\n}";

curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt(
    $ch,
    CURLOPT_HTTPHEADER,
    array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($json),
        'accept: application/json',
        'api-key: api-key’
    )
);

$server_output = curl_exec($ch);

curl_close($ch);

$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "dbname";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO contacts (name, subject, email, message)
VALUES ('${name}', '${subject}', '${email}', '${message}')";

if ($conn->query($sql) === TRUE) {
    header("Location: success-contact.html");
    die();
} else {
    header("Location: fail.html");
    die();
}

$conn->close();

?>