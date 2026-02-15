# 🏆 BetDay Lite - Reto Técnico

**BetDay Lite** es una plataforma web de apuestas deportivas construida con **Next.js 15** y **React 18**. La aplicación permite a los usuarios visualizar eventos deportivos, realizar selecciones en tiempo real y gestionar su historial de apuestas con una experiencia de usuario fluida y moderna.

---

## 🚀 Tecnologías Utilizadas

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Lenguaje:** TypeScript
- **Autenticación:** [NextAuth.js](https://next-auth.js.org/)
- **Estilos:** Tailwind CSS
- **Notificaciones:** [Sonner](https://sonner.stevenly.ui/) (Toasts dinámicos)
- **Renderizado:** Hybrid Rendering (Server & Client Components)

---

## 🛠️ Funcionalidades Implementadas

### 1. Timeline de Partidos (`/`)

- **Agrupación por Horarios:** Los partidos se organizan dinámicamente por hora de inicio.
- **Sistema de Selección (Toggle):** Implementación de lógica de selección 1X2 que permite activar/desactivar apuestas antes de confirmar.
- **Micro-interacciones:** Animaciones de escala y estados de carga (loading states) en cada tarjeta de partido.
- **Loading UI:** Uso de **Skeletons** nativos con `loading.tsx` para evitar saltos visuales durante la carga de datos.

### 2. Autenticación y Seguridad

- **Login Personalizado:** Flujo de acceso mediante `CredentialsProvider`.
- **Persistencia de Sesión:** Manejo de identidades mediante Callbacks de JWT y Session para reflejar el email del usuario en toda la app.
- **Protección de Datos:** Uso de variables de entorno para `NEXTAUTH_SECRET` y encriptación de sesiones.

### 3. Gestión de Apuestas

- **Perfil de Usuario:** Historial detallado de todas las apuestas realizadas con indicadores de estado (`WON`, `LOST`, `PENDING`).
- **Detalle Dinámico (`/bets/[betId]`):** Página de detalle con estética de **Ticket Físico**, utilizando rutas dinámicas de Next.js 15 para mostrar información específica del encuentro, cuotas y retornos.

---

## 🏗️ Arquitectura del Proyecto

- **Server Components (RSC):** Utilizados para la obtención de datos (Data Fetching) directamente desde el sistema de archivos (JSON), mejorando el rendimiento y reduciendo el JS enviado al cliente.
- **Client Components:** Uso estratégico de la directiva `'use client'` en componentes interactivos como formularios, navbars y botones de apuesta.
- **API Routes:** Route Handlers para procesar apuestas mediante métodos `POST`, asegurando la validación de sesión en el lado del servidor.

---

## 💻 Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone [https://github.com/tu-usuario/betday-lite.git](https://github.com/tu-usuario/betday-lite.git)
    cd betday-lite
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno (.env.local):**

    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=puedes_generar_uno_con_openssl_o_usar_texto_largo
    ```

4.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

---

## 🌐 Despliegue

La aplicación está optimizada para ser desplegada en **Vercel**.

> **Importante:** Al desplegar, asegúrese de configurar las variables de entorno en el dashboard de Vercel para que el sistema de autenticación funcione correctamente bajo HTTPS.

---

### Notas de Implementación

- Se manejó la nueva firma de `params` asíncronos en Next.js 15 para las rutas dinámicas.
- Se implementó un sistema de feedback basado en **Toasts** para eliminar el uso de `window.alert` y mejorar la UX.
- La UI es totalmente **Responsive**, adaptándose a dispositivos móviles y escritorio.
