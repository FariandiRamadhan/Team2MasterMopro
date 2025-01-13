# User Management API

> Penggunaan Opsional, hanya digunakan ketika dibutuhkan

## Register User

Endpoint : POST /user_management

Request Body :
```json
{
    "username" : "Foo",
    "password" : "secret",
}
```

Response Body (success) 200 :
```json
{
    "success" : true,
    "message" : "user created",
    "data" : {}
}
```

Response Body (Failed) 400 :
```json
{
    "success" : false,
    "message" : "Data yang diinputkan tidak valid",
    "errors"  : {
        "reason" : {
            "username" : "username sudah dipakai"
        }    
    }
}
```


## Update User

> sudah login sehingga memiliki cookie

Endpoint : PUT /user_management/(:id)

Request Body :
```json
{
    "username": "Sieghart",
    "password": "TheIronHeart"
}
```

Response Body (success) 200 :
```json
{
    "success" : true,
    "message" : "User Updated",
    "data"    : {}
}
```

Response Body (Failed) 401 :
```json
{
    "success" : false,
    "message" : "unathorized request",
    "errors" : {
        "reason" : "user not logged In"
    }
}
```

## Delete User

> sudah login sehingga memiliki cookie

Endpoint : DELETE /user_management/(:id)

Response Body (success) :

```json
{
    "success" : true,
    "message" : "User Deleted",
    "data"    : {}
}
```

Response Body (failed) 404 :

```json
{
    "success" : false,
    "message" : "User tidak ditemukan",
    "errors"  : {}
}
```

Response Body (failed) 500 :

```json
{
    "success" : false,
    "message" : "User Tidak dapat dihapus",
    "errors"    : {}
}
```