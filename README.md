# Gestor De Actividades con Node.JS
-------------------------------------
Proyecto pensado como introducción en el desarrollo de aplicaciones de consola haciendo uso de Node.JS, ofreciendo la posibilidad de gestionar tus pendientes de una fomra sencilla y eficaz. Todo esto posible gracias al diseño tipo CRUD con el que cuenta el programa. Más adelante se describirán más detalladamente cada una de las funciones posibles.

## Paquetes y herramientas utilizadas:
- [Node.JS 20.11.1](https://nodejs.org/en). Entorno de ejecución para código de JavaScript.
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js). Utilizado para la creación de interfaces interactivas basadas en lista de opciones desplegadas al usuario.
- [Colors.JS](https://github.com/Marak/colors.js). Permitió añadir un formato más personalizado al texto de la aplicación, utilizando combinaciones de colores y estilos.
- [UUID](https://github.com/uuidjs/uuid#readme). Generador de IDs únicas para el registro y lectura de cada tarea almacenada en la aplicación.

## Instalación:
Para poder hacer uso de este gestor de tareas requieres:
- Descargar los archivos del proyecto.
- Abrir la terminal de tu SO colocada en la carpeta de la descarga.
- Ejecutar el comando `npm install`.
- Ejecutar el comando `npm start`.

## Funcionalidades:
- Menú Interactivo: Haciendo uso del paquete Inquirer.JS, podemos generar un menú que arroja las múltiples opciones disponibles para hacer uso de la aplicación, estos menús están presentados en formato de lista, o con un sistema de checkbox para hacer selección de múltiples incisos. El menú considera opciones de confirmación y cancelación de operaciones para evitar errores indeseados.
  
  - Navegación del programa mediante el uso de las flechas arriba (↑) y abajo (↓).
  - Selección de checkbox con (barra espacio) en el teclado, seleccionar todos los elementos con la tecla (a), y hacer una selección invertida con (i)
    
- Creación y lectura de Registro: La aplicación de forma independiente genera un registro de las tareas creadas dentro de los ficheros del programa, este registro en formato .JSON es leído en cada nuevo arranque de la app, dando una funcionalidad persistente en todo el ciclo de ejecución.
