import express from "express";
import ejslayout from "express-ejs-layouts";
import path from "path";
import  HomeController from "./src/controller/home.controller.js";
import session from 'express-session';
import { setlastVisit } from "./src/middleware/setlastVisit.middleware.js";
import cookieParser from "cookie-parser";
import { auth } from "./src/middleware/auth.middleware.js";
import { uploadImage, uploadResume } from "./src/middleware/file-upload-middleware.js";
import UserController from "./src/controller/user.controller.js";
import { ValidateRequest } from "./src/middleware/validation.middleware.js";


const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(ejslayout);   


// making instances 
const homecontroller = new HomeController();
const usercontroller = new UserController();


// Parse form data
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

//cookie parser
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
//session middleware

app.use(session({
    secret: "thisismysecrctekey",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));


app.get("/", homecontroller.getLogin);
app.get("/jobs", setlastVisit, homecontroller.getJobsPage);
app.get('/jobdetails/:id', homecontroller.getJobDetails);
app.get('/applicants/:id', auth, homecontroller.getApplicants);
app.get("/logout", usercontroller.logout);
app.get("/postJob", homecontroller.getPostJob);
app.get("/updatejob/:id",auth, homecontroller.getUpdateJob);

app.post('/apply', uploadResume.single('resume'), homecontroller.postApplicant);
app.post("/register", usercontroller.postRegister);
app.post("/", usercontroller.postLogin);
app.post("/jobs",uploadImage.single('imageUrl'), ValidateRequest, homecontroller.postCreateJobs);
app.post('/jobdetails/:id', auth, uploadImage.single('imageUrl'), ValidateRequest, homecontroller.postUpdatedJob);
app.post('/deletejob/:id', auth, homecontroller.postDeleteJob);
app.listen(3100, ()=>{
    console.log("server is running at port 3100");
});

