# API Endpoint

OSB helps you bootstrap common API patterns like the creation of a new CRUD resource using the following command:

```
npm run osb new endpoint
```

A very common API pattern in web applications is the REST CRUD pattern.

Endpoints are created which represent a pluralized "resource". Like Bundles or Orders or Customers, etc.

In this pattern 2 api endpoints are usually created of the following form,

```
/YOUR_RESOURCE        GET POST
/YOUR_RESOURCE/:id    GET PUT PATCH DELETE
```

The `/YOUR_RESOURCE` endpoint represents the *collection* of resources. Multiple.

The `/YOUR_RESOURCE/:id` endpoint represents a *singleton* of that resource. Single.

|Method   |Endpoint   |Purpose   |
|---|---|---|
| GET  | `/YOUR_RESOURCE`  | Returns a collection of resources  |
| POST  | `/YOUR_RESOURCE`  | Creates a new resource  |
| GET  | `/YOUR_RESOURCE/:id`  | Returns a singleton resource by id  |
| PUT  | `/YOUR_RESOURCE/:id`  | Replaces a singleton resource by id  |
| PATCH  | `/YOUR_RESOURCE/:id`  | Updates a singleton resource by id  |
| DELETE  | `/YOUR_RESOURCE/:id`  | Deletes a singleton resource by id  |

?> Depending on the business logic of your application you may want to add more methods to your `/YOUR_RESOURCE` endpoint to handle bulk operations. This isn't very common in the context of custom shopify applications so I did not add them by default.

## Command Explanation

This command:

- Creates a new API path by creating a new file at `web/backend/api/v1/paths/YOUR_RESOURCE.js`
- Creates a new API path by creating a new file at `web/backend/api/v1/paths/YOUR_RESOURCE/{id}.js`

These files determine what the name of the path is, which methods are allowed, what middleware is run when the endpoint is hit, the documentation for the methods, and finally which handler functions are called. Then

- Creates a new api service by creating a new file at `web/backend/api/v1/services/YOUR_RESOURCEService.js`

This file contains *all* the handler functions for the created resource. As well as some boilerplate to extract data from the request. These are the methods called in the path files. Then

- Creates a new Input Schema by creating a new file at `web/backend/api/v1/schemas/inputs/YOUR_RESOURCEInput.js`

This file contains the request body input for the collection POST request. Here you use the [open api 3.0 specification](https://swagger.io/specification/) to define the request body. Every time a POST request is sent to create a new resource it will be validated against this schema.

This saves you a lot of time developing since you no longer have to write boilerplate or validation, and protects you against bugs involving an incorrect frontend payload.