export default class JobModel{
    constructor(id,cmpName,category,designation,location,salary,noOfPos,skills,lastDate,imageUrl,postedBy,postedOn){
        this.id = id;
        this.cmpName=cmpName;
        this.category=category;
        this.designation=designation;
        this.location=location;
        this.salary=salary;
        this.noOfPos=noOfPos;
        this.skills=skills;
        this.lastDate=lastDate;
        this.imageUrl=imageUrl;
        this.postedBy=postedBy,
        this.postedOn=postedOn
    }

    static getJobs(){
        return jobs;
    }

    static getCompanyById(id){
        let job = jobs.filter(j => { return j.id == Number(id) });
        return job[0];
    }

    
    static updateJobById(jobId, cmpName, category, designation, location, salary, noOfPos , skills, lastDate, imageUrl, postedBy, postedOn){
        
        const index = jobs.findIndex(j=> j.id==jobId);

        const updatedJob = new JobModel(Number(jobId),cmpName,category,designation,location,salary,Number(noOfPos) ,skills,lastDate,imageUrl,postedBy,postedOn);

        jobs[index] = updatedJob;


    }

    static createJob(cmpName, category, designation, location, salary, noOfPos ,skills, lastDate, imageUrl, postedBy, postedOn){
        var id = Date.now() + jobs.length + 1;

        const newJob = new JobModel(Number(id),cmpName,category,designation,location,salary,Number(noOfPos),skills,lastDate,imageUrl,postedBy,postedOn);
       
        jobs.push(newJob);
       
    }

    static deleteJobById(id){
        jobs = jobs.filter(job => { return job.id!==Number(id)})
    }
}


var jobs = [
    new JobModel(1,'Coding Ninjas','Tech','SDE','UNITECH CYBER PARK, Unit 007 - 008, GF, Tower A, Sector 39, Gurugram, Haryana 122003', '14-16 LPA', 5 , ['React','NodeJS','Express','MongoDB','AWS'],'30 Aug 2023', 'https://files.codingninjas.in/0000000000000723.jpg','hdebasish@gmail.com', '10/7/2023, 12:48:48 PM'),
    new JobModel(2,'Apple', 'Tech', 'Frontend Developer', '1 Infinite Loop, Cupertino, California','50-60 LPA', 10, ['Java', 'Angular', 'Javascript'], '15 Nov 2023', 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-500x281.png','hdebasish@gmail.com','10/7/2023, 12:48:48 PM'),
    new JobModel(3,'Google', 'Tech', 'Backend Developer', '1600 Amphitheatre Parkway in Mountain View, California','47-58 LPA', 17 , ['React', 'Angular', 'MongoDB'], '19 Nov 2023', 'https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/191:100/w_1280,c_limit/google-logo.jpg','john@gmail.com','10/7/2023, 12:48:48 PM'),
    new JobModel(4,'Microsoft', 'Non Tech', 'HR', '807, New Delhi House, Barakhamba Road, New Delhi – 110001, India','30-50 LPA', 4 , ['MongoDB', 'AWS', 'NodeJS'], '12 Dec 2023', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png','abc@xyz.com','10/7/2023, 12:48:48 PM')
];