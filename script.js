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
            kml_ida: 'rutas/ida.kml', // Path to KML file for ida
            kml_vuelta: 'rutas/vuelta.kml', // Path to KML file for vuelta
            paradas: [ // Combined unique stops for markers
                { name: "Rotonda Nueva Pompeya", coords: [-26.27438, -58.27452] },
                { name: "Rotonda Villa del Carmen", coords: [-26.25151, -58.25548] },
                { name: "Aeropuerto Internacional de Formosa", coords: [-26.2141, -58.23147] },
                { name: "Cruz del Norte", coords: [-26.1982, -58.21299] },
                { name: "Universidad Nacional de Formosa", coords: [-26.19365, -58.19955] },
                { name: "Terminal Omnibus", coords: [-26.19183, -58.19382] },
                { name: "Cementerio Nuestra Señora del Carmen", coords: [-26.18821, -58.1827] },
                { name: "Plaza San Martín", coords: [-26.18629, -58.17343] },
                { name: "Moreno y Fotheringham", coords: [-26.18711, -58.16585] },
                { name: "Av. 25 de Mayo y Julio A Roca", coords: [-26.18591, -58.17713] },
                { name: "AV. Gutnisky Acceso sur (La cruz)", coords: [-26.1971, -58.2117] }
            ],
            colors: {
                ida: '#007bff', // Azul brillante
                vuelta: '#dc3545' // Rojo brillante
            },
            comments: []
        },
        {
            nombre: "Línea B",
            barrios: ["Libertad", "8 de Octubre", "Circuito Cinco", "Centro"],
            coords: [ // Coordenadas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                [-26.155000, -58.195000], // Inicio (norte-oeste)
                [-26.165000, -58.185000], // Intermedio
                [-26.175000, -58.175000], // Cercano al centro
                [-26.183000, -58.188000], // Centro
                [-26.190000, -58.170000]  // Final (sur-este)
            ],
            paradas: [ // Paradas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                { name: "Parada Norte B", coords: [-26.155000, -58.195000] },
                { name: "Parada Intermedia B", coords: [-26.175000, -58.175000] },
                { name: "Centro B", coords: [-26.183000, -58.188000] }
            ],
            comments: []
        },
        {
            nombre: "Línea C",
            barrios: ["Nam Qom", "San Antonio", "Centro", "Plaza San Martín"],
            coords: [ // Coordenadas para dibujar la ruta de la Línea C
                [-26.200000, -58.165000], // Nam Qom
                [-26.195000, -58.170000], // Ruta 11
                [-26.190000, -58.175000], // Barrio San Antonio
                [-26.186000, -58.180000], // Av. 25 de Mayo
                [-26.183000, -58.188000], // Centro
                [-26.183500, -58.178500]  // Plaza San Martín
            ],
            paradas: [ // Paradas principales de la Línea C
                { name: "Nam Qom", coords: [-26.200000, -58.165000] },
                { name: "Barrio San Antonio", coords: [-26.190000, -58.175000] },
                { name: "Centro", coords: [-26.183000, -58.188000] },
                { name: "Plaza San Martín", coords: [-26.183500, -58.178500] }
            ],
            comments: []
        },
        {
            nombre: "Línea D",
            barrios: ["San Francisco", "La Floresta", "Don Bosco", "Centro"],
            coords: [ // Coordenadas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                [-26.170000, -58.150000], // Inicio (este)
                [-26.175000, -58.165000], // La Floresta
                [-26.180000, -58.175000], // Don Bosco
                [-26.183000, -58.188000], // Centro
                [-26.195000, -58.190000]  // Final (sur-oeste)
            ],
            paradas: [ // Paradas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                { name: "Parada Este D", coords: [-26.170000, -58.150000] },
                { name: "Parada Don Bosco D", coords: [-26.180000, -58.175000] },
                { name: "Centro D", coords: [-26.183000, -58.188000] }
            ],
            comments: []
        },
        {
            nombre: "Línea E",
            barrios: ["Eva Perón", "Juan Manuel de Rosas", "Los Lapachos", "Centro"],
            coords: [ // Coordenadas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                [-26.220000, -58.200000], // Inicio (sur-oeste)
                [-26.210000, -58.190000], // Juan Manuel de Rosas
                [-26.200000, -58.180000], // Los Lapachos
                [-26.183000, -58.188000], // Centro
                [-26.175000, -58.170000]  // Final (norte-este)
            ],
            paradas: [ // Paradas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                { name: "Parada Eva Perón E", coords: [-26.220000, -58.200000] },
                { name: "Parada Los Lapachos E", coords: [-26.200000, -58.180000] },
                { name: "Centro E", coords: [-26.183000, -58.188000] }
            ],
            comments: []
        },
        {
            nombre: "Línea F",
            barrios: ["San Martín", "Villa Hermosa", "Colón", "Centro"],
            coords: [ // Coordenadas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                [-26.180000, -58.160000], // Inicio (este)
                [-26.190000, -58.170000], // Villa Hermosa
                [-26.200000, -58.180000], // Colón
                [-26.183000, -58.188000], // Centro
                [-26.170000, -58.195000]  // Final (norte-oeste)
            ],
            paradas: [ // Paradas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                { name: "Parada San Martín F", coords: [-26.180000, -58.160000] },
                { name: "Parada Colón F", coords: [-26.200000, -58.180000] },
                { name: "Centro F", coords: [-26.183000, -58.188000] }
            ],
            comments: []
        },
        {
            nombre: "Línea G",
            barrios: ["Laureles", "Venezuela", "Fleming", "Centro"],
            coords: [ // Coordenadas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                [-26.160000, -58.220000], // Inicio (extremo oeste)
                [-26.170000, -58.210000], // Venezuela
                [-26.180000, -58.200000], // Fleming
                [-26.183000, -58.188000], // Centro
                [-26.190000, -58.175000]  // Final (sureste)
            ],
            paradas: [ // Paradas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                { name: "Parada Laureles G", coords: [-26.160000, -58.220000] },
                { name: "Parada Venezuela G", coords: [-26.170000, -58.210000] },
                { name: "Centro G", coords: [-26.183000, -58.188000] }
            ],
            comments: []
        },
        {
            nombre: "Línea H",
            barrios: ["Facetas", "El Resguardo", "San Juan", "Centro"],
            coords: [ // Coordenadas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                [-26.190000, -58.230000], // Inicio (sudoeste)
                [-26.185000, -58.220000], // El Resguardo
                [-26.180000, -58.210000], // San Juan
                [-26.183000, -58.188000], // Centro
                [-26.170000, -58.190000]  // Final (noreste)
            ],
            paradas: [ // Paradas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                { name: "Parada Facetas H", coords: [-26.190000, -58.230000] },
                { name: "Parada San Juan H", coords: [-26.180000, -58.210000] },
                { name: "Centro H", coords: [-26.183000, -58.188000] }
            ],
            comments: []
        },
        {
            nombre: "Línea I",
            barrios: ["República Argentina", "El Palomar", "12 de Octubre", "Centro"],
            coords: [ // Coordenadas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                [-26.170000, -58.170000], // Inicio (cercano al centro)
                [-26.160000, -58.175000], // República Argentina
                [-26.150000, -58.180000], // El Palomar
                [-26.140000, -58.185000], // 12 de Octubre
                [-26.183000, -58.188000]   // Centro (via un camino diferente)
            ],
            paradas: [ // Paradas de EJEMPLO - ¡REEMPLAZAR POR LAS REALES!
                { name: "Parada 12 de Octubre I", coords: [-26.140000, -58.185000] },
                { name: "Parada El Palomar I", coords: [-26.150000, -58.180000] },
                { name: "Centro I", coords: [-26.183000, -58.188000] }
            ],
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
                    tipo: "directa",
                    barriosOrigen: linea.barrios.filter(b => origen.split(' ').some(word => b.toLowerCase().includes(word))),
                    barriosDestino: linea.barrios.filter(b => destino.split(' ').some(word => b.toLowerCase().includes(word))),
                    paradas: linea.paradas
                });
            }
        });

        if (rutasEncontradas.length > 0) {
            resultadosHtml += '<h4 class="text-xl font-semibold mb-3 text-gray-900">Rutas directas encontradas:</h4>';
            rutasEncontradas.forEach(ruta => {
                resultadosHtml += `
                    <div class="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                        <p class="font-bold">Línea: <span class="text-indigo-600">${ruta.linea}</span></p>
                        <p>Barrios que cubren tu origen: <span class="font-medium">${ruta.barriosOrigen.join(', ')}</span></p>
                        <p>Barrios que cubren tu destino: <span class="font-medium">${ruta.barriosDestino.join(', ')}</span></p>
                        <p class="text-sm text-gray-600 mt-2">Algunas paradas: ${ruta.paradas.map(p => p.name).slice(0, 3).join(', ')}...</p>
                    </div>
                `;
            });
        } else {
            resultadosHtml = '<p class="text-gray-600 text-center">No se encontraron rutas directas. Por favor, verifica los nombres o intenta con ubicaciones más generales. (La funcionalidad de combinaciones de líneas no está implementada en esta versión de demostración).</p>';
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

                // Dibuja todas las rutas y añade los marcadores de paradas
                lineas.forEach(linea => {
                    if (linea.kml_ida && linea.kml_vuelta) {
                        // Cargar KML para Ida
                        fetch(linea.kml_ida)
                            .then(res => res.text())
                            .then(kmlText => {
                                const parser = new DOMParser();
                                const kml = parser.parseFromString(kmlText, 'text/xml');
                                const track = new L.KML(kml);
                                track.setStyle({ color: linea.colors.ida, weight: 5, opacity: 0.7 });
                                track.addTo(mainMap);
                                track.bindPopup(`<b>${linea.nombre} (Ida)</b>`);
                            })
                            .catch(error => console.error(`Error cargando KML de ida para ${linea.nombre} en el mapa general:`, error));

                        // Cargar KML para Vuelta
                        fetch(linea.kml_vuelta)
                            .then(res => res.text())
                            .then(kmlText => {
                                const parser = new DOMParser();
                                const kml = parser.parseFromString(kmlText, 'text/xml');
                                const track = new L.KML(kml);
                                track.setStyle({ color: linea.colors.vuelta, weight: 5, opacity: 0.7 });
                                track.addTo(mainMap);
                                track.bindPopup(`<b>${linea.nombre} (Vuelta)</b>`);
                            })
                            .catch(error => console.error(`Error cargando KML de vuelta para ${linea.nombre} en el mapa general:`, error));
                    } else if (linea.coords && linea.coords.length > 1) {
                        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                        const polyline = L.polyline(linea.coords, {
                            color: randomColor,
                            weight: 5,
                            opacity: 0.7
                        }).addTo(mainMap);
                        polyline.bindPopup(`<b>${linea.nombre}</b>`);
                    }

                    // Añade marcadores para cada parada de la línea (si existen)
                    if (linea.paradas) {
                        linea.paradas.forEach(parada => {
                            const marker = L.marker(parada.coords).addTo(mainMap);
                            marker.bindPopup(`<b>${parada.name}</b><br>Línea: ${linea.nombre}`);
                        });
                    }
                });
            } else {
                mainMap.invalidateSize();
            }
            allRoutesMapDiv.scrollIntoView({ behavior: 'smooth' });
        } else {
            allRoutesMapDiv.classList.add('hidden');
        }
    });

    // --- Funcionalidad de Detalle por Línea (con mapa Leaflet individual y comentarios) ---
    lineCards.forEach(card => {
        card.addEventListener('click', function() {
            const lineName = this.dataset.line;
            currentLineSelected = lineas.find(line => line.nombre.endsWith(lineName));

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

                let allLayersBounds = L.latLngBounds([]); // Para calcular los límites de todas las capas

                // Cargar y mostrar la(s) ruta(s) de la línea seleccionada
                if (currentLineSelected.kml_ida && currentLineSelected.kml_vuelta) {
                    // Ida (azul)
                    fetch(currentLineSelected.kml_ida)
                        .then(res => res.text())
                        .then(kmlText => {
                            const parser = new DOMParser();
                            const kml = parser.parseFromString(kmlText, 'text/xml');
                            const track = new L.KML(kml);
                            track.setStyle({ color: currentLineSelected.colors.ida, weight: 6, opacity: 0.8 });
                            track.addTo(detailMap);
                            track.bindPopup(`<b>${currentLineSelected.nombre} (Ida)</b>`);
                            allLayersBounds.extend(track.getBounds());
                            detailMap.fitBounds(allLayersBounds); // Ajustar el mapa
                        })
                        .catch(error => console.error('Error cargando KML de ida:', error));

                    // Vuelta (rojo)
                    fetch(currentLineSelected.kml_vuelta)
                        .then(res => res.text())
                        .then(kmlText => {
                            const parser = new DOMParser();
                            const kml = parser.parseFromString(kmlText, 'text/xml');
                            const track = new L.KML(kml);
                            track.setStyle({ color: currentLineSelected.colors.vuelta, weight: 6, opacity: 0.8 });
                            track.addTo(detailMap);
                            track.bindPopup(`<b>${currentLineSelected.nombre} (Vuelta)</b>`);
                            allLayersBounds.extend(track.getBounds());
                            detailMap.fitBounds(allLayersBounds); // Ajustar el mapa
                        })
                        .catch(error => console.error('Error cargando KML de vuelta:', error));

                } else if (currentLineSelected.coords && currentLineSelected.coords.length > 1) {
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
                    L.marker(formosaCoords).addTo(detailMap).bindPopup("No hay datos de ruta detallados para esta línea.").openPopup();
                }

                // Añade marcadores para cada parada de la línea (si existen)
                if (currentLineSelected.paradas) {
                    currentLineSelected.paradas.forEach(parada => {
                        const marker = L.marker(parada.coords).addTo(detailMap);
                        marker.bindPopup(`<b>${parada.name}</b>`);
                        allLayersBounds.extend(marker.getLatLng()); // Extender bounds con los marcadores
                    });
                    // Un ajuste final de fitBounds después de añadir los marcadores, por si acaso
                    // Esto es importante porque la carga de KML es asíncrona, pero los marcadores no.
                    if (allLayersBounds.isValid()) { // Asegurarse de que los límites sean válidos
                        detailMap.fitBounds(allLayersBounds);
                    } else {
                        // Si no hay bounds válidos (ej. solo 1 parada), centrar en esa parada o en Formosa
                        if (currentLineSelected.paradas.length > 0) {
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

                detailMap.invalidateSize();
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
        showAllRoutesBtn.click();
        if (!lineDetailContainer.classList.contains('hidden')) {
            lineDetailContainer.classList.add('hidden');
            lineListContainer.classList.remove('hidden');
            currentLineSelected = null;
        }
    });
});