# Seyte. Regla NestJS que comprueba el Scope.REQUEST en Controller, Injectable y Processor

Regla que salta cuando un Controlador, Injectable o Processor no tiene el Scope.REQUEST habilitado. Sirve de recordatorio por si nos hace falta en algún momento configurar el Scope.REQUEST para no compartir miembros de clase entre peticiones.

>Recordemos que NestJS utiliza instancias únicas (singleton) en su contenedor de dependencias y se reutilizan en cada petición, por lo que si usamos miembros de clase puede haber conflicto entre una petición y otra.

## Instalación

```
npm i -D @seyte/eslint-plugin-nest_decorator_scope_request.js
```

## Configuración

1. Agregar en el fichero de configuración de eslint del proyecto, apartado **plugins**:

```
plugins: [
    ...
    "@seyte/nest_decorator_scope_request"
],
rules: {
    ...
    "@seyte/nest_decorator_scope_request/rule": "warn",
}
```