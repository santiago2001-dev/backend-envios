# Backend de Envíos

Este proyecto es una aplicación desarrollada en Node.js que utiliza MySQL, Express y Socket.IO. Su propósito es permitir a los usuarios cotizar, ordenar y rastrear pedidos, además de enviar notificaciones por WhatsApp. Para habilitar la funcionalidad de WhatsApp, se debe escanear un código QR utilizando WhatsApp Web.js.

## Características

- **Cotización de pedidos**: Permite a los usuarios calcular el costo de envío.
- **Ordenar pedidos**: Los usuarios pueden realizar pedidos directamente desde la aplicación.
- **Rastreo de pedidos**: Los usuarios pueden consultar el estado y ubicación de sus envíos.
- **Notificaciones por WhatsApp**: Envía actualizaciones y notificaciones a través de WhatsApp.
- **Socket.IO**: Comunicación en tiempo real para actualizaciones de pedidos.

## Requisitos

- **Node.js**: Debe estar instalado en el sistema.
- **MySQL**: Base de datos para almacenar información de usuarios y pedidos.

## Instalación y configuración

1. **Clonar el repositorio**:
   ```bash
    git clone https://github.com/santiago2001-dev/backend-envios.git
   cd backend

2. **Instalar dependencias**:
   ```bash 
      npm i 

3. **Configurar variables de entorno: Crear un archivo .env en la raíz del proyecto con las siguientes variables:**:
   ```PORT_DB=3306
        USER_DB=tu user
        PASS_DB=tu pass
        DB=envios
        HOST_DB=tu host
        PORT=3100
        JWT_SECRET= tu secret key
        
4. **ejecutar tu app**
        node inex.js
5. **Escanear el código QR: Al iniciar la aplicación, se generará un código QR en la consola. Escanéalo con WhatsApp Web para habilitar las notificaciones**
6. **En la carpeta database encontraras los scrips de la base de datos a migrar**

## Documentación de la API
   - **La documentación de la API está disponible en Swagger. Puedes acceder a ella desde el siguiente enlace:http://localhost:3100/api-docs**



   ## Pruebas en producción

   - **LLa API está desplegada en producción y puede ser probada en el siguiente enlace::https://backend-envios.devinovate.online/api/** 


   ## tegnologias 

- **Node.js: Entorno de ejecución para JavaScript**
- **Express: Framework para crear aplicaciones web**
- **MySQL: Base de datos relacional**
- **Socket.IO: Comunicación en tiempo real**
- **SWhatsApp Web.js: Integración con WhatsApp para enviar notificaciones**

