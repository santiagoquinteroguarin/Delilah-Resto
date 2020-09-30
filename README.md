# Delilah Resto - Acamica!

Hello! 😉 this is the last project of the certification of **Full-Stack Web Development of Acamica**, it is about creating a **ResfulApi** for a restaurant app.

## Development tools

  - **Node.js**
  - **Express.js**
  - **Passport.js**
  - **bcrypt.JS**
  - **JavaScript**
  - **MySQL**


## Installation

- **download Xampp**
- **start xampp and turn on apache and mysql**
- **download or clone the project from the repository**
- **install a code editor such as visual studio code**
- **download Node.js**
- **open project folder in the code editor**
- **run database script**
- **Open Terminal**


Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm install -d
$ npm run dev
```

## Endpoints.

To interact with the API you need the following endpoints where we will be able to do **CRUD** type operations.

### EndPoints - Users.

| protocolo | categoria | Endpoints | Description |
| ------ | ------ | ------ | ------ |
| GET | Users | http://localhost:3000/users/ | All Users |
| GET | Users | http://localhost:3000/users/:id | User |
| PUT | Users | http://localhost:3000/users/edit/:id| Edit User |
| DELETE | Users | http://localhost:3000/users/delete/:id | Delete User |

### EndPoints - Products.

| protocolo | categoria | Endpoints | Description |
| ------ | ------ | ------ | ------ |
| GET | Products | http://localhost:3000/products/ | All Products |
| GET | Products | http://localhost:3000/products/:id | Product |
| PUT | Products | http://localhost:3000/products/edit/:id | Edit Product |
| POST | Products | http://localhost:3000/products/add | Add Product |
| DELETE | Products | http://localhost:3000/products/delete/:id | Delete Product |

### EndPoint - Orders.

| protocolo | categoria | Endpoints | Description |
| ------ | ------ | ------ | ------ |
| GET | Orders | http://localhost:3000/orders/ | All Orders |
| GET | Orders | http://localhost:3000/orders/:id | Order |
| PUT | Orders | http://localhost:3000/orders/edit/:id | Edit Order |
| POST | Orders | http://localhost:3000/orders/add | Add Order |
| DELETE | Orders | http://localhost:3000/orders/delete/1 | Delete Order |

### EndPoints - Others.

| protocolo | categoria | Endpoints | Description |
| ------ | ------ | ------ | ------ |
| GET | Logout | http://localhost:3000/logout/ | Log Out |
| GET | Profile | http://localhost:3000/profile | User Profile |
| GET | Home | http://localhost:3000/ | Home App |
| POST | Sign Up | http://localhost:3000/signup | User Sign Up |
| POST | Sign In | http://localhost:3000/signin | User Sign In |

## Response

All answers will be in json format

Created by **Santiago Quintero Guarin**

License
----

MIT