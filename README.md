# Calendario de reservas con horarios y BD

Calendario interactivo que permite reservar fechas y horas específicas.  
Incluye frontend con selección de día y hora, y backend con API REST en Node.js y MongoDB para almacenar reservas.

---

## Características

- Navegación entre meses en calendario.  
- Selección de horas disponibles (24 horas completas).  
- Bloqueo visual de días y horas ya reservados.  
- Reserva guardada en base de datos MongoDB mediante backend Express.  
- Diseño moderno con modo oscuro.  
- Compatible con móvil (requiere configurar backend con IP local).

---

## Tecnologías

- HTML, CSS, JavaScript (Frontend)  
- Node.js, Express (Backend)  
- MongoDB (Base de datos NoSQL)

---

## Cómo usar

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/Booking-Calendar-with-Hourly-Reservations.git
   ```

2. Instala dependencias del backend:

   ```bash
   cd backend
   npm install
   ```

3. Configura la conexión a MongoDB en `server.js` (reemplaza `TU_URI_DE_MONGODB`).

4. Inicia el backend:

   ```bash
   node server.js
   ```

5. Sirve el frontend con un servidor local (por ejemplo, VSCode Live Server o `python -m http.server`).

6. Abre el frontend en tu navegador (en PC o móvil).  
   > **Nota:** Para usar desde móvil, cambia en `script.js` la URL del backend por la IP local de tu PC (por ejemplo, `http://192.168.x.x:3000/api/bookings`).

---

## Licencia

MIT License ©
```
