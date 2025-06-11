# DigitalArs Wallet

**DigitalArs** es una aplicación full stack de billetera virtual desarrollada con:
- **Frontend:** React + Material UI + Toolpad
- **Backend:** .NET 8 Web API (C#)
- **Base de datos:** SQL Server 2022
- **DevOps y monitoreo:** Docker Compose, Prometheus, Grafana, Telegraf

---

##  Características principales

- Login y autenticación con JWT.
- CRUD de usuarios y cuentas.
- Panel de administración con edición en tablas (MaterialReactTable).
- Monitoreo profesional (Prometheus, Grafana).
- Preparado para correr en entornos Docker o en local.

---

##  Requisitos previos

- [Docker y Docker Compose](https://docs.docker.com/get-docker/) instalados.
- (Opcional para desarrollo) [Node.js](https://nodejs.org/) y [.NET SDK 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

---

##  Levantar el entorno completo

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/alkemyTech/CFITDF-NetReact-W2-Back-S1.git
   cd digitalars-wallet
2. **Crear archivo .env en la raíz:**

DB_PASSWORD=TuPasswordSegura123!
JWT_SECRET_KEY=UnaClaveSuperSecreta

3. **Levantar la app (backend, frontend, base, monitoreo, todo):**

docker-compose up --build

4. **Acceder desde el navegador:**

Frontend: http://localhost:5173

Backend Swagger API: http://localhost:5000/swagger

Grafana: http://localhost:3003
(usuario y clave por defecto: admin / admin)

Prometheus: http://localhost:9090

Usuarios iniciales:
Crea usuarios y cuentas desde el panel admin.

## 📝 Estructura del proyecto

digitalars-wallet/
│
├── backend/                  # Código fuente del backend .NET
│   └── scr/DigitalArs
│
├── frontend/                 # Código fuente del frontend React
│   └── DigitalArsFront
│
├── infra/                    # Configuración de monitoreo
│   ├── prometheus/
│   └── telegraf/
│
├── backups/                  # Carpeta para backups de la BD
│
├── docker-compose.yml
└── README.md

## Flujos de desarrollo
**Desarrollo local sin Docker**
Backend:
cd backend/scr/DigitalArs
dotnet run

Frontend:
cd frontend/DigitalArsFront
npm install
npm run dev

**🔒 Seguridad y JWT**
El backend requiere autenticación por JWT.

El token se guarda en localStorage al hacer login.


**📈 Monitoreo**
Grafana y Prometheus ya están configurados y corriendo por default.

Accedé a los dashboards en http://localhost:3003.

**💡 ToDo y mejoras**
 - Agregar pruebas automáticas (unitarias e integración)

 - Mejorar la experiencia de usuario mobile

 - Agregar logs más detallados en backend y frontend

 
