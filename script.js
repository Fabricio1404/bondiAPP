document.addEventListener('DOMContentLoaded', function() {
    // --- DATOS DE LÍNEAS Y PARADAS ACTUALIZADOS PARA FORMOSA ---
    const formosaCoords = [-26.183000, -58.188000]; // Coordenadas aproximadas del Centro (Plaza San Martín)

    const lineas = [
        {
            nombre: "Línea A",
            barrios: [
                "Nueva Pompeya", "Villa del Carmen", "Aeropuerto", "Cruz del Norte",
                "Universidad", "Terminal de Ómnibus", "Cementerio", "Centro (Plaza San Martín)",
                "Moreno y Fotheringham", "Av. 25 de Mayo y Julio A Roca", "Av. Gutnisky Acceso Sur"
            ],
            geojson: [ // Usamos 'geojson' para las rutas GeoJSON
                { path: 'geojson/linea_A_ida.geojson', color: 'orange' }, // Ruta a tu archivo GeoJSON de ida
                { path: 'geojson/linea_A_vuelta.geojson', color: 'red' } // Ruta a tu archivo GeoJSON de vuelta
            ],
            comments: []
        },
        {
            nombre: "Línea B",
            barrios: ["Libertad", "8 de Octubre", "Circuito Cinco", "Centro"],
            geojson: [], // Añade tus rutas GeoJSON aquí si tienes para la Línea B
            comments: []
        },
        {
            nombre: "Línea C",
            barrios: ["Nam Qom", "San Antonio", "Centro", "Plaza San Martín"],
            geojson: [ // ¡MODIFICA ESTO PARA LA LÍNEA C!
                { path: 'geojson/linea_C_ida.geojson', color: '#FFFF00' }, // Amarillo para la ida (sin cambios)
                { path: 'geojson/linea_C_vuelta.geojson', color: '#A0522D' } // ¡Marrón más oscuro para la vuelta!
            ],
            comments: []
        },
        {
            nombre: "Línea D",
            barrios: ["San Francisco", "La Floresta", "Don Bosco", "Centro"],
            geojson: [ // ¡AÑADIDO PARA LÍNEA D!
                { path: 'geojson/linea_D_ida.geojson', color: '#a61c5f' }, // Color para la ida de Línea D
                { path: 'geojson/linea_D_vuelta.geojson', color: '#e03a7a' } // Color para la vuelta de Línea D
            ],
            comments: []
        },
        {
            nombre: "Línea E",
            barrios: ["Eva Perón", "Juan Manuel de Rosas", "Los Lapachos", "Centro"],
            geojson: [], // Añade tus rutas GeoJSON aquí si tienes para la Línea E
            comments: []
        },
        {
            nombre: "Línea F",
            barrios: ["San Martín", "Villa Hermosa", "Colón", "Centro"],
            geojson: [], // Añade tus rutas GeoJSON aquí si tienes para la Línea F
            comments: []
        },
        {
            nombre: "Línea G",
            barrios: ["Laureles", "Venezuela", "Fleming", "Centro"],
            geojson: [], // Añade tus rutas GeoJSON aquí si tienes para la Línea G
            comments: []
        },
        {
            nombre: "Línea H",
            barrios: ["Facetas", "El Resguardo", "San Juan", "Centro"],
            geojson: [], // Añade tus rutas GeoJSON aquí si tienes para la Línea H
            comments: []
        },
        {
            nombre: "Línea I",
            barrios: ["República Argentina", "El Palomar", "12 de Octubre", "Centro"],
            geojson: [], // Añade tus rutas GeoJSON aquí si tienes para la Línea I
            comments: []
        }
    ];

    // --- Referencias a Elementos del DOM ---
    const navToggle = document.getElementById('nav-toggle');
    const navContent = document.getElementById('nav-content');
    const searchRouteBtn = document.getElementById('search-route-btn');
    const currentLocationInput = document.getElementById('current-location');
    const destinationInput = document.getElementById('destination');
    const searchResultsDiv = document.getElementById('search-results');
    const showAllRoutesBtn = document.getElementById('show-all-routes-btn');
    const allRoutesMapDiv = document.getElementById('all-routes-map');
    const lineCards = document.querySelectorAll('.line-card'); // Selecciona todas las tarjetas de línea
    const lineListContainer = document.getElementById('line-list-container');
    const lineDetailContainer = document.getElementById('line-detail-container');
    const detailLineName = document.getElementById('detail-line-name');
    const detailNeighborhoods = document.getElementById('detail-neighborhoods');
    const leafletLineMapDiv = document.getElementById('leaflet-line-map');
    const backToLinesBtn = document.getElementById('back-to-lines');
    // Nuevos elementos para la sección de comentarios
    const commentForm = document.getElementById('comment-form');
    const commentNameInput = document.getElementById('comment-name');
    const commentTextInput = document.getElementById('comment-text');
    const commentsListDiv = document.getElementById('comments-list');

    let mainMap; // Variable para el mapa general de todas las rutas
    let detailMap; // Variable para el mapa de detalle de una sola línea
    let currentLineSelected = null; // Para saber qué línea está actualmente en detalle

    // --- Funciones de Navegación ---
    navToggle.addEventListener('click', function () {
        navContent.classList.toggle('hidden'); // Oculta/muestra el menú de navegación en móvil
    });

    // --- Funcionalidad del Buscador de Rutas ---
    searchRouteBtn.addEventListener('click', function() {
        const origen = currentLocationInput.value.trim().toLowerCase();
        const destino = destinationInput.value.trim().toLowerCase();
        let resultadosHtml = '';

        if (origen === '' || destino === '') {
            searchResultsDiv.innerHTML = '<p class="text-red-500 text-center">Por favor, ingresa tu ubicación actual y tu destino.</p>';
            return;
        }

        let rutasEncontradas = [];

        // Lógica de búsqueda: busca líneas que pasen por el origen Y el destino.
        lineas.forEach(linea => {
            // Verificamos si algún barrio de la línea contiene palabras del origen/destino
            const pasaPorOrigen = linea.barrios.some(b => origen.split(' ').some(word => b.toLowerCase().includes(word)));
            const pasaPorDestino = linea.barrios.some(b => destino.split(' ').some(word => b.toLowerCase().includes(word)));

            if (pasaPorOrigen && pasaPorDestino) {
                rutasEncontradas.push({
                    linea: linea.nombre,
                    tipo: 'directa',
                    barriosOrigen: linea.barrios.filter(b => origen.split(' ').some(word => b.toLowerCase().includes(word))),
                    barriosDestino: linea.barrios.filter(b => destino.split(' ').some(word => b.toLowerCase().includes(word))),
                    // Asegúrate de que 'paradas' exista en tu objeto 'linea' si lo usas aquí
                    // paradas: linea.paradas
                });
            }
        });

        if (rutasEncontradas.length > 0) {
            resultadosHtml += '<h4 class="text-xl font-semibold mb-3 text-gray-900">Rutas directas encontradas</h4>';
            rutasEncontradas.forEach(ruta => {
                resultadosHtml += `
                    <div class="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                        <p class="font-bold">Línea <span class="text-indigo-600">${ruta.linea}</span></p>
                        <p>Barrios que cubren tu origen: <span class="font-medium">${ruta.barriosOrigen.join(', ')}</span></p>
                        <p>Barrios que cubren tu destino: <span class="font-medium">${ruta.barriosDestino.join(', ')}</span></p>
                        ${ruta.paradas ? `<p class="text-sm text-gray-600 mt-2">Algunas paradas: ${ruta.paradas.map(p => p.name).slice(0, 3).join(', ')}...</p>` : ''}
                    </div>
                `;
            });
        } else {
            resultadosHtml = '<p class="text-gray-600 text-center">No se encontraron rutas directas.<br>Por favor, verifica los nombres o intenta con ubicaciones más generales.<br>(La funcionalidad de combinaciones de líneas no está implementada en esta versión de demostración).</p>';
        }

        searchResultsDiv.innerHTML = resultadosHtml;
    });

    // --- Funcionalidad del Mapa General de Todas las Rutas y Paradas (Leaflet) ---
    showAllRoutesBtn.addEventListener('click', function() {
        if (allRoutesMapDiv.classList.contains('hidden')) {
            allRoutesMapDiv.classList.remove('hidden'); // Hace visible el contenedor del mapa

            if (!mainMap) { // Si el mapa no ha sido inicializado, créalo
                mainMap = L.map('all-routes-map').setView(formosaCoords, 13); // Centra el mapa en Formosa

                // Agrega la capa base de OpenStreetMap
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mainMap);

                // Dibuja todas las rutas GeoJSON
                lineas.forEach(linea => {
                    if (linea.geojson && Array.isArray(linea.geojson) && linea.geojson.length > 0) {
                        linea.geojson.forEach(geojsonInfo => {
                            fetch(geojsonInfo.path)
                                .then(res => {
                                    if (!res.ok) {
                                        throw new Error(`HTTP error! status: ${res.status} - ${geojsonInfo.path}`);
                                    }
                                    return res.json(); // Esperamos JSON
                                })
                                .then(geojsonData => {
                                    const layer = L.geoJSON(geojsonData, {
                                        style: {
                                            color: geojsonInfo.color || '#3388ff', // Usar el color definido o un default
                                            weight: 3,
                                            opacity: 0.7
                                        }
                                    }).addTo(mainMap);
                                    // No es necesario L.KML aquí, ya es L.geoJSON

                                    layer.bindPopup(`<b>${linea.nombre}</b> (${geojsonInfo.path.includes('ida') ? 'Ida' : 'Vuelta'})`);

                                    // Para ajustar el mapa a todas las rutas, necesitarías acumular los bounds
                                    // de todas las capas GeoJSON que se añaden.
                                    // Esto se gestiona mejor con un array de capas y luego un fitBounds global.
                                    // Por ahora, solo las añade.
                                })
                                .catch(error => console.error(`Error cargando GeoJSON para ${linea.nombre} en el mapa general (${geojsonInfo.path}):`, error));
                        });
                    }
                    // // Añade marcadores para cada parada de la línea (si existen) - si tienes esta data en 'lineas'
                    // if (linea.paradas) {
                    //     linea.paradas.forEach(parada => {
                    //         const marker = L.marker(parada.coords).addTo(mainMap);
                    //         marker.bindPopup(`<b>${parada.name}</b><br>Línea ${linea.nombre}`);
                    //     });
                    // }
                });

            } else {
                mainMap.invalidateSize();
            }
            allRoutesMapDiv.scrollIntoView({ behavior: 'smooth' });
            showAllRoutesBtn.textContent = 'Ocultar Mapa General';
        } else {
            allRoutesMapDiv.classList.add('hidden');
            showAllRoutesBtn.textContent = 'Mostrar Mapa de Todas las Rutas y Paradas';
            // Opcional: si quieres que el mapa se reinicie cada vez que se oculta
            // if (mainMap) {
            //     mainMap.remove();
            //     mainMap = null;
            // }
        }
    });

    // --- Funcionalidad de Detalle por Línea (con mapa Leaflet individual y comentarios) ---
    lineCards.forEach(card => {
        card.addEventListener('click', function() {
            const lineName = this.dataset.line; // Ej. "A", "B", etc.
            currentLineSelected = lineas.find(line => line.nombre.endsWith(lineName)); // Encuentra el objeto de línea completo

            if (currentLineSelected) {
                detailLineName.textContent = `Detalles de ${currentLineSelected.nombre}`;
                detailNeighborhoods.innerHTML = '';
                currentLineSelected.barrios.forEach(barrio => {
                    const li = document.createElement('li');
                    li.textContent = barrio;
                    detailNeighborhoods.appendChild(li);
                });

                leafletLineMapDiv.classList.remove('hidden');

                if (detailMap) {
                    detailMap.remove();
                }
                detailMap = L.map('leaflet-line-map').setView(formosaCoords, 13); // Centrado inicial

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(detailMap);

                let allLayersBounds = L.latLngBounds([]); // Para calcular los límites de todas las capas GeoJSON/marcadores

                // Cargar y mostrar la(s) ruta(s) de la línea seleccionada (GeoJSON)
                if (currentLineSelected.geojson && Array.isArray(currentLineSelected.geojson) && currentLineSelected.geojson.length > 0) {
                    let loadedGeojsonCount = 0; // Para saber cuándo todas las capas GeoJSON se han cargado
                    currentLineSelected.geojson.forEach(geojsonInfo => {
                        fetch(geojsonInfo.path)
                            .then(res => {
                                if (!res.ok) {
                                    throw new Error(`HTTP error! status: ${res.status} - ${geojsonInfo.path}`);
                                }
                                return res.json(); // Esperamos JSON
                            })
                            .then(geojsonData => {
                                const layer = L.geoJSON(geojsonData, {
                                    style: {
                                        color: geojsonInfo.color || '#3388ff', // Usar el color definido o un default
                                        weight: 6,
                                        opacity: 0.8
                                    }
                                }).addTo(detailMap);

                                layer.bindPopup(`<b>${currentLineSelected.nombre}</b> (${geojsonInfo.path.includes('ida') ? 'Ida' : 'Vuelta'})`);

                                if (layer.getBounds().isValid()) {
                                    allLayersBounds.extend(layer.getBounds());
                                }
                                loadedGeojsonCount++;

                                // Ajustar el mapa solo después de que todas las capas GeoJSON estén cargadas
                                if (loadedGeojsonCount === currentLineSelected.geojson.length) {
                                    if (allLayersBounds.isValid()) {
                                        detailMap.fitBounds(allLayersBounds, { padding: [50, 50] });
                                    }
                                }
                            })
                            .catch(error => console.error(`Error cargando GeoJSON para la línea ${currentLineSelected.nombre} (${geojsonInfo.path}):`, error));
                    });
                } else if (currentLineSelected.coords && currentLineSelected.coords.length > 1) { // Fallback si hay coords directas
                    const polyline = L.polyline(currentLineSelected.coords, {
                        color: '#4f46e5',
                        weight: 6,
                        opacity: 0.8
                    }).addTo(detailMap);
                    polyline.bindPopup(`<b>${currentLineSelected.nombre}</b>`);
                    allLayersBounds.extend(polyline.getBounds());
                    detailMap.fitBounds(allLayersBounds);
                } else {
                    detailMap.setView(formosaCoords, 13);
                    L.marker(formosaCoords).addTo(detailMap).bindPopup('No hay datos de ruta detallados para esta línea.').openPopup();
                }

                // Añade marcadores para cada parada de la línea (si existen en el objeto 'lineas')
                if (currentLineSelected.paradas) { // Asume que 'paradas' es una propiedad dentro de cada objeto de línea
                    currentLineSelected.paradas.forEach(parada => {
                        const marker = L.marker(parada.coords).addTo(detailMap);
                        marker.bindPopup(`<b>${parada.name}</b>`);
                        if (marker.getLatLng()) { // Asegúrate de que el marcador tiene latlng válido
                            allLayersBounds.extend(marker.getLatLng());
                        }
                    });
                }

                // Un ajuste final de fitBounds después de añadir los marcadores, por si acaso
                // y para líneas sin GeoJSON que solo tienen paradas.
                // Esto es importante porque la carga de GeoJSON es asíncrona.
                // Solo llama fitBounds si no hay GeoJSON pendientes de cargar,
                // o si ya se cargaron todos los GeoJSON y aún no se hizo fitBounds.
                if (!currentLineSelected.geojson || currentLineSelected.geojson.length === 0) {
                    if (allLayersBounds.isValid()) {
                        detailMap.fitBounds(allLayersBounds, { padding: [50, 50] });
                    } else {
                        // Si no hay bounds válidos (ej. solo 1 parada), centrar en esa parada o en Formosa
                        if (currentLineSelected.paradas && currentLineSelected.paradas.length > 0) {
                            detailMap.setView(currentLineSelected.paradas[0].coords, 15); // Zoom a la primera parada
                        } else {
                            detailMap.setView(formosaCoords, 13); // Centrar en Formosa
                        }
                    }
                }

                loadComments(currentLineSelected.comments);
                lineListContainer.classList.add('hidden');
                lineDetailContainer.classList.remove('hidden');
                lineDetailContainer.scrollIntoView({ behavior: 'smooth' });

                detailMap.invalidateSize(); // Asegura que el mapa se renderice correctamente
            }
        });
    });

    // Función para cargar y mostrar los comentarios
    function loadComments(commentsArray) {
        commentsListDiv.innerHTML = '';
        if (commentsArray.length === 0) {
            commentsListDiv.innerHTML = '<p class="text-gray-600 text-center">No hay comentarios aún para esta línea.</p>';
            return;
        }

        commentsArray.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('mb-4', 'p-4', 'bg-white', 'rounded-lg', 'shadow-sm', 'border', 'border-gray-200');
            commentElement.innerHTML = `
                <p class="font-bold text-gray-800">${comment.name}</p>
                <p class="text-gray-700 mt-1">${comment.text}</p>
                <p class="text-gray-500 text-sm mt-2">${new Date(comment.timestamp).toLocaleString()}</p>
            `;
            commentsListDiv.appendChild(commentElement);
        });
    }

    // Manejar el envío del formulario de comentarios
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = commentNameInput.value.trim();
        const text = commentTextInput.value.trim();

        if (name === '' || text === '') {
            alert('Por favor, ingresa tu nombre y tu comentario.');
            return;
        }

        if (currentLineSelected) {
            const newComment = {
                name: name,
                text: text,
                timestamp: new Date().toISOString()
            };
            currentLineSelected.comments.push(newComment);

            loadComments(currentLineSelected.comments);

            commentNameInput.value = '';
            commentTextInput.value = '';
        }
    });

    // Botón para volver de la vista de detalle de línea a la lista de líneas
    backToLinesBtn.addEventListener('click', function() {
        lineDetailContainer.classList.add('hidden');
        lineListContainer.classList.remove('hidden');
        if (detailMap) {
            detailMap.remove();
            detailMap = null;
        }
        currentLineSelected = null;
    });

    // --- Controladores para la Navegación Rápida/Secundaria ---
    document.getElementById('nav-lineas').addEventListener('click', function(e) {
        e.preventDefault();
        lineListContainer.classList.remove('hidden');
        lineDetailContainer.classList.add('hidden');
        currentLineSelected = null;
        lineListContainer.scrollIntoView({ behavior: 'smooth' });
        if (mainMap && !allRoutesMapDiv.classList.contains('hidden')) { // Si el mapa general está visible, lo oculta
            allRoutesMapDiv.classList.add('hidden');
        }
    });

    document.getElementById('nav-rutas-barrio').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('bondiapp-section').scrollIntoView({ behavior: 'smooth' });
        if (mainMap && !allRoutesMapDiv.classList.contains('hidden')) {
            allRoutesMapDiv.classList.add('hidden');
        }
        if (!lineDetailContainer.classList.contains('hidden')) {
            lineDetailContainer.classList.add('hidden');
            lineListContainer.classList.remove('hidden');
            currentLineSelected = null;
        }
    });

    document.getElementById('nav-mapa-paradas').addEventListener('click', function(e) {
        e.preventDefault();
        showAllRoutesBtn.click(); // Simula un clic en el botón de mostrar todas las rutas
        if (!lineDetailContainer.classList.contains('hidden')) {
            lineDetailContainer.classList.add('hidden');
            lineListContainer.classList.remove('hidden');
            currentLineSelected = null;
        }
    });
});