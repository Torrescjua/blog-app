/* ───────────────────────────────────────────────────────────────
   ICONOS PERSONALIZADOS · Categorías:
   • "arquitectura"  → pin-casa azul
   • "natural"       → pin-hoja verde
   • "center"        → estrella azul oscuro (centro del pueblo)
   ─────────────────────────────────────────────────────────────── */
import L from 'leaflet';

/* 1.  Fijar los íconos por defecto de Leaflet (corrige warning en React) */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/* 2.  Colores por categoría */
const COLORS = {
  arquitectura: '#3b82f6', // blue-500
  natural:      '#22c55e', // green-500
  center:       '#1e40af', // blue-800
};

/* 3.  SVG helpers */
const createHouseSVG = color => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24C24 5.4 18.6 0 12 0z"
          fill="${color}" stroke="#FFFFFF" stroke-width="1.5"/>
    <path d="M6 10h12v7H6z" fill="white"/>
    <path d="M12 5L5 10h14z" fill="white"/>
  </svg>
`;

const createLeafSVG = color => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24C24 5.4 18.6 0 12 0z"
          fill="${color}" stroke="#FFFFFF" stroke-width="1.5"/>
    <path d="M12 7c4 0 6 2 6 5 0 4-6 9-6 9S6 16 6 12c0-3 2-5 6-5z"
          fill="white"/>
  </svg>
`;

const createCenterSVG = color => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="28" height="40">
    <path d="M14 0C6.3 0 0 6.3 0 14c0 8.4 14 28 14 28s14-19.6 14-28C28 6.3 21.7 0 14 0z"
          fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
    <path d="M14 5l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"
          fill="white"/>
  </svg>
`;

/* 4.  Utilidad para transformar SVG → data URL */
const svgToDataUrl = svg =>
  `data:image/svg+xml;base64,${btoa(svg.trim())}`;

/* 5.  Factory principal */
export const createCustomIcon = (category, isCenter = false) => {
  let svgString, iconSize, iconAnchor;

  if (isCenter) {
    svgString  = createCenterSVG(COLORS.center);
    iconSize   = [28, 40];
    iconAnchor = [14, 40];
  } else if (category === 'arquitectura') {
    svgString  = createHouseSVG(COLORS.arquitectura);
    iconSize   = [24, 36];
    iconAnchor = [12, 36];
  } else if (category === 'natural') {
    svgString  = createLeafSVG(COLORS.natural);
    iconSize   = [24, 36];
    iconAnchor = [12, 36];
  } else {
    /* fallback genérico */
    svgString  = createLeafSVG('#6B7280');       // gris
    iconSize   = [24, 36];
    iconAnchor = [12, 36];
  }

  return new L.Icon({
    iconUrl:      svgToDataUrl(svgString),
    iconSize:     iconSize,
    iconAnchor:   iconAnchor,
    popupAnchor:  [0, -iconAnchor[1] + 5],
    tooltipAnchor:[0, -iconAnchor[1] + 18],
  });
};

/* 6.  Utilidad rápida para un ícono externo (opcional) */
export const createDefaultIcon = (url, size = [25, 41]) =>
  new L.Icon({
    iconUrl:    url || 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize:   size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor:[0, -size[1] + 7],
    shadowUrl:  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
