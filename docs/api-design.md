# DISEÑO DE LA API


## BASE DE DATOS

### Users table

-   id
-   first_name *
-   last_name *
-   email *
-   picture *
-   bio *
-   password *
-   active *
-   activation_code *


### Houses table

-   id
-   title *
-   price *
-   rooms *
-   description *
-   city *
-   id_owner *

### Ratings table

-   id
-   id_user_booking *
-   id_user_rated *
-   user_rating_role *
-   rating *
-   rating_date *


### House_pictures table

-   id
-   id_house *
-   url *

### Bookings table

-   id
-   start_date *
-   end_date *
-   accepted
-   id_house *
-   id_tenant *


&nbsp;

## Endpoints


### Endpoints de los usuarios

-   `POST /register` - Crear un usuario pendiente de activar
    -   **Cabecera auth:** No
    -   **Body:**
        -   firstName
        -   lastName
        -   email
        -   picture
        -   bio
        -   password
    -   **Retorna:** mensaje que indica que el usuario ha sido creado y que se debe verificar la cuenta.

&nbsp;

-   `GET /profile/` - Obtener tu perfil
    -   **Cabecera auth:** Sí
    -   **Queryparams:**
    -   **Retorna:** Info de tu usuario

&nbsp;

-   `GET /users/validate/:registrationCode` - Validar a un usuario recién registrado

    -   **Cabecera auth:** No
    -   **Queryparams:**
        -   registrationCode
    -   **Retorna:** mensaje que indica que el usuario ha sido activado

&nbsp;

-   `POST /users/login` - Hacer login y retornar un token

    -   **Cabecera auth:** No
    -   **Body:**
        -   email
        -   password
    -   **Retorna:** un token

&nbsp;

-   `PUT /users/` - Editar el nombre, apellidos, email, bio, foto y password del usuario

    -   **Cabecera auth:** Sí
    -   **Body:**
        -   firstName
        -   lastName
        -   email
        -   picture
        -   bio
        -   password
    -   **Retorna:** mensaje que indica que los datos del usuario han sido modificados

&nbsp;


- `GET /users/ratings/:role` - Obtener las valoraciones recibidas por un usuario como casero / inquilino
    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   role
    -   **Retorna:** Valoraciones ecibidas por un usuario como el rol introducido

&nbsp;


- `GET /users/houses` - Obtener los anuncios de un usuario
    -   **Cabecera auth:** Sí
    -   **Retorna:** Info de los anuncios de un usuario

&nbsp;

-   `POST /users/rate/:bookingId` - Valorar a un usuario con referencia a una estancia
    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   :bookingId
    -   **Body:**
        -   rating
        -   userRatedRole
    -   **Retorna:** Mensaje de confirmación de valoración

&nbsp;

### Endpoints para los anuncios

- `GET /houses/` - Obtener anuncios filtrados
    -   **Cabecera auth:** No
    -   **Querystring:**
        -   city
        -   price
        -   rooms
        -   startDate
        -   endDate
    -   **Retorna:** info de los anuncios filtrados y ordenados

&nbsp;

-   `GET /houses/:houseId` - Obtener un anuncio concreto
    -   **Cabecera auth:** No
    -   **Queryparams:**
        -   houseId
    -   **Retorna:** Info de un anuncio

&nbsp;


-   `POST /houses/` - Crear un anuncio
    -   **Cabecera auth:** Sí
    -   **Body:**
        -   title
        -   price
        -   rooms
        -   city
        -   description
        -   idOwner
        -   pictures
    -   **Retorna:** Mensaje de confirmación de auncio guardado

&nbsp;


### Endpoints para las reservas

-   `GET /bookings/received/pending` - Obtener reservas pendientes recibidas por un usuario
    -   **Cabecera auth:** Sí
    -   **Retorna:** Info de reservas pendientes recibidas por un usuario

&nbsp;

-   `GET /bookings/made/pending` - Obtener reservas pendientes solicitadas por un usuario
    -   **Cabecera auth:** Sí
    -   **Retorna:** Info de reservas pendientes solicitadas por un usuario

&nbsp;

-   `GET /bookings/received/accepted` - Obtener reservas recibidas y aceptadas por un usuario
    -   **Cabecera auth:** Sí
    -   **Retorna:** Info de reservas recibidas y aceptadas por un usuario

&nbsp;

-   `GET /bookings/made/accepted` - Obtener reservas solicitadas por un usuario que han sido aceptadas
    -   **Cabecera auth:** Sí
    -   **Retorna:** Info de reservas solicitadas por un usuario que han sido aceptadas

&nbsp;

-   `POST /bookings/:houseId` - Crear una reserva pendiente de confirmar
    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   houseId
    -   **Body:**
        -   startDate
        -   endDate
    -   **Retorna:** Confirmación de reserva realizada y envía email a casero

&nbsp;


-   `PUT /bookings/confirm/:bookingId` - Confirma una reserva
    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   bookingId
    -   **Retorna:** mensaje que que indica que la reserva ha sido confirmada

&nbsp;


-   `PUT /bookings/cancel/:bookingId` - Cancela una reserva pendiente de confirmar
    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   bookingId
    -   **Retorna:** Mensaje que indica que la reserva se ha cancelado e email a casero e inquilino

&nbsp;




