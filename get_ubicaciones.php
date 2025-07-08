<?php
// get_ubicaciones.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier origen (ajustar en producción)

// Incluir el archivo de conexión a la base de datos
require_once 'conexion.php'; // Asegúrate de que la ruta sea correcta

// Consulta para obtener todas las ubicaciones
$sql = "SELECT id, nombre FROM ubicaciones ORDER BY nombre ASC";
$result = $conn->query($sql);

$ubicaciones = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $ubicaciones[] = $row;
    }
}

// Cerrar la conexión (opcional aquí si el script termina, pero buena práctica)
$conn->close();

echo json_encode($ubicaciones);
?>
