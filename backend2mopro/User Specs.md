# User Profile API

## Login User

Endpoint : POST /users

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
    "message" : "login successfuly",
    "data" : {
        "user_id" : "a132B",
        "username" : "Foo",
        "token" : "jwt"
    }
}
```

Response Body (Failed) 404 :
```json
{
    "success" : false,
    "message" : "Login failed, no record matched",
    "errors" : {}
}
```

## Get Current User

> sudah login sehingga memiliki cookie

Endpoint : GET /users/(:id)

Response Body (success) 200 :
```json
{
    "success" : true,
    "message" : "User found",
    "data" : {
        "username" : "Foo",
    }
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

## Logout User

Endpoint : DELETE /users/(:id)

Response Body (success) :
```json
{
    "success" : true,
    "message" : "user logout",
    "data" : {}
}