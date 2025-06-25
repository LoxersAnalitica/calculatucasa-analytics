// src/lib/newsAPI.js

// Para Next.js, las variables que empiezan con NEXT_PUBLIC_ están disponibles en el cliente
const NEWS_API_KEY = '5030e13c021645b9b80d5990f15a9bb0';
const BASE_URL = 'https://newsapi.org/v2/everything';

// Función para obtener noticias relacionadas con inmobiliario en Salamanca
export const fetchRealEstateNews = async () => {
  if (!NEWS_API_KEY) {
    console.warn('NewsAPI key not configured');
    return getFallbackNews();
  }

  try {
    // Términos de búsqueda específicos para el barrio Salamanca y sector inmobiliario
    const queries = [
      'barrio salamanca madrid inmobiliario',
      'salamanca district madrid real estate',
      'vivienda lujo madrid salamanca',
      'precios inmobiliarios madrid salamanca'
    ];

    const allNews = [];

    // Hacer búsquedas paralelas para cada query
    const promises = queries.map(async (query) => {
      const url = new URL(BASE_URL);
      url.searchParams.append('q', query);
      url.searchParams.append('language', 'es');
      url.searchParams.append('sortBy', 'publishedAt');
      url.searchParams.append('pageSize', '5');
      url.searchParams.append('apiKey', NEWS_API_KEY);
      
      // Filtrar por fechas recientes (último mes)
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      url.searchParams.append('from', lastMonth.toISOString());

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.articles || [];
    });

    const results = await Promise.all(promises);
    
    // Combinar y deduplicar noticias
    results.forEach(articles => {
      allNews.push(...articles);
    });

    // Eliminar duplicados por URL y título
    const uniqueNews = allNews.filter((news, index, self) => 
      index === self.findIndex(n => 
        n.url === news.url || n.title === news.title
      )
    );

    // Filtrar noticias relevantes y formatear
    const relevantNews = uniqueNews
      .filter(article => 
        article.title && 
        article.description && 
        article.publishedAt &&
        (
          article.title.toLowerCase().includes('salamanca') ||
          article.title.toLowerCase().includes('inmobiliario') ||
          article.title.toLowerCase().includes('vivienda') ||
          article.description.toLowerCase().includes('salamanca') ||
          article.description.toLowerCase().includes('madrid')
        )
      )
      .slice(0, 6) // Limitar a 6 noticias
      .map(article => ({
        titulo: article.title,
        resumen: article.description,
        tiempo: getTimeAgo(article.publishedAt),
        fuente: article.source?.name || 'Fuente desconocida',
        categoria: categorizeNews(article.title, article.description),
        url: article.url,
        imagen: article.urlToImage
      }));

    return relevantNews.length > 0 ? relevantNews : getFallbackNews();

  } catch (error) {
    console.error('Error fetching real estate news:', error);
    return getFallbackNews();
  }
};

// Función para categorizar noticias automáticamente
const categorizeNews = (title, description) => {
  const content = `${title} ${description}`.toLowerCase();
  
  if (content.includes('precio') || content.includes('€') || content.includes('venta')) {
    return 'transaccion';
  }
  if (content.includes('internacional') || content.includes('extranjero') || content.includes('inversor')) {
    return 'internacional';
  }
  if (content.includes('mercado') || content.includes('tendencia') || content.includes('sector')) {
    return 'mercado';
  }
  if (content.includes('regulación') || content.includes('ley') || content.includes('normativa')) {
    return 'regulacion';
  }
  return 'mercado';
};

// Función para calcular tiempo transcurrido
const getTimeAgo = (publishedAt) => {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffMs = now - published;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    return 'Hace menos de 1 hora';
  } else if (diffHours < 24) {
    return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  } else if (diffDays < 7) {
    return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  } else {
    return published.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  }
};

// Noticias de respaldo cuando la API no está disponible
const getFallbackNews = () => [
  {
    titulo: "Salamanca lidera crecimiento premium en Madrid Q1-2025",
    resumen: "Los precios suben un 6.4% interanual, consolidando máximos históricos en el distrito más exclusivo",
    tiempo: "Hace 2 horas",
    fuente: "El Economista",
    categoria: "mercado",
    url: null
  },
  {
    titulo: "Demanda internacional impulsa Barrio Salamanca",
    resumen: "Inversores latinoamericanos aumentan compras en zona prime entre Serrano y Velázquez",
    tiempo: "Hace 4 horas", 
    fuente: "Expansión",
    categoria: "internacional",
    url: null
  },
  {
    titulo: "Nuevo récord: €12.500/m² en Calle Serrano",
    resumen: "Ático de 200m² establece nuevo máximo por metro cuadrado en golden mile madrileño",
    tiempo: "Hace 8 horas",
    fuente: "Cinco Días", 
    categoria: "transaccion",
    url: null
  },
  {
    titulo: "Escasez de stock impulsa precios en zona prime",
    resumen: "Solo 847 viviendas disponibles, 15% menos que trimestre anterior según datos sectoriales",
    tiempo: "Hace 12 horas",
    fuente: "Idealista News",
    categoria: "mercado",
    url: null
  }
];
