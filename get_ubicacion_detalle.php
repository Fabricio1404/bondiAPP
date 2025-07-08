<?php
// get_ubicacion_detalle.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier origen (ajustar en producción)

// Incluir el archivo de conexión a la base de datos
require_once 'conexion.php'; // Asegúrate de que la ruta sea correcta

// Obtener el ID de la ubicación de la solicitud GET
$id_ubicacion = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id_ubicacion === 0) {
    // Cerrar la conexión antes de salir
    $conn->close();
    die(json_encode(["error" => "ID de ubicación no proporcionado o inválido."]));
}

// Consulta para obtener los detalles de una ubicación específica
$sql = "SELECT nombre, latitud, longitud FROM ubicaciones WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    // Manejo de error si la preparación de la consulta falla
    $conn->close();
    die(json_encode(["error" => "Error al preparar la consulta: " . $conn->error]));
}

$stmt->bind_param("i", $id_ubicacion);
$stmt->execute();
$result = $stmt->get_result();

$ubicacion_detalle = null; // Inicializar a null
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $ubicacion_detalle = [
        "nombre" => $row["nombre"],
        "latitud" => (float)$row["latitud"], // Asegurarse de que sean números
        "longitud" => (float)$row["longitud"]
    ];
}

$stmt->close();
$conn->close();

echo json_encode($ubicacion_detalle);
?>