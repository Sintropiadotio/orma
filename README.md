
# Orma

Orma is an ORM for Google Apps Script that uses Google Sheets as a database and allows you to manage data in the form of objects instead of multidimensional arrays. It also enables you to create new records, modify, and delete data.

## Table of Contents
- [Before to start](#Before-to-start)
  - [Extended Classes](#Extended-Classes)
  - [Underscore Prefix & Autocomplete](#Underscore-Prefix-&-Autocomplete)
  - [Data Structure](#Data-Structure)
  - [The Database Structure](#The-Database-Structure)
  - [The id Field](#The-id-Field)
  - [The Query Syntax](#The-Query-Syntax)
- [Usage](#sezione-2)
    - [Installation](#Installation)
    - [Open Databases and Tables](#Open-Databases-and-Tables)
    - [Crud Operations](#Crud-Operations)
    - [Other Functions](#Other-functions)
- [Authors](#Authors)
- [License](#License)
- [Feedback](#Feedback)
- [Links](#Links)

## Before to start
In this paragraph, we will delve into some fundamental aspects of Orma's architecture. 
These aspects will be crucial for mastering the library.
### Extended Classes
Orma uses the existing [Spreadsheet](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet) and [Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet) classes and extends them by adding the necessary methods for the ORM.

So, as in the case below, the variables `db` and `users` are indeed instances of the classes `Spreadsheet` and `Sheet`.

```javascript
const ssId = "your_spreadsheet_id";
const db = ORMA.openDbById(ssId);
Logger.log(db); //Spreadsheet

const tables = db._getTables();
const {users} = tables;
Logger.log(users); //Sheet
```
### Underscore Prefix & Autocomplete
please note that the `_getTables` method starts with an underscore. All methods extended in the Google Apps Script classes start with an underscore to avoid conflicts with native methods.

Google Apps Script does not offer autocomplete suggestions for second-level functions in libraries. For this reason, within the `Spreadsheet` and `Sheet` classes in Orma, a property called `_info` is available, which returns a JSON containing the functions available for that instance.

```javascript
const ssId = "your_spreadsheet_id";
const db = ORMA.openDbById(ssId);
Logger.log(db._info); 
/*
{
    "_getTables":"a method to get all the tables available in the database"
}
*/

const tables = db._getTables();
const {users} = tables;
Logger.log(users._info); 
/*
{
    "_create":"a method to create a new record as an object",
    "_createMany":"a method to create multiple records as array of objects",
    "_find":"a method to find a record by its id value",
    "_firstBy":"a method to get the first record by a specific column from a given value",
    "_firstByQuery":"a method to get the first record by a specific query",
    "_findManyByQuery":"a method to get all the records by a specific query",
    "_findManyBy":"a method to get all the records by a specific column from a given value",
    "_all":"a method to get all the records"
}
*/

```
### Data Structure
Once you use the ORM and retrieve data from Google Sheets with functions like `_all`, `_find`, `_firstBy`, etc., the returned object or array of objects will also have the `_save` and `delete` functions available. These functions are necessary, as we will see later, to delete and save any changes made to the objects and propagate them to the database. For this reason, the `_info` property is not available in these objects."

Let's see an example to better understand:
```javascript
const ssId = "your_spreadsheet_id";
const db = ORMA.openDbById(ssId);

const tables = db._getTables()
const { users } = tables;

const user = users._find("e6021aa4-5685-4cad-a395-922c7db47a39_1717682521060");
Logger.log(user);
/*
    {
            id:e6021aa4-5685-4cad-a395-922c7db47a39_1717682521060, 
            name:Matteo, 
            _delete:function () { [native code] }, 
            password:5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5, 
            email:matteo@sintropia.io, 
            _save:function () { [native code] }
    }
*/
const allUsers = users._all();
Logger.log(allUsers);
/*
    {
        _save:function () { [native code] },
        _delete:function () { [native code] }, 
        data:[
            {
                _delete:function () { [native code] }, 
                name:Matteo, 
                _save:function () { [native code] }, 
                id:e6021aa4-5685-4cad-a395-922c7db47a39_1717682521060, 
                password:5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5, 
                email:matteo@sintropia.io
            }, 
            {
                id:491e5b8a-3c95-4bee-b704-9d7322db9d26_1717682555762, 
                name:Daniele, 
                _save:function () { [native code] }, 
                email:daniele@sintropia.io, 
                password:a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3, 
                _delete:function () { [native code] }
            }
        ]
    }
*/
```
There are two observations to make about the example above: the first concerns, once again, the use of the underscore as the first character of the function names `_delete` and `_save`. In this case, it is not to avoid conflicts with Google classes but rather to avoid conflicts with the sheet headers. To prevent any type of conflict with the ORMA library, sheet headers should not start with an underscore.

The second observation concerns the difference in the structures of the objects obtained in the example above. When using functions like `_find`, which retrieve a single instance, I will obtain an object containing the properties of the instance retrieved from the database, along with the `_save` and `_delete` functions, necessary as we will see later to modify and delete the instance in the database.

"However, in the case of functions like `_all`, which retrieve an array of objects, the structure of the response will be slightly different: within the object, we find the `_save` and `_delete` functions necessary to save changes or delete all instances obtained from the function. Meanwhile, within the `data` property, individual objects containing the instances obtained from the database will be available. These objects, in turn, contain the properties obtained from the database, along with the `_save` and `_delete` functions necessary to edit and delete the individual instance.

### The Database Structure
To function properly, this library must be used in Sheets with a header in the first row and data present in subsequent rows. Additionally, it is advisable to use snake case for header names without using special characters. In the event of a conflict with these rules, the library will transform the format of the header names without modifying the value in the sheet. So it's possible that within the logs you may find headers written differently than how they are written in the database.

### The id Field
The `_save`, `_delete`, and other methods such as the `_find` method require the presence of the `id` field in the database for it to work properly. Without the `id` field, most of the functionalities will not work, and therefore, the use of this library is not recommended.

### The Query Syntax
In some Orma methods, it's possible to use a query to locate one or more records in the database. The query syntax is straightforward to use because it's nothing more than a boolean expression that accepts every operator available in JavaScript.

The only distinction this syntax has from the traditional JavaScript one lies in the need to refer to an object (the object or objects you want to check if it satisfies the query) using the following notation: {}."

Example:
```JavaScript
const q = `{}.name === "Matteo"`;
//This query verifies that the object's name to be analyzed is 'Matteo'. 
```
# Usage


## Installation

To install Orma insert this script id in the library section of your Google Apps Script Project.
```bash
  1CA-kvfiZjY2Ex2C84hL46Vn2F8GijPbfSy9J3vZQUzzbal5ExhQyG0Z7
```


## Open Databases and Tables
In this section you will learn to open `Databases` (Spreadsheet) and then `Tables` (Sheets). As mentioned above `Databases` are instances of the `Spreadsheet` Class and `Tables` are instances of the `Sheet` Class.
### Open a database
A database in the Orma library is a Spreadsheet instance with embedded more methods, so is important to understand that you can use this entity as a Spreadsheet instance and not only as an Orma Database.
```javascript
  const ssId = "your_spreadsheet_id";
  const db = ORMA.openDbById(ssId);
```

### Open a table 
For example you want to get the "users" sheet to retrieve some data.
You need to call the _getTables function to get all the available tables in the database and then extract the needed one.
```javascript
  const tables = db._getTables();
  const {users} = tables;
```

## Crud Operations
In this section, you will learn how to handle all the CRUD operations available in the Orma library.

### Get All 
This function will return all the values present in the table.


```javascript
  const allUsers = users._all();
  const data = allUsers.data;
```


### Get By Id 
This function will return the record corresponding to the indicated id.
```javascript
const userById = users._find(1);
```
[Click here](#Data-Structure) to understand the data structure of the response.

### Get First By
This function will return the first record whose column specified in the function matches the indicated value.
```javascript
const firstUserBy = users._firstBy("name","Matteo")
```
[Click here](#Data-Structure) to understand the data structure of the response.

### Get First By Query
This function will return the first record that exhibits an exact match with the query.
```javascript
const firstUserByQuery = users._firstByQuery(`{}.email !== "matteo@sintropia.io"`)
```
[Click here](#Data-Structure) to understand the data structure of the response.

[Click here](#The-Query-Syntax) to understand the query syntax.
### Find Many By 
This function will return all the records whose column specified in the function matches the indicated value.
```javascript
const manyUsersBy = users._findManyBy("name","Matteo");
const data = manyUsersBy.data;
```
[Click here](#Data-Structure) to understand the data structure of the response.

### Find Many By Query 
This function will return all records whose column specified in the function matches the indicated value.
```javascript
const manyUsersByQuery = users._findManyByQuery(`{}.name === "Matteo"`)
const data = manyUsersByQuery.data;
```
[Click here](#Data-Structure) to understand the data structure of the response.

[Click here](#The-Query-Syntax) to understand the query syntax.

### Create 
This function will create a new instance in the database and return it as an object.
```javascript
const newUser = users._create(
    {
        id: users._id(),
        name: "Matteo",
        email: "matteo@sintropia.io",
        password: ENDO.hash("superPassword1!")
    }
)
```
[Click here](#Data-Structure) to understand the data structure of the response.

### Create Many 
This function will create new instances in the database and return them as an object.
```javascript
const newUsers = users._createMany(
    [
        {
            id: users._id(),
            name: "Matteo",
            email: "matteo@sintropia.io",
            password: ENDO.hash("superPassword1!")
        },
        {
            id: users._id()
            name: "Daniele",
            email: "daniele@sintropia.io",
            password: ENDO.hash("superPassword1!")
        },
    ]
)
```
[Click here](#Data-Structure) to understand the data structure of the response.

### Edit a single record
To modify an instance, simply modify it after obtaining it and then invoke the `_save` function.
```javascript
const user = users._find(1);
user.name = "Luca";
user._save(); 
```

To modify an instance obtained from an array with other instances, you will first need to access the instance you want to modify and then invoke the `_save` function bounded in the instance object."

```javascript
const manyUsersBy = users._findManyBy("name","Matteo");
const data = manyUsersBy.data;
const firstElement = data[0];
firstElement.name = "Luca";
firstElement._save();
```

### Edit in bulk
To edit all records present in an array of objects in bulk, it will be necessary first to modify them all by iterating through the data property, and then invoke the _save function present in the main object.

```javascript
const manyUsers = users._findManyBy("name","Matteo");
for(let el of manyUsers.data){
    el.name = "Massimo"
}
allUsers._save();
```

### Delete a single record
To delete a single record, simply invoke the `_delete` function available in the object of the instance to be deleted.

```javascript
const user = users._find(1);
user.name = "Luca";
user._delete(); 
```

### Delete in bulk
To delete multiple elements simultaneously after obtaining them, simply invoke the `_delete` function present in the main object."
```javascript
const manyUsers = users._findManyBy("name","Matteo");
allUsers._save();
```
## Other Functions
This section provides various functions designed to facilitate the use of the Orma library, making the user's work simpler and more efficient.

### ID Generator
Orma allows generating unique identifiers for each table. It supports two modes for generating identifiers: using incremental numeric IDs or unique UUIDs (Universal Unique Identifiers). The UUID format used is a modified version created by Orma to further minimize the possibility of creating duplicate values.

```javascript
const id = users._id() // UUID version
const incremental = users._id() // Incremental Version
```

### Hashing
This function allows you to hash values as passwords.
```javascript
const password = "123456";
const hashedPassword = ORMA.hash(password);
```
You can also use a salt value to hash values and maximise the security.
```javascript
const password = "123456";
const email = "matteo@sintropia.io"
const hashedPassword = ORMA.hash(password, email);
```











## Authors

- [@sintropia](https://www.github.com/sintropia)


## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Feedback

If you have any feedback, please reach out to us at matteo@sintropia.io


## 🔗 Links
[![sintropia](https://img.shields.io/badge/sintropia.io-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://sintropia.io/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/matteoimperiale)


