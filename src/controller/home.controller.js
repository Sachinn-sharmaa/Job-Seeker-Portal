import JobModel from "../models/job.models.js";
import ApplicantModel  from "../models/applicants.models.js";
import UsersModel from "../models/users.models.js";
export default class HomeController{

    getLogin(req, res){
        // console.log(req.session.userEmail);
        res.render("home", {user:req.session.userEmail});
    }

    getJobsPage(req, res){
        const jobs = JobModel.getJobs();
        
        res.render("jobs", {jobs:jobs, user:req.session.userEmail});
    }

    getApplicants(req, res){
        const id = req.params.id;
        const applicants = ApplicantModel.getApplicantsByCmpId(id);
        res.render('applicants', {applicants , user:req.session.userEmail});
    }

    getPostJob(req, res){
        res.render("postjob",{ errMsgs: null, user: req.session.userEmail});
    }

    getJobDetails(req, res){
        let JobId = req.params.id;
      
        let job = JobModel.getCompanyById(JobId);
     
        let noOfApplicants = ApplicantModel.getNoOfApplicantsByCmpId(JobId);
        
        // console.log(req.session.userEmail);
        res.render("jobdetails", {job:job, applicants:noOfApplicants, user:req.session.userEmail});
    }

    getUpdateJob(req, res){
        let jobId = req.params.id;
        let job = JobModel.getCompanyById(jobId);
        res.render("updatejob", {job:job,errMsgs:null, user:req.session.userEmail,});
    }


    postApplicant(req, res){
        const {name, email , phonenumber, cmpId} = req.body;
        
        const resume = "resources/pdfs" + req.file.filename;
        ApplicantModel.createApplication(name , email, phonenumber, resume, cmpId);
        res.redirect("/jobdetails/"+ cmpId);
    }

    postCreateJobs(req, res){
        
        const {cmpName, category, designation, location, salary,noOfPos, skills, lastDate, postedBy, postedOn} = req.body;
    
        const imageUrl = "/resources/images/" + req.file.filename;
        JobModel.createJob(cmpName, category, designation, location, salary, noOfPos ,skills, lastDate, imageUrl, postedBy, postedOn);
        res.redirect("/jobs");
    }
    
    postUpdatedJob(req, res){
        let jobId = req.params.id;
        const { cmpName, category, designation, location, salary, noOfPos , skills, lastDate, postedBy, postedOn } = req.body;
        const imageUrl = "/resources/images/" + req.file.filename;
        JobModel.updateJobById(jobId, cmpName, category, designation, location, salary, noOfPos , skills, lastDate, imageUrl, postedBy, postedOn);
        let job = JobModel.getCompanyById(jobId);
        let noOfApplicants = ApplicantModel.getNoOfApplicantsByCmpId(jobId);
        res.render('jobdetails', { job:job, applicants:noOfApplicants, user:req.session.userEmail });
    }

    postDeleteJob(req, res){
        JobModel.deleteJobById(req.params.id);
        res.redirect('/jobs');
    }


    




}