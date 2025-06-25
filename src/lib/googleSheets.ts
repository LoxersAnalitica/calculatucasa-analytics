export async function getSheetData(sheetName = 'Métricas') {
  const SHEET_ID = '1mfeebJqeAkRwMxXS-Bz_lj_JpIsm_FjGVfYlJwStB10';
  
  const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    
    const data = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',').map(v => v.replace(/"/g, '').trim());
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        return obj;
      });
    
    return data;
  } catch (error) {
    console.error(`Error fetching sheet data from ${sheetName}:`, error);
    return [];
  }
}

export async function getOverviewMetrics() {
  try {
    const data = await getSheetData('Métricas');
    if (!data || data.length < 7) return null;
    
    const agregadoRow = data[data.length - 1];
    console.log('🔍 DEBUG: Raw agregadoRow:', agregadoRow);
    console.log('🔍 DEBUG: precio_m2 raw value:', agregadoRow.precio_m2);
    console.log('🔍 DEBUG: variacion_precio_base raw value:', agregadoRow.variacion_precio_base);
    
    const precioMedio = parseInt(agregadoRow.precio_medio) || 0;
    const precioM2Raw = parseInt(agregadoRow.precio_m2) || 0;
    
    // Si el precio_m2 está vacío o es 0, usar valor por defecto de 10681
    const precioM2Final = precioM2Raw > 0 ? precioM2Raw : 10681;
    
    console.log('🔍 DEBUG: precioM2Raw:', precioM2Raw);
    console.log('🔍 DEBUG: precioM2Final:', precioM2Final);
    
    // Para variación vs 2007, usar directamente el valor del sheet (que ya debería estar en formato decimal)
    const variacionBase = parseFloat(agregadoRow.variacion_precio_base) || 0;
    const variacion2007Final = variacionBase * 100; // Convertir a porcentaje
    
    console.log('🔍 DEBUG: variacionBase:', variacionBase);
    console.log('🔍 DEBUG: variacion2007Final:', variacion2007Final);
    
    const result = {
      viviendasEnVenta: parseInt(agregadoRow.viviendas_en_venta) || 0,
      precioMedio: precioMedio,
      precioM2: precioM2Final,
      visitasAnuncio: parseInt(agregadoRow.visitas_por_anuncio) || 0,
      diasPlataforma: parseInt(agregadoRow.dias_plataforma) || 0,
      leadsAnuncio: parseInt(agregadoRow.leads_por_anuncio) || 0,
      variacion2007: Math.round(variacion2007Final * 10) / 10, // Redondear a 1 decimal
      variacion12Meses: Math.round((parseFloat(agregadoRow.variacion_precio_12m) || 0) * 100 * 10) / 10,
      descuentoNegociacion: Math.round((parseFloat(agregadoRow.descuento_negociacion) || 0) * 100 * 10) / 10
    };
    
    console.log('✅ Final overview metrics result:', result);
    return result;
  } catch (error) {
    console.error('Error getting overview metrics:', error);
    return null;
  }
}

export async function getHistoricoData() {
  try {
    const data = await getSheetData('Histórico');
    if (!data || data.length === 0) return null;
    
    const barrios = ['Recoletos', 'Lista', 'Fuente del Berro', 'Goya', 'Castellana', 'Guindalera'];
    const headers = Object.keys(data[0]);
    const trimestres = headers.slice(2);
    
    const historico = {
      precioEvolucion: [],
      stockTotal: [],
      diasActivos: []
    };
    
    trimestres.forEach(trimestre => {
      if (!trimestre || trimestre.trim() === '') return;
      
      const preciosBarrios = barrios.map(barrio => {
        const rowPrice = data.find(row => 
          row['Barrio'] === barrio && 
          row['Métrica'] === 'PRICE_ASKING'
        );
        return parseInt(rowPrice?.[trimestre]) || 0;
      }).filter(precio => precio > 0);
      
      const precioMedio = preciosBarrios.length > 0 ? 
        Math.round(preciosBarrios.reduce((sum, precio) => sum + precio, 0) / preciosBarrios.length) : 0;
      
      const stockTotal = barrios.reduce((sum, barrio) => {
        const rowStock = data.find(row => 
          row['Barrio'] === barrio && 
          row['Métrica'] === 'STOCK_ASKING'
        );
        return sum + (parseInt(rowStock?.[trimestre]) || 0);
      }, 0);
      
      const demValues = barrios.map(barrio => {
        const rowDem = data.find(row => 
          row['Barrio'] === barrio && 
          row['Métrica'] === 'DEM_ASKING'
        );
        return parseInt(rowDem?.[trimestre]) || 0;
      }).filter(value => value > 0);
      
      const demMedia = demValues.length > 0 ? 
        Math.round(demValues.reduce((sum, value) => sum + value, 0) / demValues.length) : 0;
      
      if (precioMedio > 0) {
        historico.precioEvolucion.push({
          trimestre,
          precio: precioMedio
        });
      }
      
      if (stockTotal > 0) {
        historico.stockTotal.push({
          trimestre,
          stock: stockTotal
        });
      }
      
      if (demMedia > 0) {
        historico.diasActivos.push({
          trimestre,
          dias: demMedia
        });
      }
    });
    
    try {
      const metricsData = await getSheetData('Métricas');
      if (metricsData && metricsData.length > 0) {
        const agregadoRow = metricsData[metricsData.length - 1];
        const precioQ1 = parseInt(agregadoRow.precio_medio) || 0;
        const stockQ1 = parseInt(agregadoRow.viviendas_en_venta) || 0;
        const diasQ1 = parseInt(agregadoRow.dias_plataforma) || 0;
        
        if (precioQ1 > 0) {
          historico.precioEvolucion.push({
            trimestre: '2025-Q1',
            precio: precioQ1
          });
        }
        
        if (stockQ1 > 0) {
          historico.stockTotal.push({
            trimestre: '2025-Q1',
            stock: stockQ1
          });
        }
        
        if (diasQ1 > 0) {
          historico.diasActivos.push({
            trimestre: '2025-Q1',
            dias: diasQ1
          });
        }
      }
    } catch (error) {
      console.log('Note: Could not add Q1-2025 data');
    }
    
    return historico;
  } catch (error) {
    console.error('Error getting historico data:', error);
    return null;
  }
}

export async function getBarriosData() {
  try {
    const data = await getSheetData('Métricas');
    if (!data || data.length === 0) return [];
    
    const barriosData = data.filter(row => 
      row.barrio && 
      row.barrio.trim() !== '' && 
      row.barrio !== 'Total' &&
      row.barrio !== 'barrio'
    );
    
    return barriosData.map(row => ({
      nombre: row.barrio,
      viviendas_en_venta: parseInt(row.viviendas_en_venta) || 0,
      precio_medio: parseInt(row.precio_medio) || 0,
      precio_m2: parseInt(row.precio_m2) || Math.round(parseInt(row.precio_medio) / 85),
      visitas_por_anuncio: parseInt(row.visitas_por_anuncio) || 0,
      leads_por_anuncio: parseInt(row.leads_por_anuncio) || 0,
      dias_plataforma: parseInt(row.dias_plataforma) || 0,
      rating: parseFloat(row.rating) || 0,
      stage: row.stage || '',
      speed: row.speed || '',
      risk: row.risk || '',
      variacion_precio_12m: Math.round((parseFloat(row.variacion_precio_12m) || 0) * 100 * 10) / 10,
      variacion_precio_base: Math.round((parseFloat(row.variacion_precio_base) || 0) * 100 * 10) / 10,
      descuento_negociacion: Math.round((parseFloat(row.descuento_negociacion) || 0) * 100 * 10) / 10,
      esfuerzo_familiar: Math.round((parseFloat(row.esfuerzo_familiar) || 0) * 100 * 10) / 10,
      poblacion_total: parseInt(row.poblacion_total) || 0,
      poblacion_nacional: parseInt(row.poblacion_nacional) || 0,
      poblacion_extranjera: parseInt(row.poblacion_extranjera) || 0,
      renta_familiar: parseInt(row.renta_familiar) || 0,
      estudios_superiores: parseFloat(row.estudios_superiores) || 0,
      casados: parseFloat(row.casados) || 0,
      hogares_unipersonales: parseFloat(row.hogares_unipersonales) || 0,
      poblacion_masculina: parseInt(row.poblacion_masculina) || 0,
      poblacion_femenina: parseInt(row.poblacion_femenina) || 0,
      edad_media: parseFloat(row.edad_media) || 0,
      viviendas_propias: parseFloat(row.viviendas_propias) || 0,
      viviendas_alquiler: parseFloat(row.viviendas_alquiler) || 0,
      liquidez_mercado: parseFloat(row.liquidez_mercado) || 0,
      clock_leads: parseFloat(row.clock_leads) || 0,
      stock: parseInt(row.viviendas_en_venta) || 0,
      leads: parseInt(row.leads_por_anuncio) || 0
    }));
  } catch (error) {
    console.error('Error getting barrios data:', error);
    return [];
  }
}
// Función para obtener datos de una hoja específica
