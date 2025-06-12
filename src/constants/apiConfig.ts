// Configuración global de la API
export const API_BASE_URL = 'http://localhost:3000';

// Función para obtener la URL completa de un endpoint
export function getApiUrl(endpoint: string): string {
  // Asegurarse de que el endpoint no comience con una barra si la URL base termina con una
  if (endpoint.startsWith('/') && API_BASE_URL.endsWith('/')) {
    endpoint = endpoint.substring(1);
  }
  // Asegurarse de que haya una barra entre la URL base y el endpoint
  if (!API_BASE_URL.endsWith('/') && !endpoint.startsWith('/')) {
    return `${API_BASE_URL}/${endpoint}`;
  }
  return `${API_BASE_URL}${endpoint}`;
}