/**
 * Servicio de integración con Microsoft Graph API
 *
 * Este archivo está preparado para la integración futura con:
 *
 * - Microsoft Entra ID (Azure AD) para autenticación
 * - MSAL.js (Microsoft Authentication Library) para manejo de tokens
 * - Microsoft Graph API para acceso a datos de usuario y directorio
 * - SharePoint API para almacenamiento y listas
 * - OneDrive API para archivos y documentos
 * - Outlook API para notificaciones por correo
 *
 * POSTERIORMENTE se implementarán:
 *
 * 1. Autenticación con Microsoft Entra ID:
 *    - Configuración de MSAL con Client ID
 *    - Flujo de autenticación OAuth 2.0
 *    - Manejo de tokens de acceso y refresco
 *
 * 2. Microsoft Graph - Usuarios:
 *    - GET /me - Información del usuario actual
 *    - GET /users - Listar usuarios del directorio
 *    - GET /users/{id}/photo - Foto del usuario
 *
 * 3. Microsoft Graph - SharePoint:
 *    - GET /sites - Sitios de SharePoint
 *    - GET /sites/{siteId}/lists - Listas de SharePoint
 *    - CRUD en listas de inventario
 *
 * 4. Microsoft Graph - OneDrive:
 *    - Almacenamiento de documentos y archivos adjuntos
 *    - Sincronización de reportes
 *
 * 5. Microsoft Graph - Outlook:
 *    - Envío de notificaciones por correo
 *    - Alertas de mantenimiento
 *    - Alertas de vencimiento de licencias
 */

const GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0";

// Configuración de la aplicación en Azure AD
// Reemplazar con los valores reales de la aplicación registrada
const authConfig = {
  clientId: "TU_CLIENT_ID_AQUI",
  tenantId: "TU_TENANT_ID_AQUI",
  redirectUri: window.location.origin,
  scopes: [
    "User.Read",
    "User.Read.All",
    "Sites.ReadWrite.All",
    "Files.ReadWrite.All",
    "Mail.Send",
  ],
};

// Placeholder: Inicializar MSAL
export function initMSAL() {
  // TODO: Implementar con @azure/msal-browser
  // const msalInstance = new PublicClientApplication(authConfig);
  // return msalInstance;
  console.log("MSAL no configurado aún. Usando datos mock.");
}

// Placeholder: Iniciar sesión con Microsoft
export async function loginWithMicrosoft() {
  // TODO: Implementar flujo de autenticación con MSAL
  // const loginRequest = { scopes: authConfig.scopes };
  // const response = await msalInstance.loginPopup(loginRequest);
  // return response;
  console.log("Autenticación con Microsoft no configurada aún.");
  return null;
}

// Placeholder: Obtener usuario actual de Microsoft Graph
export async function getCurrentUser() {
  // TODO: Implementar llamada a Graph API
  // const token = await getAccessToken();
  // const response = await fetch(`${GRAPH_BASE_URL}/me`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // });
  // return response.json();
  return {
    id: "mock-user-001",
    displayName: "Administrador TI",
    mail: "admin.ti@empresa.com",
    jobTitle: "Administrador de Sistemas",
  };
}

// Placeholder: Obtener lista de usuarios desde Microsoft Graph
export async function getGraphUsers() {
  // TODO: Implementar llamada a Graph API
  // const token = await getAccessToken();
  // const response = await fetch(`${GRAPH_BASE_URL}/users`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // });
  // return response.json();
  return [];
}

// Placeholder: Obtener sitios de SharePoint
export async function getSharePointSites() {
  // TODO: Implementar llamada a Graph API
  // const token = await getAccessToken();
  // const response = await fetch(`${GRAPH_BASE_URL}/sites`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // });
  // return response.json();
  return [];
}

// Placeholder: Obtener elementos de una lista de SharePoint
export async function getSharePointListItems(_siteId, _listId) {
  // TODO: Implementar llamada a Graph API
  // const token = await getAccessToken();
  // const response = await fetch(
  //   `${GRAPH_BASE_URL}/sites/${siteId}/lists/${listId}/items`,
  //   { headers: { Authorization: `Bearer ${token}` } }
  // );
  // return response.json();
  return [];
}

// Placeholder: Enviar correo de notificación
export async function sendNotificationEmail(to, subject, _body) {
  // TODO: Implementar envío de correo con Graph API
  // const token = await getAccessToken();
  // const message = {
  //   toRecipients: [{ emailAddress: { address: to } }],
  //   subject,
  //   body: { contentType: "HTML", content: body }
  // };
  // await fetch(`${GRAPH_BASE_URL}/me/sendMail`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({ message })
  // });
  console.log(`Correo no enviado (mock): ${subject} para ${to}`);
}

export { authConfig, GRAPH_BASE_URL };
