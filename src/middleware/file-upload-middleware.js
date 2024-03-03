import multer from "multer";

const imageUploadConfig = multer.diskStorage({destination:(req,file, cb)=>{
    cb(null, 'public/resources/images/');
}, 
filename:(req, file, cb)=>{
    const name = Date.now()+'-'+file.originalname;
    cb(null, name);
}});


const pdfUpoloadConfig = multer.diskStorage({destination:(req, file, cb)=>{
    cb(null, 'public/resources/pdfs');
}, 
filename:(req, file, cb)=>{
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
}})

export const uploadImage = multer({storage:imageUploadConfig});
export const uploadResume = multer({storage:pdfUpoloadConfig});