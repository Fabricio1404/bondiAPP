<?php
// conexion.php

// Configuración de la base de datos
$servername = "localhost";
$username = "root"; // ¡REEMPLAZA CON TU USUARIO DE DB!
$password = ""; // ¡REEMPLAZA CON TU CONTRASEÑA DE DB!
$dbname = "bondi_app"; // Asegúrate que sea el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    // En un entorno de producción, es mejor no exponer el error directamente al usuario.
    // En su lugar, podrías loguearlo y mostrar un mensaje genérico.
    die(json_encode(["error" => "Error de conexión a la base de datos: " . $conn->connect_error]));
}

// Opcional: Establecer el conjunto de caracteres a UTF-8 para evitar problemas con acentos y ñ
$conn->set_charset("utf8mb4");

// La conexión ($conn) ahora está disponible para ser usada en otros scripts
?>