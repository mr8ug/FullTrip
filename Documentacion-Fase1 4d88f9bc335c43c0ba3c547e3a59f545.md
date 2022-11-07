# Documentacion-Fase1

# Metodología de desarrollo

## Proceso Racional Unificado (RUP)

Significa "Proceso unificado racional". RUP es un proceso de desarrollo de software de Rational, una división de IBM. Divide el proceso de desarrollo en cuatro fases distintas, cada una de las cuales involucra modelado, análisis y diseño de negocios, implementación, pruebas e implementación. Las cuatro fases son:

1. **Comienzo** - Se plantea la idea del proyecto. El equipo de desarrollo determina si vale la pena seguir el proyecto y qué recursos se necesitarán.
2. **Elaboración** - La arquitectura del proyecto y los recursos necesarios se evalúan más a fondo. Los desarrolladores consideran posibles aplicaciones del software y los costos asociados con el desarrollo.
3. **Construcción** - El proyecto está desarrollado y completado. El software está diseñado, escrito y probado.
4. **Transición** - El software se lanza al público. Los ajustes o actualizaciones finales se realizan en función de los comentarios de [los usuarios finales](https://techlib.net/definition/enduser.html).

La metodología de desarrollo RUP proporciona una forma estructurada para que las empresas visualicen la creación de programas de software. Dado que proporciona un plan específico para cada paso del proceso de desarrollo, ayuda a evitar el desperdicio de recursos y reduce los costos de desarrollo inesperados.

# Fase de iniciación

## Modelo de branching

### Gitflow

Es un modelo alternativo de creación de ramas en Git en el que se utilizan ramas de función y varias ramas principales. Según este modelo, los desarrolladores crean una rama de función y retrasan su fusión con la rama principal del tronco hasta que la función está completa. Estas ramas de función de larga duración requieren más colaboración para la fusión y tienen mayor riesgo de desviarse de la rama troncal. También pueden introducir actualizaciones conflictivas.

Gitflow puede utilizarse en proyectos que tienen un ciclo de publicación programado, así como para la práctica recomendada de DevOps de entrega continua. Este flujo de trabajo no añade ningún concepto o comando nuevo, aparte de los que se necesitan para el flujo de trabajo de ramas de función. Lo que hace es asignar funciones muy específicas a las distintas ramas y definir cómo y cuándo deben estas interactuar

# Historias de usuario

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled.png)

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%201.png)

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%202.png)

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%203.png)

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%204.png)

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%205.png)

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%206.png)

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%207.png)

# Mapeo de historias de usuario

[MAPPING.drawio](https://drive.google.com/file/d/17VYO_Cz7a5_rS8NRGnrls6JUyLReXa5l/view?usp=sharing)

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%208.png)

## Requerimientos

### Funcionales

1. Los usuarios iniciaran sesión 
2. Nuevos usuarios podrán registrarse dependiendo del tipo de cuenta que desea
3. El sistema registrara la información de los usuarios
4. El administrador registrara usuarios hoteles, renta de autos y aerolíneas 
5. Los usuarios turistas podrán filtrar mediante país, ciudad, cantidad de personas y rangos de precios y fechas los hoteles
6. Los usuarios de tipo hotel crearan una habitación disponible
7. Los usuarios turistas harán reservaciones de hoteles
8. Los usuarios autos registraran automóviles 
9. Los usuarios tipo turista filtraran automóviles disponibles mediante marca, modelo y rango de precio
10. Los usuarios turista podrán realizar un alquiler de un automóvil disponible    
11. Los usuarios aerolíneas podrán registrar los vuelos disponibles
12. Los usuarios turistas podrán filtrar los vuelos disponibles mediante destino y rango de precio
13. Los usuarios turista podrá realizar una reservación de un vuelo
14. Los usuarios turistas podrán calificar los servicios, estos al finalizar su prestación.

### No funcionales

1. El sistema contará con una interfaz intuitiva 
2. La latencia entre acciones o interacciones con el sistema serán  mínimas 
3. Con solo contar con acceso a internet podrá acceder a la plataforma
4. Solicitud de recursos es mínima ya que puede correr en el navegador de preferencia
5. Mínimo requerimiento de velocidad de internet, ya que contamos con optimización 
6. Interfaz interactiva y help center
7. aplicación expuesta a entornos previos de pruebas minimizando bugs
8. Contará con adaptabilidad de mejora del sistema e integración de nuevos servicios 

## Seguridad de la aplicación

El sistema contará alta integridad de los usuarios de la aplicación, ya que contara con encriptación de punto a punto, además de contar con tokens de autenticación al momento de realizar operaciones sobre el sistema, este obtenido al momento de inicio de sesión en el sistema, en donde previamente se realizó autenticación de dos pasos, para aumentar la veracidad de los usuarios. 

Con respecto a todos los datos sensibles solicitados en la plataforma, contamos con políticas de confidencialidad y resguardo de los datos, con esto garantizamos que ninguna información será distribuida ni modificada, a terceros, y esta tampoco podrá ser manipulada por nuestra corporación por ningún motivo. A su vez estas practicas son aseguradas bajo códigos legislativos de información personal en plataformas. Toda la información de pago con la tarjetas de crédito/debito no se guardan en nuestra plataforma. 

A su vez en lo que concierne a los almacenamientos físicos de información contamos con alta seguridad en la red de distribución de nuestro servicio y con una capa de seguridad en nuestros servidores. Sistema de detección de maquinas zombies con un sistema tercerizado.  

## Casos de uso

### Diagrama de casos de uso

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%209.png)

## Descripción de casos de uso

| Nombre | Registro de usuarios |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario no registrado o un administrador puedan crear una cuenta de usuario |
| Actores | Usuario no registrado y administrador del sistema |
| Pre condiciones | Para el administrador, este necesita estar logueado en el sistema con el perfil “administrador”. |
| Post condiciones | Registro y creación de nueva cuenta de usuario |
| Secuencia de pasos  | P1. El sistema muestra los campos de información necesarios a llenar 
P2. El actor llena los campos con la información que el sistema solicita 
P3. El usuario envía los datos para ser procesados 

E1. El usuario no completa todos los campos y procede a enviar el formulario
    -  El sistema retorno un mensaje “Llene todos los campos”
    -  El sistema retorna a P2 |

| Nombre | Registro de usuarios turistas |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario no registrado o un administrador puedan crear una cuenta de usuario |
| Actores | Usuario no registrado y administrador del sistema |
| Pre condiciones | Para el administrador, este necesita estar logueado en el sistema con el perfil “administrador”. |
| Post condiciones | Registro y creación de nueva cuenta de usuario tipo hotel |
| Secuencia de pasos  | P1. El sistema muestra los campos de información necesarios para el registro de un usuario turista (nombre completo, nombre de usuario, fecha de nacimiento, correo electrónico, contraseña y confirmación de contraseña)
P2. El actor llena los campos con la información que el sistema solicita 
P3. El usuario envía los datos para ser procesados 

E1. El usuario no completa todos los campos y procede a enviar el formulario
    -  El sistema retorno un mensaje “Llene todos los campos”
    -  El sistema retorna a P2 |

| Nombre | Registro de usuarios hotel |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario no registrado o un administrador puedan crear una cuenta de usuario |
| Actores | Usuario no registrado y administrador del sistema |
| Pre condiciones | Para el administrador, este necesita estar logeado en el sistema con el perfil “administrador”. |
| Post condiciones | Registro y creación de nueva cuenta de usuario tipo hotel |
| Secuencia de pasos  | P1. El sistema muestra los campos de información necesarios para el registro de un usuario tipo hotel (nombre del hotel, país, ciudad, correo electrónico, contraseña)
P2. El actor llena los campos con la información que el sistema solicita 
P3. El usuario envía los datos para ser procesados 

E1. El usuario no completa todos los campos y procede a enviar el formulario
    -  El sistema retorno un mensaje “Llene todos los campos”
    -  El sistema retorna a P2 |

| Nombre | edit de usuarios hotel |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario no registrado o un administrador puedan crear una cuenta de usuario |
| Actores | Usuario no registrado y administrador del sistema |
| Pre condiciones | Para el administrador, este necesita estar logueado en el sistema con el perfil “administrador”. |
| Post condiciones | Registro y creación de nueva cuenta de usuario tipo hotel |
| Secuencia de pasos  | P1. El sistema muestra los campos de información necesarios para el registro de un usuario tipo hotel (nombre del hotel, país, ciudad, correo electrónico, contraseña)
P2. El actor llena los campos con la información que el sistema solicita 
P3. El usuario envía los datos para ser procesados 

E1. El usuario no completa todos los campos y procede a enviar el formulario
    -  El sistema retorno un mensaje “Llene todos los campos”
    -  El sistema retorna a P2 |

| Nombre | Registro de usuarios automóvil |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario no registrado o un administrador puedan crear una cuenta de usuario |
| Actores | Usuario no registrado y administrador del sistema |
| Pre condiciones | Para el administrador, este necesita estar logueado en el sistema con el perfil “administrador”. |
| Post condiciones | Registro y creación de nueva cuenta de usuario tipo automóvil  |
| Secuencia de pasos  | P1. El sistema muestra los campos de información necesarios para el registro de un usuario tipo automóvil (nombre de renta de autos, país ciudad, correo electrónico y contraseña)
P2. El actor llena los campos con la información que el sistema solicita 
P3. El usuario envía los datos para ser procesados 

E1. El usuario no completa todos los campos y procede a enviar el formulario
    -  El sistema retorno un mensaje “Llene todos los campos”
    -  El sistema retorna a P2 |

| Nombre | Registro de usuarios aerolínea |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario no registrado o un administrador puedan crear una cuenta de usuario |
| Actores | Usuario no registrado y administrador del sistema |
| Pre condiciones | Para el administrador, este necesita estar logeado en el sistema con el perfil “administrador”. |
| Post condiciones | Registro y creación de nueva cuenta de usuario tipo aerolínea |
| Secuencia de pasos  | P1. El sistema muestra los campos de información necesarios para el registro de un usuario tipo aerolínea (nombre de la aerolínea, país, ciudad, correo electrónico y contraseña)
P2. El actor llena los campos con la información que el sistema solicita 
P3. El usuario envía los datos para ser procesados 

E1. El usuario no completa todos los campos y procede a enviar el formulario
    -  El sistema retorno un mensaje “Llene todos los campos”
    -  El sistema retorna a P2 |

| Nombre | Reservar de cuarto de hotel |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario turista registrar una reservación de hotel |
| Actores | Usuario turista |
| Pre condiciones | Para el administrador, este necesita estar logueado en el sistema con el perfil “turista”.
Realizar el filtro de búsqueda de habitaciones de hotel |
| Post condiciones | Registro y creación de reservación de un cuarto de hotel  |
| Secuencia de pasos  | P1. El sistema muestra los campos de información necesarios para el registro de una reservación de un cuarto de hotel (fecha de disponibilidad y cantidad de habitaciones disponibles)
P2. El actor llena los campos con la información que el sistema solicita 
P3. El usuario envía los datos para ser procesados 

E1. El usuario no completa todos los campos y procede a enviar el formulario
    -  El sistema retorno un mensaje “Llene todos los campos”
    -  El sistema retorna a P2 |

| Nombre | Alquilar automóviles  |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario turista registrar el alquiler de un automóvil  |
| Actores | Usuario turista |
| Pre condiciones | Para el administrador, este necesita estar logeado en el sistema con el perfil “turista”.
Realizar filtro de búsqueda de automóviles  |
| Post condiciones | Registro y creación de un alquiler de vehículo  |
| Secuencia de pasos  | P1. El sistema muestra los campos de información necesarios para el registro del alquiler de un vehículo (cantidad de días a rentar y confirmación de contraseña)
P2. El actor llena los campos con la información que el sistema solicita 
P3. El usuario envía los datos para ser procesados 

E1. El usuario no completa todos los campos y procede a enviar el formulario
    -  El sistema retorno un mensaje “Llene todos los campos”
    -  El sistema retorna a P2 |

| Nombre | Alquilar de vuelos  |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario turista registrar la reservación de un vuelo  |
| Actores | Usuario turista |
| Pre condiciones | Para el administrador, este necesita estar logueado en el sistema con el perfil “turista”.
Realizar filtro de búsqueda de vuelo |
| Post condiciones | Registro y creación de un alquiler de un vuelo de avión  |
| Secuencia de pasos  | P1. El sistema muestra los campos de información necesarios para el registro de una reservación de un vuelo de avión (usuario del turista, cantidad de asientos que necesita, confirmación de la contraseña)
P2. El actor llena los campos con la información que el sistema solicita 
P3. El usuario envía los datos para ser procesados 

E1. El usuario no completa todos los campos y procede a enviar el formulario
    -  El sistema retorno un mensaje “Llene todos los campos”
    -  El sistema retorna a P2 |

| Nombre | Filtrar hoteles |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario turista visualizar habitaciones de hotel mediante filtros de búsqueda |
| Actores | Usuario turista |
| Pre condiciones | Para el administrador, este necesita estar logueado en el sistema con el perfil “turista”. |
| Post condiciones | Vista de habitaciones de hotel disponibles con características similares o iguales a la de los filtros de búsqueda.  |
| Secuencia de pasos  | P1. El sistema exhibe las opciones de países, ciudad, cantidad de personas y rango de precios y rango de fechas 
P2. El actor busca, selecciona y/o llenar las opciones presentadas 
P3. El usuario realiza la búsqueda

E1. El sistema no encuentra habitaciones de hotel con las características o similares 
    -  El sistema retorno un mensaje “No hay habitaciones de hotel con esas características”
    -  El sistema retorna a P1 |

| Nombre | Filtrar automóviles |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario turista visualizar automóviles para alquiler mediante filtros de búsqueda |
| Actores | Usuario turista |
| Pre condiciones | Para el administrador, este necesita estar logueado en el sistema con el perfil “turista”. |
| Post condiciones | Vista de habitaciones de automóviles disponibles para alquiler con características similares o iguales a la de los filtros de búsqueda.  |
| Secuencia de pasos  | P1. El sistema exhibe las opciones de marca, placa, modelo y precio
P2. El actor busca, selecciona y/o llenar las opciones presentadas 
P3. El usuario realiza la búsqueda

E1. El sistema no encuentra habitaciones de hotel con las características o similares 
    -  El sistema retorno un mensaje “No hay automóviles con esas características”
    -  El sistema retorna a P1 |

| Nombre | Filtrar vuelos |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario turista visualizar vuelos en avión mediante filtros de búsqueda |
| Actores | Usuario turista |
| Pre condiciones | Para el administrador, este necesita estar logueado en el sistema con el perfil “turista”. |
| Post condiciones | Vista de habitaciones de vuelos en avión disponibles con características similares o iguales a la de los filtros de búsqueda.  |
| Secuencia de pasos  | P1. El sistema exhibe las opciones de fecha de vuelo, destino de vuelo, cantidad de asientos disponibles y precio.
P2. El actor busca, selecciona y/o llenar las opciones presentadas 
P3. El usuario realiza la búsqueda

E1. El sistema no encuentra habitaciones de hotel con las características o similares 
    -  El sistema retorno un mensaje “No hay vuelos con esas características”
    -  El sistema retorna a P1 |

| Nombre | Registro de habitación |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario hotel (Representante legal de hotel o administrador) tiene la capacidad de registrar una habitación |
| Actores | Usuario hotel (Representante legal de hotel o administrador) |
| Pre condiciones | El Usuario Hotel, es necesario que este logueado. para poder hacer uso del registro |
| Post condiciones | Registro de habitación agregada |
| Secuencia de pasos  | P1. Usuario Hotel se loguea
P2. Ingresa al panel principal
P3. Navega hacia página de registro de habitación
P4. Observa la lista de habitaciones creada
P5. Solicita crear una habitación
P6. Ingresa los datos solicitados en el formulario
P5. Confirma los datos y registra la habitación
 |

| Nombre | Edición de habitación |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario hotel (Representante legal de hotel o administrador) tiene la capacidad de editar una habitación |
| Actores | Usuario hotel (Representante legal de hotel o administrador) |
| Pre condiciones | El Usuario Hotel, es necesario que este logueado. para poder hacer uso de la edición |
| Post condiciones | Editar registro de habitación agregada |
| Secuencia de pasos  | P1. Usuario Hotel se loguea
P2. Ingresa al panel principal
P3. Ingresa la lista de habitaciones creadas
P4. Selecciona editar una habitación
P5. Ingresa los cambios formularios
P6. Confirma los datos y edita la habitación
 |

| Nombre | Eliminación de habitación |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario hotel (Representante legal de hotel o administrador) tiene la capacidad de eliminar una habitación |
| Actores | Usuario hotel (Representante legal de hotel o adminstrador) |
| Pre condiciones | El Usuario Hotel, es necesario que este logueado. para poder hacer uso de eliminacion |
| Post condiciones | Eliminar registro de habitación agregada |
| Secuencia de pasos  | P1. Usuario Hotel se loguea
P2. Ingresa al panel principal
P3. Ingresa la lista de habitaciones creadas
P4. Selecciona eliminar una habitación
    -  Muestra mensaje de eliminación exitosa
    -  Vuelve a la lista de habitaciones
 |

| Nombre | Registro de automóvil |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario hotel (Representante legal de hotel o administrador) tiene la capacidad de registrar un automóvil |
| Actores | Usuario automóvil (Representante legal de la concesionaria o administrador) |
| Pre condiciones | El Usuario Automóvil, es necesario que este logueado. para poder hacer uso del registro |
| Post condiciones | Registro de automóvil agregada |
| Secuencia de pasos  | P1. Usuario Automóvil se loguea
P2. Ingresa al panel principal
P3. Navega hacia página de registro de automóvil
P4. Observa la lista de automóviles creada
P5. Solicita crear de automóvil
P6. Ingresa los datos solicitados en el formulario
P5. Confirma los datos y registra la automóvil |

| Nombre | Edición de automóvil |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario hotel (Representante legal de la concesionaria o administrador) tiene la capacidad de editar una automóvil |
| Actores | Usuario automóvil (Representante legal de concesionaria o administrador) |
| Pre condiciones | El Usuario Automovil, es necesario que este logueado. para poder hacer uso del edición |
| Post condiciones | Editar registro de habitación agregada |
| Secuencia de pasos  | P1. Usuario automóvil se loguea
P2. Ingresa al panel principal
P3. Ingresa la lista de automóviles creadas
P4. Selecciona editar un automóvil
P5. Ingresa los cambios de formularios
P6. Confirma los datos y edita el automóvil
 |

| Nombre | Eliminación de automóvil |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario automóvil (Representante legal de la concesionaria o administrador) tiene la capacidad de eliminar un automóvil |
| Actores | Usuario automóvil (Representante legal de hotel o administrador) |
| Pre condiciones | El Usuario Automóvil, es necesario que este logueado. para poder hacer uso de eliminación |
| Post condiciones | Eliminación registro de automóvil agregada |
| Secuencia de pasos  | P1. Usuario automóvil se loguea
P2. Ingresa al panel principal
P3. Ingresa la lista de automóviles creadas
P4. Selecciona eliminar un automóvil
    -  Muestra mensaje de eliminación exitosa
    -  Vuelve a la lista de automóviles
 |

| Nombre | Registro de vuelo |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario vuelo (Representante legal de aerolínea o administrador) tiene la capacidad de registrar un vuelo |
| Actores | Usuario vuelo (Representante legal de aerolínea o administrador) |
| Pre condiciones | El Usuario vuelo, es necesario que este logueado. para poder hacer uso del registro |
| Post condiciones | Registro de vuelo agregada |
| Secuencia de pasos  | P1. Usuario vuelo se loguea
P2. Ingresa al panel principal
P3. Navega hacia página de registro de vuelo
P4. Observa la lista de vuelos creada
P5. Solicita crear un vuelo
P6. Ingresa los datos solicitados en el formulario
P5. Confirma los datos y registra un vuelo |

| Nombre | Edición de un vuelo |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario vuelo (Representante legal de aerolínea o administrador) tiene la capacidad de editar una automóvil |
| Actores | Usuario automóvil (Representante legal de aerolínea o administrador) |
| Pre condiciones | El Usuario Vuelo, es necesario que este logueado. para poder hacer uso de la edición |
| Post condiciones | Editar registro de habitación agregada |
| Secuencia de pasos  | P1. Usuario vuelo se loguea
P2. Ingresa al panel principal
P3. Ingresa la lista de vuelos creados
P4. Selecciona editar un vuelo
P5. Ingresa los cambios de formularios
P6. Confirma los datos y edita el vuelo
 |

| Nombre | Eliminación de vuelo |
| --- | --- |
| Descripción del comportamiento | Permite que un usuario vuelo (Representante legal de aerolínea o administrador) tiene la capacidad de eliminar un automóvil |
| Actores | Usuario vuelo (Representante legal de aerolínea o administrador) |
| Pre condiciones | El Usuario vuelo, es necesario que este logueado. para poder hacer uso de eliminación |
| Post condiciones | Eliminación registro de vuelo agregado |
| Secuencia de pasos  | P1. Usuario vuelo se loguea
P2. Ingresa al panel principal
P3. Ingresa la lista de vuelos creados
P4. Selecciona eliminar un vuelo
    -  Muestra mensaje de eliminación exitosa
    -  Vuelve a la lista de vuelos
 |

# Matriz de trazabilidad de requisitos

![Untitled](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Untitled%2010.png)

# Tecnologías a utilizar

## Node.js

Es un entorno de tiempo de ejecución de JavaScript (de ahí su terminación en .js haciendo alusión al lenguaje JavaScript). Este **entorno de tiempo** de ejecución en tiempo real incluye todo lo que se necesita para ejecutar un programa escrito en JavaScript

Node.js fue creado por los **desarrolladores originales de JavaScript.** Lo transformaron de algo que solo podía ejecutarse en el navegador en algo que se podría ejecutar en los ordenadores como si de aplicaciones independientes se tratara.

Utiliza un **modelo de entrada y salida sin bloqueo** controlado por eventos que lo hace ligero y eficiente (con entrada nos referimos a solicitudes y con salida a respuestas). Puede referirse a cualquier operación, desde leer o escribir archivos de cualquier tipo hasta hacer una solicitud HTTP.

## React.js

React.js, más comúnmente conocida como React, es una biblioteca JavaScript gratuita y de código abierto. Funciona mejor para construir interfaces de usuario mediante la combinación de secciones de código (componentes) en sitios web completos.

React.js está construido usando JSX – Una combinación de JavaScript y XML. Los elementos se crean con JSX y, a continuación, utilizan JavaScript para representarlos en su sitio. Si bien React tiene una curva de aprendizaje empinada para un desarrollador junior, se está convirtiendo rápidamente en una de las bibliotecas de JavaScript más populares y demandada.

## MySQL

MySQL es un sistema de gestión de bases de datos relacionales de código abierto. Al igual que con otras bases de datos relacionales, MySQL almacena datos en tablas formadas por filas y columnas. Los usuarios pueden definir, manipular, controlar y consultar datos mediante el lenguaje de consulta estructurado, más comúnmente conocido como [SQL](https://www.digitalocean.com/community/tutorials/what-is-sql). El nombre de MySQL es una combinación de "My", el nombre de la hija del creador de MySQL Michael Widenius, y "SQL".

Un programa flexible y potente, MySQL es el sistema [de base de datos de código abierto](https://www.digitalocean.com/community/tutorials/what-is-open-source) más popular del mundo. Como parte de la pila de tecnología LAMP ampliamente utilizada (que consiste en un sistema operativo basado en Linux, el servidor web Apache, una base de datos MySQL y PHP para el procesamiento), se utiliza para almacenar y recuperar datos en una amplia variedad de aplicaciones, sitios web y servicios populares.

# Fase de elaboración

## Arquitectura del sistema

### Diagrama de componentes

![DIAGRAMA DE COMPONENTES.drawio.png](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/DIAGRAMA_DE_COMPONENTES.drawio.png)

### Diagrama de despliegue

![Diagrama de Despliegue.drawio.png](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Diagrama_de_Despliegue.drawio.png)

## Diagrama de datos

![Ayd1_2.png](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Ayd1_2.png)

## Mockups

[MockupsProyecto](https://drive.google.com/file/d/1NSpZIswKoBi6fhoqP9bu0mWvdDZcOuSD/view?usp=sharing)

![MockupsProyecto.drawio.png](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/MockupsProyecto.drawio.png)

## Diagrama de clases

![Diagrama de clases.drawio.png](Documentacion-Fase1%204d88f9bc335c43c0ba3c547e3a59f545/Diagrama_de_clases.drawio.png)