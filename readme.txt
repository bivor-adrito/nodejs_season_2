Bongo Dev

Data

FrontEnd / UI
    HTML
    CSS
    JS => REACT Js, Next JS

Back End 
    JS => Node Js, Express JS, Nest JS
    Handles the logical part
    Form 
        Name
        Email
        Gender
        Submit Button

    Data Store => Database => NoSQL

    FB Profile

Deployment => Operations => DevOps
    AWS

What is backend and what do we handle?
Node Js
1. How to set up Node JS?
    node --version
    npm --version

4. First app without Database
5. First app with Database
6. Auth
7. To Do app
8. Marketplace app

MERN
    1. Mongo
    2. Express Js
    3. React js
    4. Node Js
2. Create first server
    First node js app
    Create a file

3. Basics API and Requests and CRUD
    C=Create => POST
    R=Read => GET
    U=Update => PUT
    D=Delete => Delete

ADDR: 
    http://localhost:3002/

Commands:
 npm init
 npm init -y 
 npm i express --save
 npm i nodemon --save-dev
 npm i body-parser --save
 npm i mongoose --save
 npm i dotenv --save
 npm i jsonwebtoken --save
 npm i bcrypt --save
 npm install --save multer
 npm i express-validator --save

Git commands:
 git init
 git add .
 git commit -m "this is my first commit"
 git add origin "link"
 git push -u origin main


.gitignore


Connect with mongo db 
    1. Create an account in mongodb atlas
    2. Create a project
    3. Create a cluster

Task 1: Simple To-Do App:
 0. Create a new collection named tasks
 1. We will be able to create a Task
 2. We will be able to see all the tasks
 3. We will be able to see one task
 4. We will be able to change the task status from to-do => in-progress => done
 5. We will be able to delete a task

 task: {
    title: String,
    description: String,
    status: String,
    createdAt: Date[UTC],
    updatedAt: Date[UTC],

 }

 password101 => KEY => fsdlkjgaklajfhadljkthcjihxcfkjbckljfh


 Simple Marketplace App [Single Vendor]:
    There will be two types of users
        1. Admin
        2. Customer

    Admin will be able to create a product
    Admin will be able to upload an image on the product
    Admin will be able to update a product
    Admin will be able to see all the products
    Admin will be able to see a specific product
    Admin will be able to delete a product


    Customer will NOT be able to create a product
    Customer will NOT be able to upload an image on the product
    Customer will NOT be able to update a product
    Customer will be able to see all the products
    Customer will be able to see a specific product
    Customer will NOT be able to delete a product


User: {
    type: Admin, Customer
}

product: {
    name: String
    desc: String
    madeIn: String
    price: Number,
    userId: Mongodb Object
    fileId: MongoDb Object
}

file: {
    name: String,
    path: String
}

order: {
    productId: Mongodb Object,
    userId: Mongodb Object,
    qty: Number,
    total: Number,
    purchaseDate: Date,
    location: String.
    expectedDeliveryDate: Date,
    status: String [delivered, in-progress]
}
