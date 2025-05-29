Repositorio Back Squad 1 | NetReact | CFI TDF 25

# Guía para levantar el entorno de desarrollo.

## 1.  Requisitos previos

 - Docker Desktop instalado y corriendo en modo Linux Containers.

 - Acceso a la carpeta del proyecto (mejor si es fuera de carpetas sincronizadas).

-  Archivo .env en la raíz, con los valores necesarios.

 - Recursos suficientes asignados a Docker (mínimo 2 GB RAM, 2 CPU).

-  Permisos de administrador si es necesario (para instalar Docker o mapear puertos bajos).

## 2. Estructura del proyecto


|--- 

├── backend/

├── frontend/

|── bacups

├── infra/

│   ├── prometheus/

│   ├── grafana/

│   └── telegraf/

├── docker-compose.yml

└── .env

## 3. Variables de entorno
------ ¡ VER VARIABLES DE ENTORNO AL FINAL DEL DOCUMENTO (A MODO DE PRACTICA)!----------------
Los archivos .env se guardan en la carpeta envs/.

Antes de levantar el entorno, copiá el .env adecuado a la raíz del proyecto.

## 4. Levantar el entorno
docker-compose up --build

## 5. Puertos de cada servicio

Backend     	  http://localhost:5000	         5000	  API .NET

Frontend	      http://localhost:3000	         3000	  React

SQL Server		                                  1433   Base de datos

Prometheus	    http://localhost:9090	         9090	  Métricas

Grafana	       http://localhost:3000	         3000	  Dashboards/monitoreo

Telegraf	      http://localhost:9273/metrics	 9273	  Exportador de métricas


## 6. Flujo de trabajo con ramas 

        Para mantener el proyecto ordenado y estable.

        ### Ramas principales

        - **`main`**  
        Rama principal y siempre estable. Todo lo que está en `main` debe pasar los tests y estar listo para desplegar en producción.

        - **`dev`**  
        Rama de desarrollo donde se integran todas las nuevas funcionalidades y correcciones antes de pasar a `main`. 

        **SUBIR CAMBIOS**
        ```bash
        git checkout dev
        git push origin dev


## 7. Recomendaciones

Cambiá los puertos en el docker-compose.yml si alguno ya está en uso en tu maquina.

Los datos de la base de datos se mantienen en el contenedor gracias a los volúmenes configurados.

Consultá Grafana (por defecto pass: admin/admin) y Prometheus para monitorear el sistema.


¡VARIABLES DE ENTORNO!

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|.env                                                                                    |
|   DB_PASSWORD=Admin1234.  # Mínimo 8 caracteres, mayúsculas, números y símbolos        |
|                                   |
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
