# FILE SHARING API

## Installing

1.  Generate `.env` file
    ```
    PORT= Port Number of the API server listens to
    FOLDER= Absolute file directory where uploaded files are saved
    ```

2.  Install dependencies

    ```
    $ npm install
    ```

3.  Fire up the server

    ```
    $ npm start
    ```

## HTTP REST API

- > Get list of available files
    ### **Request**
    ```
    GET http://localhost:{PORT}/files
    ```

    ### **Response** (json)
    ```
    [
      {
          "publicKey":"1e728e269c8d5140bd6068df88",
          "privateKey":"609edbe3aabcf366373a77b835ef4c3f7363788edd6c469f3c82cbeea1",
          "filename":"test.txt"
      },
      {
          "publicKey":"1960e87eb13d50b5c13b3a4663",
          "privateKey":"ac52697cdd375b7b9d4216ffa8dc180d8fe77a19ccdbfeed8a74660f80",
          "filename":"test1.txt"
      }
    ]
    ```

- > Download a file
    ### **Request**
    ```
    GET http://localhost:{PORT}/files/{publicKey}
    ```

    ### **Response**
    ```
    HTTP status 200 with file download.
    ```

- > Upload a file
    ### **Request**
    ```
    POST http://localhost:{PORT}/files/
    ```

    ### **Response**
    ```
    {
      "publicKey":"1960e87eb13d50b5c13b3a4663",
      "privateKey":"ac52697cdd375b7b9d4216ffa8dc180d8fe77a19ccdbfeed8a74660f80"
    }
    ```

- > Delete file *(file owners only)*
    ### **Request**
    ```
    DELETE http://localhost:{PORT}/files/{privateKey}
    ```

    ### **Response**
    ```
    {
      "isDeleted": true
    }
    ```