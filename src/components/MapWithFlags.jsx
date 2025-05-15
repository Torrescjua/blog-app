/* ───────────────────────────────────────────────────────────────
   MAPA RUTAS TURÍSTICAS · FLORIDA (VALLE DEL CAUCA)
   – Ruta 1 · Arquitectura Histórica      (azul)
     · Día 1: La Industria → La Chamba → Iglesia del Ángel → La Aurora
     · Día 2: Perodías → Salamanca → Perdomo → Casa de Piedra
   – Ruta 2 · Paisajes de Florida         (verde)
     · Día 1: Río Frayle → Mirador Bella Vista → Villa Aventura Extrema
     · Día 2: Lagunas La Fe, Esperanza y Caridad (Páramo de las Tinajas)
   ─────────────────────────────────────────────────────────────── */
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline,
} from "react-leaflet";
import { createCustomIcon } from "../utils/map-icons";
import "leaflet/dist/leaflet.css";

/* ───────── DATOS ───────── */
const TOWN_CENTER = [3.325873, -76.236930];                 // Plaza principal

const LOCATIONS = [
  /* — Arquitectura Histórica — */
  { id: "industria", name: "Hacienda La Industria", position: [3.341389, -76.261389], category: "arquitectura" },
  { id: "chamba",    name: "Casa La Chamba",        position: [3.329722, -76.245000], category: "arquitectura" },
  { id: "angel",     name: "Iglesia del Ángel",     position: [3.325452, -76.236614], category: "arquitectura" },
  { id: "aurora",    name: "Hacienda La Aurora",    position: [3.355278, -76.207222], category: "arquitectura" },
  { id: "perodias",  name: "Hacienda Perodías",     position: [3.301111, -76.255000], category: "arquitectura" },
  { id: "salamanca", name: "Casa de los Salamanca", position: [3.322485, -76.234976], category: "arquitectura" },
  { id: "perdomo",   name: "Casa Perdomo",          position: [3.321673, -76.235539], category: "arquitectura" },
  { id: "piedra",    name: "Casa de Piedra",        position: [3.3173981, -76.2221287], category: "arquitectura" },

  /* — Paisajes / Patrimonio Natural — (coords aprox.) */
  { id: "riofrayle", name: "Río Frayle (paseo de olla)",      position: [3.305378, -76.209214], category: "natural" },
  { id: "mirador",   name: "Mirador Bella Vista / La Diana",  position: [3.312037, -76.186336], category: "natural" },
  { id: "villa",     name: "Villa Aventura Extrema",          position: [3.327702, -76.182627], category: "natural" },
  { id: "laguna_fe",          name: "Laguna La Fe",          position: [3.322558, -76.081007], category: "natural" },
  { id: "laguna_esperanza",   name: "Laguna La Esperanza",   position: [3.310268, -76.069413], category: "natural" },
  { id: "laguna_caridad",     name: "Laguna La Caridad",     position: [3.316848, -76.072701], category: "natural" },
];

/* ───────── RUTAS ───────── */
const ROUTES = [
  /* ① Arquitectura Histórica — Día 1 */
  {
    id: "arq-d1",
    name: "Arquitectura Histórica · Día 1",
    category: "arquitectura",
    color: "blue",
    positions: [
      //TOWN_CENTER,
      LOCATIONS.find(l => l.id === "industria").position,
      LOCATIONS.find(l => l.id === "chamba").position,
      LOCATIONS.find(l => l.id === "angel").position,
      LOCATIONS.find(l => l.id === "aurora").position,
    ],
  },
  /* ② Arquitectura Histórica — Día 2 */
  {
    id: "arq-d2",
    name: "Arquitectura Histórica · Día 2",
    category: "arquitectura",
    color: "blue",
    positions: [
      //TOWN_CENTER,
      LOCATIONS.find(l => l.id === "perodias").position,
      LOCATIONS.find(l => l.id === "perdomo").position,
      LOCATIONS.find(l => l.id === "salamanca").position,
      LOCATIONS.find(l => l.id === "piedra").position,
    ],
  },
  /* ③ Paisajes de Florida — Día 1 */
  {
    id: "nat-d1",
    name: "Paisajes de Florida · Día 1",
    category: "natural",
    color: "green",
    positions: [
      //TOWN_CENTER,
      LOCATIONS.find(l => l.id === "riofrayle").position,
      LOCATIONS.find(l => l.id === "mirador").position,
      LOCATIONS.find(l => l.id === "villa").position,
    ],
  },
  /* ④ Paisajes de Florida — Día 2 */
  {
    id: "nat-d2",
    name: "Paisajes de Florida · Día 2",
    category: "natural",
    color: "green",
    positions: [
      LOCATIONS.find(l => l.id === "mirador").position,
      LOCATIONS.find(l => l.id === "laguna_fe").position,
      LOCATIONS.find(l => l.id === "laguna_caridad").position,
      LOCATIONS.find(l => l.id === "laguna_esperanza").position,
    ],
  },
];

function MapWithFlags() {
  /* cuál grupo está resaltado (arquitectura, natural o todos) */
  const [activeCat, setActiveCat] = useState(null);   // null = todas
  const [showLegend, setShowLegend] = useState(true);

  /* z-index para que el mapa se mantenga al fondo */
  useEffect(() => {
    document.querySelectorAll(".leaflet-container")
            .forEach(el => (el.style.zIndex = "10"));
  }, []);

  /* memo – iconos por punto */
  const icons = useMemo(
    () => LOCATIONS.reduce((acc, loc) => {
      acc[loc.id] = createCustomIcon(loc.category);
      return acc;
    }, {}),
    []
  );

  /* icono del centro */
  const centerIcon = useMemo(() => createCustomIcon("center", true), []);

  /* estilo de línea */
  const getLineStyle = route => {
    const base = { color: route.color, weight: 4 };
    if (!activeCat)         return { ...base, opacity: 0.9, dashArray: "5 10" };
    if (route.category === activeCat) return { ...base, opacity: 1,  weight: 6 };
    return { ...base, opacity: 0.15, weight: 2 };
  };

  return (
    <motion.div variants={fadeIn("up", 0.3)} initial="hidden" animate="show"
      className="container mx-auto px-4 py-20 mt-20">
      <div className="w-full h-[70vh] rounded-xl shadow-lg overflow-hidden relative"
           style={{ zIndex: 10 }}>
        {/* ────── BOTONES ────── */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button onClick={() => setActiveCat(null)}
            className={`px-3 py-1 rounded-lg shadow ${activeCat===null
              ? "bg-gray-800 text-white font-medium"
              : "bg-white text-gray-800 hover:bg-gray-100"}`}>
            Mostrar todas
          </button>
          <button onClick={() => setActiveCat("arquitectura")}
            className={`px-3 py-1 rounded-lg shadow ${activeCat==="arquitectura"
              ? "bg-blue-600 text-white font-medium"
              : "bg-white text-gray-800 hover:bg-gray-100"}`}>
            Ruta Arquitectura
          </button>
          <button onClick={() => setActiveCat("natural")}
            className={`px-3 py-1 rounded-lg shadow ${activeCat==="natural"
              ? "bg-green-600 text-white font-medium"
              : "bg-white text-gray-800 hover:bg-gray-100"}`}>
            Ruta Paisajes
          </button>
        </div>

        {/* ────── MAPA ────── */}
        <MapContainer center={TOWN_CENTER} zoom={12} scrollWheelZoom
                      style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />

          {/* centro del pueblo */}
          <Marker position={TOWN_CENTER} icon={centerIcon}>
            <Popup className="text-center font-medium">
              <h3 className="font-bold text-blue-800">Centro del Pueblo</h3>
              <p className="text-sm text-gray-600">Punto de partida</p>
            </Popup>
            <Tooltip permanent direction="top" offset={[0,-16]}>
              <span className="font-bold">Centro</span>
            </Tooltip>
          </Marker>

          {/* puntos */}
          {LOCATIONS
            .filter(l => !activeCat || l.category === activeCat)
            .map(l => (
              <Marker key={l.id} position={l.position} icon={icons[l.id]}>
                <Popup>
                  <h3 className="font-bold text-lg">{l.name}</h3>
                </Popup>
                <Tooltip direction="top">{l.name}</Tooltip>
              </Marker>
          ))}

          {/* rutas */}
          {ROUTES
            .filter(r => !activeCat || r.category === activeCat)
            .map(r => (
              <Polyline key={r.id} positions={r.positions}
                        pathOptions={getLineStyle(r)}>
                <Tooltip sticky>{r.name}</Tooltip>
              </Polyline>
          ))}
        </MapContainer>

        {/* ────── LEYENDA ────── */}
        {showLegend && (
          <div className="absolute bottom-8 left-4 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
            {/* encabezado */}
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-800 text-sm">Leyenda</h4>
              <button
                onClick={() => setShowLegend(false)}
                className="text-gray-500 hover:text-gray-800 text-sm"
              >
                ✕
              </button>
            </div>

            {/* símbolos */}
            <div className="space-y-2 text-sm">
              {/* Arquitectura  (casita azul) */}
              <div className="flex items-center gap-2">
                <svg width="16" height="22" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24C24 5.4 18.6 0 12 0z"
                        fill="#3b82f6" stroke="#FFFFFF" strokeWidth="1.5"/>
                  <path d="M6 10h12v7H6z" fill="white"/>
                  <path d="M12 5L5 10h14z" fill="white"/>
                </svg>
                <span>Arquitectura histórica</span>
              </div>

              {/* Paisajes  (hoja verde) */}
              <div className="flex items-center gap-2">
                <svg width="16" height="22" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24C24 5.4 18.6 0 12 0z"
                        fill="#22c55e" stroke="#FFFFFF" strokeWidth="1.5"/>
                  <path d="M12 7c4 0 6 2 6 5 0 4-6 9-6 9S6 16 6 12c0-3 2-5 6-5z" fill="white"/>
                </svg>
                <span>Paisajes de Florida</span>
              </div>

              {/* Centro del pueblo  (estrella) */}
              <div className="flex items-center gap-2">
                <svg width="16" height="22" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 0C6.3 0 0 6.3 0 14c0 8.4 14 28 14 28s14-19.6 14-28C28 6.3 21.7 0 14 0z"
                        fill="#1e40af" stroke="#FFFFFF" strokeWidth="2"/>
                  <path d="M14 5l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="white"/>
                </svg>
                <span>Centro del pueblo</span>
              </div>

              {/* Líneas de ruta */}
              <div className="border-t border-gray-200 pt-1 mt-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-blue-500"></div>
                  <span>Ruta Arquitectura</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1" style={{ backgroundColor: '#22c55e' }}></div>
                  <span>Ruta Paisajes</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* botón de info cuando la leyenda está oculta */}
        {!showLegend && (
          <button
            onClick={() => setShowLegend(true)}
            className="absolute bottom-8 left-4 z-20 p-2 bg-white rounded-full shadow-md hover:shadow-lg"
          >
            <span className="block w-5 h-5 text-center">ℹ️</span>
          </button>
        )}

      </div>
    </motion.div>
  );
}

export default MapWithFlags;
