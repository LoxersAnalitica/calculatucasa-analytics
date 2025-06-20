
import { formatEuro, formatNumber } from './formatters';

export const generateMockData = () => {
  const baseData = {
    barrio: "Salamanca",
    locationId: "SAL001",
    periodo: "2025-Q1",
    visitas_por_anuncio: 142,
    leads_por_anuncio: 9.2,
    viviendas_en_venta: 1167,
    precio_medio: 945000,
    precio_m2: 7200,
    dias_plataforma: 38,
    rating: 8.8,
    stage: "Vendedor",
    speed: "Rápida",
    risk: "Medio",
    esfuerzo_familiar: 13.8,
    descuento_negociacion: 2.1,
    clock_leads: 78,
    variacion_precio_12m: 6.4,
    variacion_precio_base: 3.7,
    poblacion_total: 148500,
    poblacion_nacional: 121200,
    poblacion_extranjera: 27300,
    renta_familiar: 82000,
    estudios_superiores: 72,
    casados: 47,
    hogares_unipersonales: 29,
    poblacion_masculina: 70100,
    poblacion_femenina: 78400,
    edad_media: 43,
    viviendas_propias: 81,
    viviendas_alquiler: 19,
    rating_estrellas: 4.4,
    stage_descripcion: "Mercado altamente favorable al vendedor con demanda sostenida y precios en tendencia alcista",
    risk_descripcion: "Riesgo moderado por posible corrección técnica tras subidas prolongadas",
    speed_descripcion: "Velocidad de absorción alta con tiempo medio de venta por debajo de la media del distrito",
    perfil_socio: "Ejecutivos senior, empresarios, profesionales liberales de alto standing",
    demanda_nivel: "Muy Alta",
    liquidez_mercado: 8.1
  };

  const historico = {
    precio_m2: [
      { trimestre: "2023-Q2", valor: 6450 },
      { trimestre: "2023-Q3", valor: 6580 },
      { trimestre: "2023-Q4", valor: 6720 },
      { trimestre: "2024-Q1", valor: 6850 },
      { trimestre: "2024-Q2", valor: 6980 },
      { trimestre: "2024-Q3", valor: 7050 },
      { trimestre: "2024-Q4", valor: 7120 },
      { trimestre: "2025-Q1", valor: 7200 }
    ],
    stock: [
      { trimestre: "2023-Q2", valor: 1380 },
      { trimestre: "2023-Q3", valor: 1340 },
      { trimestre: "2023-Q4", valor: 1290 },
      { trimestre: "2024-Q1", valor: 1250 },
      { trimestre: "2024-Q2", valor: 1210 },
      { trimestre: "2024-Q3", valor: 1185 },
      { trimestre: "2024-Q4", valor: 1175 },
      { trimestre: "2025-Q1", valor: 1167 }
    ],
    leads_por_anuncio: [
      { trimestre: "2023-Q2", valor: 7.8 },
      { trimestre: "2023-Q3", valor: 8.1 },
      { trimestre: "2023-Q4", valor: 8.3 },
      { trimestre: "2024-Q1", valor: 8.6 },
      { trimestre: "2024-Q2", valor: 8.8 },
      { trimestre: "2024-Q3", valor: 8.9 },
      { trimestre: "2024-Q4", valor: 9.0 },
      { trimestre: "2025-Q1", valor: 9.2 }
    ],
    descuento_negociacion: [
      { trimestre: "2023-Q2", valor: 3.8 },
      { trimestre: "2023-Q3", valor: 3.4 },
      { trimestre: "2023-Q4", valor: 3.1 },
      { trimestre: "2024-Q1", valor: 2.8 },
      { trimestre: "2024-Q2", valor: 2.5 },
      { trimestre: "2024-Q3", valor: 2.3 },
      { trimestre: "2024-Q4", valor: 2.2 },
      { trimestre: "2025-Q1", valor: 2.1 }
    ],
    esfuerzo_familiar: [
      { trimestre: "2023-Q2", valor: 12.1 },
      { trimestre: "2023-Q3", valor: 12.4 },
      { trimestre: "2023-Q4", valor: 12.8 },
      { trimestre: "2024-Q1", valor: 13.1 },
      { trimestre: "2024-Q2", valor: 13.3 },
      { trimestre: "2024-Q3", valor: 13.5 },
      { trimestre: "2024-Q4", valor: 13.6 },
      { trimestre: "2025-Q1", valor: 13.8 }
    ]
  };

  return { baseData, historico };
};

export const subBarrios = [
  { 
    nombre: 'Recoletos', 
    precio_m2: 7650, 
    stock: 198, 
    leads: 10.1, 
    rating: 9.1,
    poblacion_total: 24500,
    renta_familiar: 95000,
    edad_media: 44,
    viviendas_propias: 85,
    esfuerzo_familiar: 14.2,
    descuento_negociacion: 1.8,
    stage: "Vendedor Premium",
    speed: "Muy Rápida",
    risk: "Bajo"
  },
  { 
    nombre: 'Castellana', 
    precio_m2: 7320, 
    stock: 156, 
    leads: 9.8, 
    rating: 8.9,
    poblacion_total: 28100,
    renta_familiar: 88000,
    edad_media: 42,
    viviendas_propias: 82,
    esfuerzo_familiar: 13.9,
    descuento_negociacion: 1.9,
    stage: "Vendedor",
    speed: "Rápida",
    risk: "Bajo"
  },
  { 
    nombre: 'Lista', 
    precio_m2: 6850, 
    stock: 287, 
    leads: 8.4, 
    rating: 8.3,
    poblacion_total: 31200,
    renta_familiar: 78000,
    edad_media: 41,
    viviendas_propias: 79,
    esfuerzo_familiar: 13.1,
    descuento_negociacion: 2.3,
    stage: "Equilibrado",
    speed: "Media",
    risk: "Medio"
  },
  { 
    nombre: 'Goya', 
    precio_m2: 7100, 
    stock: 234, 
    leads: 8.8, 
    rating: 8.6,
    poblacion_total: 29800,
    renta_familiar: 81000,
    edad_media: 43,
    viviendas_propias: 80,
    esfuerzo_familiar: 13.5,
    descuento_negociacion: 2.1,
    stage: "Vendedor",
    speed: "Rápida",
    risk: "Medio"
  },
  { 
    nombre: 'Guindalera', 
    precio_m2: 6650, 
    stock: 292, 
    leads: 8.1, 
    rating: 8.1,
    poblacion_total: 34900,
    renta_familiar: 75000,
    edad_media: 40,
    viviendas_propias: 76,
    esfuerzo_familiar: 12.8,
    descuento_negociacion: 2.5,
    stage: "Equilibrado",
    speed: "Media",
    risk: "Medio"
  }
];

export const insights = [
  {
    title: "Momentum alcista consolidado - Fase de expansión",
    description: "El mercado mantiene una tendencia alcista sólida con incrementos del 6.4% interanual. La demanda supera consistentemente la oferta, creando un entorno favorable para mantener precios premium. Los fundamentals del distrito apoyan esta valoración.",
    type: "success",
    action: "Mantener estrategia premium",
    details: "Volumen de transacciones +12% vs Q4-2024. Ratio demanda/oferta: 3.2x"
  },
  {
    title: "Optimización de time-to-market requerida",
    description: "Aunque el mercado es favorable, propiedades que superan 45 días en portal experimentan desaceleración en interés. La ventana óptima de venta se sitúa entre 25-40 días para maximizar precio final.",
    type: "warning",
    action: "Implementar pricing dinámico",
    details: "38% de propiedades venden en primeros 30 días al 98% del precio inicial"
  },
  {
    title: "Diversificación geográfica de demanda - Oportunidad estratégica",
    description: "El 18.4% de la demanda proviene de compradores internacionales, con fuerte presencia de HNWI latinoamericanos (México 31%, Colombia 24%) y asiáticos (Singapur 18%). Esta diversificación reduce riesgo sistémico local.",
    type: "info",
    action: "Expandir canales internacionales",
    details: "Ticket promedio internacional: +23% vs nacional. Financiación all-cash: 67%"
  }
];
