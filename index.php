<?php
// index.php
// Este archivo carga la interfaz de usuario y las ubicaciones iniciales desde la base de datos.

// Incluir el archivo de conexión a la base de datos
require_once 'conexion.php'; // Asegúrate de que la ruta sea correcta

// Consultar la base de datos para obtener todas las ubicaciones
$sql = "SELECT id, nombre FROM ubicaciones ORDER BY nombre ASC";
$result = $conn->query($sql);

$ubicaciones = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $ubicaciones[] = $row;
    }
}

// Cerrar la conexión a la base de datos una vez que se han obtenido los datos
$conn->close();

// Tu clave de API de Google Maps
$google_maps_api_key = 'AIzaSyDttdjxfI1wMks1Zjnir11fNUUneh2VRFE'; // ¡Tu clave de API!

// El ID de mapa de tu estilo personalizado en la nube de Google Maps
// ¡REEMPLAZA ESTO CON EL ID QUE GENERES EN LA CONSOLA DE GOOGLE CLOUD!
$cloud_map_id = 'YOUR_CLOUD_MAP_ID_HERE';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bondi App - Ubicaciones en Mapa</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f2f5;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        #map {
            height: 600px; /* Altura fija para el mapa, ajusta según necesidad */
            width: 100%;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .container {
            max-width: 900px;
            margin: 2rem auto;
            padding: 1.5rem;
            background-color: #ffffff;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            font-size: 1.5rem;
            color: #333;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800">

    <div class="loading-overlay" id="loadingOverlay">
        Cargando mapa y servicios...
    </div>

    <header class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container flex justify-between items-center">
            <h1 class="text-2xl font-bold">Bondi App - Ubicaciones</h1>
            <nav>
                <a href="#" class="text-white hover:text-blue-200 mx-2">Inicio</a>
                <a href="#" class="text-white hover:text-blue-200 mx-2">Mi Cuenta</a>
                <a href="#" class="text-white hover:text-blue-200 mx-2">Acerca de</a>
            </nav>
        </div>
    </header>

    <main class="flex-grow container p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Selecciona una Ubicación</h2>

        <div class="mb-6">
            <label for="ubicacion-select" class="block text-gray-700 text-sm font-bold mb-2">
                Ubicación:
            </label>
            <select id="ubicacion-select" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">-- Selecciona una ubicación --</option>
                <?php
                // Generar las opciones del desplegable usando los datos obtenidos de PHP
                if (!empty($ubicaciones)) {
                    foreach ($ubicaciones as $ubicacion) {
                        echo '<option value="' . htmlspecialchars($ubicacion['id']) . '">' . htmlspecialchars($ubicacion['nombre']) . '</option>';
                    }
                } else {
                    echo '<option value="">No se encontraron ubicaciones</option>';
                }
                ?>
            </select>
        </div>

        <div id="map"></div>

        <div id="ubicacion-info" class="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800 hidden">
            <p class="font-semibold">Nombre: <span id="info-nombre"></span></p>
            <p>Latitud: <span id="info-latitud"></span></p>
            <p>Longitud: <span id="info-longitud"></span></p>
        </div>
    </main>

    <footer class="bg-gray-800 text-white p-4 text-center mt-auto shadow-inner">
        <p>&copy; 2024 Bondi App. Todos los derechos reservados.</p>
    </footer>

    <script>
        let map;
        let currentMarker; // Para mantener una referencia al marcador actual

        // Coordenadas iniciales para Formosa Capital (aproximadas)
        const FORMOSA_CENTER = { lat: -26.1785, lng: -58.1732 };
        const INITIAL_ZOOM = 13; // Zoom inicial para ver la ciudad

        // Función para inicializar el mapa
        function initMap() {
            console.log("initMap se ha ejecutado. Intentando crear el mapa...");
            try {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: FORMOSA_CENTER,
                    zoom: INITIAL_ZOOM,
                    mapId: '<?php echo $cloud_map_id; ?>' // Aquí se usa el ID de mapa de la nube
                });
                console.log("Mapa creado exitosamente.");

                // Ocultar el overlay de carga una vez que el mapa esté listo
                document.getElementById('loadingOverlay').style.display = 'none';

                // No necesitamos llamar a cargarUbicacionesEnDesplegable() aquí
                // porque PHP ya generó las opciones en el HTML.
                // Sin embargo, si quieres que la primera opción se seleccione automáticamente,
                // puedes agregar lógica aquí para disparar el evento 'change'
                // o cargar la primera ubicación si la hay.
            } catch (error) {
                console.error("Error al inicializar el mapa:", error);
                document.getElementById('loadingOverlay').textContent = "Error al cargar el mapa. Revisa la consola.";
            }
        }

        // Esta función ahora solo es un placeholder ya que PHP ya carga las opciones.
        // Se mantiene para claridad o si decides volver a cargar dinámicamente.
        function cargarUbicacionesEnDesplegable() {
            console.log("Las ubicaciones ya fueron cargadas por PHP.");
            // Si la primera opción es válida, podrías seleccionarla y mostrarla
            // const selectElement = document.getElementById('ubicacion-select');
            // if (selectElement.options.length > 1 && selectElement.options[1].value) {
            //     selectElement.value = selectElement.options[1].value;
            //     mostrarUbicacionEnMapa(selectElement.options[1].value);
            // }
        }


        // Función para mostrar la ubicación seleccionada en el mapa
        async function mostrarUbicacionEnMapa(idUbicacion) {
            if (!idUbicacion) {
                // Si no hay ID seleccionado, limpiar mapa y ocultar info
                if (currentMarker) {
                    currentMarker.setMap(null);
                }
                map.setCenter(FORMOSA_CENTER);
                map.setZoom(INITIAL_ZOOM);
                document.getElementById('ubicacion-info').classList.add('hidden');
                return;
            }

            try {
                // Si get_ubicacion_detalle.php está en la misma carpeta que index.php, la ruta relativa es suficiente.
                const response = await fetch(`get_ubicacion_detalle.php?id=${idUbicacion}`);
                if (!response.ok) { // Manejo de errores HTTP
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const ubicacion = await response.json();

                if (ubicacion && ubicacion.latitud && ubicacion.longitud) {
                    const position = { lat: ubicacion.latitud, lng: ubicacion.longitud };

                    // Eliminar marcador anterior si existe
                    if (currentMarker) {
                        currentMarker.setMap(null);
                    }

                    // Crear nuevo marcador
                    currentMarker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: ubicacion.nombre,
                        animation: google.maps.Animation.DROP // Efecto de caída al aparecer
                    });

                    // Centrar el mapa en la ubicación y ajustar el zoom
                    map.setCenter(position);
                    map.setZoom(16); // Un zoom más cercano para ver la ubicación en detalle

                    // Mostrar información de la ubicación
                    document.getElementById('info-nombre').textContent = ubicacion.nombre;
                    document.getElementById('info-latitud').textContent = ubicacion.latitud;
                    document.getElementById('info-longitud').textContent = ubicacion.longitud;
                    document.getElementById('ubicacion-info').classList.remove('hidden');

                } else {
                    alert('No se encontraron datos para la ubicación seleccionada.');
                    document.getElementById('ubicacion-info').classList.add('hidden');
                }
            } catch (error) {
                console.error('Error al obtener detalle de ubicación:', error);
                alert('Error al conectar con el servidor para obtener los detalles de la ubicación.');
                document.getElementById('ubicacion-info').classList.add('hidden');
            }
        }

        // Event Listener para el cambio en el desplegable
        document.addEventListener('DOMContentLoaded', () => {
            const selectElement = document.getElementById('ubicacion-select');
            selectElement.addEventListener('change', (event) => {
                const selectedUbicacionId = event.target.value;
                mostrarUbicacionEnMapa(selectedUbicacionId);
            });
        });
    </script>
    <!-- Carga asíncrona de la API de Google Maps -->
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=<?php echo $google_maps_api_key; ?>&callback=initMap"></script>
</body>
</html>