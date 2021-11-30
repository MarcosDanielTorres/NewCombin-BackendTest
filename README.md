# Introducción
Este proyecto resuelve el [desafio] proporcionado por NewCombin que busca evaluar conocimientos en la creación de Backends. 

Se implementa una REST API utilizando NodeJS para una versión súper simplificada de un proveedor de servicios de pago de impuestos.

## Instalación

1. Instalar [node] y opcionalmente [mongo] para desarrollo.
1. Descargar el proyecto con `git clone https://github.com/MarcosDanielTorres/NewCombin-BackendTest`
1. Navegar hacia el directorio donde se clonó el repositorio.
1. En una terminal, ejecutar el comando `npm install` para descargar los paquetes necesarios para ejecutar el proyecto.
1. En una terminal, ejecutar el comando `npm start` o bien `npm run watch` para iniciar el servidor.

## Consideraciones de diseño

## Payable endpoints
### Create Payable
---

Crea un nuevo objeto Payable y lo retorna en formato JSON.

- **URL**

  /api/payables/

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

    ```json
    {
      "barcode": "acp-128daz",
      "service": "Gas",
      "description": "Esta es una factura de gas",
      "expiration_date": "2021-11-16T03:00:00.000Z",
      "status": "pending",
      "amount": 322
    }
    ```
- **Success Response:**

  - **Code:** 201 <br />
    **Content:** 
    ```json
    {
      "barcode": "acp-128daz",
      "service": "Gas",
      "description": "Esta es una factura de gas",
      "expiration_date": "2021-11-16T03:00:00.000Z",
      "status": "pending",
      "amount": 322,
      "_id": "61a65f9c321a69c702c44fad"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "..." }`
    
    
### Get Unpaid Payables
---

Lista aquellas boletas impagas en forma total o filtradas por tipo de servicio.

- **URL**

  /api/payables/unpaid?service <br>
  service es opcional, pero si se provee un servicio tiene que ser uno válido.
  
- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**
  None
  
- **Success Response sin proporcionar el service:**

  - **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "service": "Gas",
        "expiration_date": "2021-11-16T03:00:00.000Z",
        "amount": 912.1,
        "barcode": "a8193-123"
    }
    ```
    
- **Success Response proporcionando el service:**

  - **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "expiration_date": "2021-11-16T03:00:00.000Z",
        "amount": 912.1,
        "barcode": "a8193-123"
    }
    ```


- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "..." }`
    
## Transaction endpoints
### Create Transaction
---

Crea un nuevo objeto Transaction que va a representar un pago de un Payable y lo retorna en formato JSON.

- **URL**

  /api/transactions/

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

    ```json
    {
        "payment_method": "cash",
        "amount_paid": 233,
        "barcode": "zaza",
        "payment_date": "2022-05-20"
    }
    ```
- **Success Response:**

  - **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "payment_method": "cash",
        "payment_date": "2022-05-20T00:00:00.000Z",
        "amount_paid": 233,
        "barcode": "zaza",
        "_id": "61a6658a7a175a43348f0342"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "..." }`


## Imagenes de ejemplo

[desafio]: https://github.com/newcombin/devskillsback
[node]: https://nodejs.org
[mongo]: https://www.mongodb.com
