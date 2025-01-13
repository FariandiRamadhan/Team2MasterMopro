# Agenda API Specs

> Sudah login, sehingga memiliki cookie

## Get All Agenda

Endpoint : GET /agendas

Endpoint : GET /agendas?limit=3

**endpoint ini akan mengambil agenda dan dibatasi hingga 3 data**

Response Body (success) 200 :
```json
    "success" : true,
    "message" : "Agenda Found",
    "data" : [
        {
            "agenda_id"         : "123A",
            "judul"             : "Foo",
            "meeting_time"      : { "tanggal" : "2024-01-01", "jam" : "01:00:00" },
            "lokasi"            : "Baz, 123 Street",
            "username"          : "admin",
            "participants"      : ["foo", "bar", "baz"],
            "deskripsi_rapat"   : "lorem ipsum dolor sit amet",
            "status"            : "pending",
            "kesimpulan_rapat"  : "",
            "follow_up_actions" : ""
        },
        {
            "agenda_id"         : "123B",
            "judul"             : "Bar",
            "meeting_time"      : { "tanggal" : "2024-01-02", "jam" : "02:00:00" },
            "lokasi"            : "Baz, 123 Street",
            "username"          : "admin",
            "participants"      : ["foo", "bar", "baz"],
            "deskripsi_rapat"   : "lorem ipsum dolor sit amet",
            "status"            : "succeed",
            "kesimpulan_rapat"  : "lorem ipsum dolor sit amet ius congionus",
            "follow_up_actions" : "lorem ipsum dolor sit amet"
        },
        {
            "agenda_id"         : "123C",
            "judul"             : "Baz",
            "meeting_time"      : { "tanggal" : "2024-01-02", "jam" : "03:00:00" },
            "lokasi"            : "Baz, 123 Street",
            "username"          : "admin",
            "participants"      : ["foo", "bar", "baz"],
            "deskripsi_rapat"   : "lorem ipsum dolor sit amet",
            "status"            : "cancelled",
            "kesimpulan_rapat"  : "",
            "follow_up_actions" : ""
        }
    ]
```

Response Body (Failed) 401 :
```json
{
    "success"   : false,
    "message"   : "unathorized request",
    "errors"    : {
        "reason" : "user not logged In"
    }
}
```

## Get Specific Agenda

Endpoint : GET /agendas/(:id)

Response Body (success) 200 :
```json
    "success" : true,
    "message" : "Agenda Found",
    "data" : {
            "agenda_id"         : "123A",
            "judul"             : "Foo",
            "meeting_time"      : { "tanggal" : "2024-01-01", "jam" : "01:00:00" },
            "lokasi"            : "Baz, 123 Street",
            "username"          : "admin",
            "participants"      : ["foo", "bar", "baz"],
            "deskripsi_rapat"   : "lorem ipsum dolor sit amet",
            "status"            : "pending",
            "kesimpulan_rapat"  : "",
            "follow_up_actions" : ""
        }
```

Response Body (Failed) 401 :
```json
{
    "success"   : false,
    "message"   : "unathorized request",
    "errors"    : {
        "reason" : "user not logged In"
    }
}
```

Response Body (Failed) 404 :
```json
{
    "success"   : false,
    "message"   : "agenda not found",
    "errors"    : {}
}
```

## Create Agenda

Endpoint : POST /agendas

Request Body :
```json
{
    "judul"                     : "Foo",
    "meeting_time"              : { "tanggal" : "2024-01-01", "jam" : "01:00:00" },
    "lokasi"                    : "Baz, 123 Street",
    "participants"              : "foo, bar, baz",
    "deskripsi_rapat"           : "lorem ipsum dolor sit amet"
}
```

Response Body (success) 201 :
```json
{
    "success" : true,
    "message" : "Agenda created",
    "data" : {}
}
```

Response Body (Failed) 400 :
```json
{
    "success" : false,
    "message" : "Ada error pada form",
    "errors" : {
        "judul"                 : "judul tidak boleh kosong",
        "lokasi"                : "lokasi terlalu panjang",
        "meeting_time"          : "tanggal meeting sudah terlewat",
        "participants"          : "peserta meeting tidak boleh kosong",
        "deskripsi_rapat"       : "deskripsi rapat tidak boleh kosong"
    }
}
```

## Insert data kesimpulan rapat

Endpoint : PATCH /agendas/(:id)

Request Body :
```json
{
    "kesimpulan_rapat"  : "lorem ipsum dolor sit amet",
    "follow_up_actions" : "lorem ipsum dolor sit amet",
}
```

Response Body (success) 200 :
```json
{
    "success" : true,
    "message" : "Insert Kesimpulan rapat berhasil",
    "data" : {}
}
```

Response Body (Failed) 400 :
```json
{
    "success" : false,
    "message" : "Ada error pada form",
    "errors" : {
        "kesimpulan_rapat"  : "field tidak boleh kosong",
        "follow_up_actions" : "field tidak boleh kosong",
    }
}
```

## Update data agenda rapat

Endpoint : PUT /agendas/(:id)

Request Body :
```json
{
    "judul"             : "Foo",
    "meeting_time"      : { "tanggal" : "2024-01-01", "jam" : "01:00:00" },
    "lokasi"            : "Baz, 123 Street",
    "participants"      : "foo, bar, baz",
    "deskripsi_rapat"   : "lorem ipsum dolor sit amet",
    "status"            : "cancelled",
    "kesimpulan_rapat"  : "lorem ipsum dolor sit amet 2",
    "follow_up_actions" : "lorem ipsum dolor sit amet 2",
}
```

Response Body (success) 200 :
```json
{
    "success" : true,
    "message" : "Data agenda rapat berhasil diubah",
    "data" : {}
}
```

Response Body (Failed) 400 :
```json
{
    "success" : false,
    "message" : "Ada error pada form",
    "errors" : {
        "kesimpulan_rapat"  : "field tidak boleh kosong",
        "follow_up_actions" : "field tidak boleh kosong",
    }
}
```

## Delete data agenda rapat

Endpoint : DELETE /agendas/(:id)

Response Body (success) 200 :
```json
{
    "success" : true,
    "message" : "Data agenda rapat berhasil dihapus",
    "data" : {}
}
```

Response Body (failed) 404 :
```json
{
    "success" : false,
    "message" : "Data tidak ditemukan",
    "errors" : {}
}
```

**Catatan Penting**

1. Ingat user harus login sebelum bisa mengakses endpoint agenda
2. Ingat secara default akses endpoint agenda tanpa login akan menghasilkan error 401, dan harus redirect ke login page