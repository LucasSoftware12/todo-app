# Aplicación ToDo List con ReactJS, Redux y Material-UI

Esta es una sencilla aplicación web de Lista de Tareas construida con ReactJS, Redux para la gestión del estado y Material-UI para los componentes de la interfaz de usuario. La aplicación permite a los usuarios administrar sus tareas mediante la adición, edición y eliminación de ellas.

## Características

- Autenticación de usuario mediante credenciales predefinidas.
- Obtención de tareas desde una API externa y almacenamiento en el store de Redux.
- Mostrar tareas en un componente DataGrid paginado.
- Capacidad para agregar, editar y eliminar tareas.
- Las tareas se gestionan en el store de Redux para evitar llamadas innecesarias a la API.

## Comenzar

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto: `cd todo-list-app`.
3. Instala las dependencias necesarias: `npm install`.
4. Inicia el servidor de desarrollo: `npm start`.

## Dependencias

- React
- Redux
- React Redux
- Material-UI

## Estructura de Carpetas

- `src/components`: Contiene los componentes React utilizados en la aplicación.
- `src/actions`: Define los creadores de acciones de Redux.
- `src/reducers`: Define los reductores de Redux.
- `src/store`: Crea el store de Redux.
- `src/utils`: Contiene funciones de utilidad.

## Uso

1. Inicia sesión con las credenciales proporcionadas (usuario: "admin", contraseña: "admin").
2. Ve y administra las tareas en la Lista de Tareas.
3. Agrega, edita o elimina tareas utilizando los controles proporcionados.
4. Cierra sesión para finalizar la sesión.

Construido con ❤️ usando ReactJS, Redux y Material-UI.
