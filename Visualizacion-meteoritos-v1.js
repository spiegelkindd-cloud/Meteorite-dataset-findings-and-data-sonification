// Data: Número de descubrimientos de meteoritos por año (1900-2012)
// Extraída y preparada a partir del dataset original.
const meteoriteData = [
  { year: 1900, count: 6 }, { year: 1901, count: 4 }, { year: 1902, count: 6 },
  { year: 1903, count: 8 }, { year: 1904, count: 4 }, { year: 1905, count: 9 },
  { year: 1906, count: 6 }, { year: 1907, count: 8 }, { year: 1908, count: 7 },
  { year: 1909, count: 11 }, { year: 1910, count: 9 }, { year: 1911, count: 10 },
  { year: 1912, count: 10 }, { year: 1913, count: 9 }, { year: 1914, count: 11 },
  { year: 1915, count: 4 }, { year: 1916, count: 8 }, { year: 1917, count: 7 },
  { year: 1918, count: 8 }, { year: 1919, count: 6 }, { year: 1920, count: 5 },
  { year: 1921, count: 9 }, { year: 1922, count: 7 }, { year: 1923, count: 11 },
  { year: 1924, count: 14 }, { year: 1925, count: 9 }, { year: 1926, count: 7 },
  { year: 1927, count: 16 }, { year: 1928, count: 8 }, { year: 1929, count: 12 },
  { year: 1930, count: 20 }, { year: 1931, count: 17 }, { year: 1932, count: 13 },
  { year: 1933, count: 25 }, { year: 1934, count: 19 }, { year: 1935, count: 15 },
  { year: 1936, count: 16 }, { year: 1937, count: 21 }, { year: 1938, count: 10 },
  { year: 1939, count: 8 }, { year: 1940, count: 19 }, { year: 1941, count: 11 },
  { year: 1942, count: 7 }, { year: 1943, count: 4 }, { year: 1944, count: 6 },
  { year: 1945, count: 9 }, { year: 1946, count: 11 }, { year: 1947, count: 11 },
  { year: 1948, count: 17 }, { year: 1949, count: 21 }, { year: 1950, count: 20 },
  { year: 1951, count: 23 }, { year: 1952, count: 12 }, { year: 1953, count: 10 },
  { year: 1954, count: 6 }, { year: 1955, count: 17 }, { year: 1956, count: 17 },
  { year: 1957, count: 20 }, { year: 1958, count: 29 }, { year: 1959, count: 18 },
  { year: 1960, count: 20 }, { year: 1961, count: 28 }, { year: 1962, count: 35 },
  { year: 1963, count: 41 }, { year: 1964, count: 28 }, { year: 1965, count: 47 },
  { year: 1966, count: 45 }, { year: 1967, count: 31 }, { year: 1968, count: 52 },
  { year: 1969, count: 100 }, { year: 1970, count: 44 }, { year: 1971, count: 22 },
  { year: 1972, count: 28 }, { year: 1973, count: 30 }, { year: 1974, count: 56 },
  { year: 1975, count: 104 }, { year: 1976, count: 128 }, { year: 1977, count: 233 },
  { year: 1978, count: 178 }, { year: 1979, count: 524 }, { year: 1980, count: 192 },
  { year: 1981, count: 226 }, { year: 1982, count: 232 }, { year: 1983, count: 199 },
  { year: 1984, count: 210 }, { year: 1985, count: 257 }, { year: 1986, count: 326 },
  { year: 1987, count: 302 }, { year: 1988, count: 717 }, { year: 1989, count: 259 },
  { year: 1990, count: 531 }, { year: 1991, count: 647 }, { year: 1992, count: 474 },
  { year: 1993, count: 462 }, { year: 1994, count: 367 }, { year: 1995, count: 388 },
  { year: 1996, count: 411 }, { year: 1997, count: 636 }, { year: 1998, count: 1332 },
  { year: 1999, count: 875 }, { year: 2000, count: 1534 }, { year: 2001, count: 1391 },
  { year: 2002, count: 1331 }, { year: 2003, count: 1618 }, { year: 2004, count: 864 },
  { year: 2005, count: 900 }, { year: 2006, count: 1813 }, { year: 2007, count: 1039 },
  { year: 2008, count: 1219 }, { year: 2009, count: 1152 }, { year: 2010, count: 1369 },
  { year: 2011, count: 1318 }, { year: 2012, count: 777 }
];

let currentIndex = 0; // Índice para recorrer los años
let playbackSpeed = 15; // Velocidad (menos es más rápido)

// --- Instrumentos para la sonificación ---
let synth; // El sintetizador principal
let env; // El controlador de volumen (ataque, decaimiento)
let filter; // Un filtro para hacer el sonido más "brillante" o "apagado"

// --- Variables para el mapeo ---
let minCount, maxCount;

function setup() {
  // Crear lienzo. El tamaño es adaptable a la ventana.
  createCanvas(windowWidth, 400);

  // --- Inicialización del audio ---
  // Es importante que el audio se inicie con una interacción del usuario.
  // P5.js lo maneja automáticamente, esperando un clic para empezar.

  // Envolvente de amplitud para controlar el volumen del sintetizador
  // Parámetros: tiempo de ataque, nivel de ataque, tiempo de decaimiento, nivel de sostenido, tiempo de liberación
  env = new p5.Envelope(0.01, 0.5, 0.2, 0.1, 0.2);

  // Filtro de paso bajo para controlar el "brillo" del sonido
  filter = new p5.LowPass();
  filter.freq(1500); // Frecuencia de corte inicial

  // Oscilador de onda sinusoidal como fuente de sonido
  synth = new p5.Oscillator('sine');
  synth.amp(env); // Conectar la envolvente al volumen del oscilador
  synth.disconnect(); // Desconectar del output principal para pasar por el filtro
  synth.connect(filter); // Conectar el oscilador al filtro

  // Encontrar los valores mínimo y máximo de hallazgos para escalar los datos
  const counts = meteoriteData.map(d => d.count);
  minCount = min(counts);
  maxCount = max(counts);

  // Establecer el estilo de texto para las etiquetas (accesibilidad)
  textAlign(CENTER);
  textSize(14);
}

function draw() {
  // --- Dibujo y Visualización ---

  // 1. Fondo (alto contraste para accesibilidad)
  background(10, 20, 40); // Azul oscuro

  // 2. Dibujar el gráfico de líneas completo
  noFill();
  stroke(100, 150, 255, 150); // Azul semitransparente para la línea de fondo
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < meteoriteData.length; i++) {
    // Mapear el año al eje X y el número de hallazgos al eje Y
    let x = map(i, 0, meteoriteData.length - 1, 50, width - 50);
    let y = map(meteoriteData[i].count, minCount, maxCount, height - 50, 50);
    vertex(x, y);
  }
  endShape();

  // 3. Reproductor: avanza en el tiempo y dispara sonidos
  // Se usa frameCount para crear un temporizador
  if (frameCount % playbackSpeed === 0) {
    // Obtener los datos del año actual
    const dataPoint = meteoriteData[currentIndex];
    const count = dataPoint.count;

    // --- Sonificación ---
    // Mapear el número de hallazgos a parámetros musicales

    // Frecuencia (nota): más hallazgos -> nota más aguda
    // Usamos una escala pentatónica (5 notas por octava) para que suene agradable
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
    const freq = map(count, minCount, maxCount, 0, scale.length - 1);
    const note = scale[floor(freq)]; // Seleccionar una nota de la escala

    // Brillo del sonido (frecuencia del filtro): más hallazgos -> sonido más brillante
    const filterFreq = map(count, minCount, maxCount, 400, 4000);

    // Iniciar el sintetizador si aún no lo ha hecho
    if (synth.started === false) {
      synth.start();
    }

    // Configurar y disparar el sonido
    synth.freq(note);
    filter.freq(filterFreq);
    env.play(); // Dispara la envolvente para crear un "ping"

    // Avanzar al siguiente año y reiniciar si llega al final
    currentIndex = (currentIndex + 1) % meteoriteData.length;
  }

  // 4. Dibujar el punto de reproducción actual
  let currentX = map(currentIndex, 0, meteoriteData.length - 1, 50, width - 50);
  let currentY = map(meteoriteData[currentIndex].count, minCount, maxCount, height - 50, 50);

  stroke(255, 200, 100); // Naranja brillante para alta visibilidad
  strokeWeight(4);
  fill(10, 20, 40); // Relleno que coincide con el fondo
  ellipse(currentX, currentY, 15, 15); // Círculo en la posición actual

  // 5. Etiquetas de texto (accesibilidad)
  // Mostrar el año y el número de hallazgos actuales de forma clara
  noStroke();
  fill(240, 240, 240); // Texto casi blanco para alto contraste

  const currentYear = meteoriteData[currentIndex].year;
  const currentCount = meteoriteData[currentIndex].count;

  textSize(24);
  text(`Año: ${currentYear}`, width / 2, 30);
  textSize(18);
  text(`Descubrimientos: ${currentCount}`, width / 2, height - 15);

  // Etiquetas de los ejes
  textSize(12);
  text(meteoriteData[0].year, 50, height - 30);
  text(meteoriteData[meteoriteData.length - 1].year, width - 50, height - 30);
}

// Función para ajustar el lienzo si el tamaño de la ventana cambia
function windowResized() {
  resizeCanvas(windowWidth, 400);
}

// Iniciar/detener el audio al hacer clic para cumplir con las políticas del navegador
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
