# Delilah Resto - Acamica!🛒

![this is a picture of a shopping cart](./images/shopping-car.jpg)

Hello! 😉 this is the last project of the certification of **Full-Stack Web Development of Acamica**💻, it is about creating a **ResfulApi** for a restaurant app.

## Development tools.🔧🛠⚙

  - **Node.js**
  - **Express.js**
  - **Passport.js**
  - **bcrypt.JS**
  - **JavaScript**
  - **MySQL**

## Installation.📃‼

- **download Xampp**
- **start xampp and turn on apache and mysql**
- **download or clone the project from the repository**
- **install a code editor such as visual studio code**
- **download Node.js**
- **download Postman to be able to interact with the API**
- **Open postman search the file delilah.json and open it to find a folder with the ready-made requests**
- **open project folder in the code editor**
- **for an easier connection of visual studio code and mysql I recommend you to install an extension called Jun Han's mysql. I leave the link here**
- **https://marketplace.visualstudio.com/items?itemName=formulahendry.vscode-mysql**
- **right there you can find out how to configure the connection with mysql**
- **In the file keys.js you can configure your connection string to the database, if you have any special     configuration you can leave the default**
- **NOTE: when you open the .sql file in VSCO you will be prompted to install a mysql extension.**
- **run database script**
- **Open Terminal**

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm install -d
$ npm run dev
```
## DATABASE.🔑💾

Once the dependency mysql is installed, you'll be able to create the database and tables using the file **db.sql**.

## Postman.🦸‍♀️🦸‍♂️

In the file **delilah.json** you will find the tests to the **endpoints** with the necessary requests.

## Endpoints.

To interact with the **API** you need the following endpoints where we will be able to do **CRUD** type operations.

### EndPoints - Users.😃🤩

| protocol | category | Endpoints | Description |
| ------ | ------ | ------ | ------ |
| GET | Users | http://localhost:3000/users/ | All Users |
| GET | Users | http://localhost:3000/users/:id | User |
| PUT | Users | http://localhost:3000/users/edit/:id| Edit User |
| DELETE | Users | http://localhost:3000/users/delete/:id | Delete User |

### EndPoints - Products.🍔🌭🍟🍕🌮🥪

| protocol | category | Endpoints | Description |
| ------ | ------ | ------ | ------ |
| GET | Products | http://localhost:3000/products/ | All Products |
| GET | Products | http://localhost:3000/products/:id | Product |
| PUT | Products | http://localhost:3000/products/edit/:id | Edit Product |
| POST | Products | http://localhost:3000/products/add | Add Product |
| DELETE | Products | http://localhost:3000/products/delete/:id | Delete Product |

### EndPoint - Orders.🚀🚦

| protocol | category | Endpoints | Description |
| ------ | ------ | ------ | ------ |
| GET | Orders | http://localhost:3000/orders/ | All Orders |
| GET | Orders | http://localhost:3000/orders/:id | Order |
| PUT | Orders | http://localhost:3000/orders/edit/:id | Edit Order |
| POST | Orders | http://localhost:3000/orders/add | Add Order |
| DELETE | Orders | http://localhost:3000/orders/delete/:id | Delete Order |

### EndPoints - Others.🔒🔓📍🔑

| protocol | category | Endpoints | Description |
| ------ | ------ | ------ | ------ |
| GET | Logout | http://localhost:3000/logout/ | Log Out |
| GET | Profile | http://localhost:3000/profile | User Profile |
| GET | Home | http://localhost:3000/ | Home App |
| POST | Sign Up | http://localhost:3000/signup | User Sign Up |
| POST | Sign In | http://localhost:3000/signin | User Sign In |

## Response.📄

All answers will be in json format.

License.
----

MIT

Created by **Santiago Quintero Guarin** 😎✨