import { body, validationResult } from "express-validator";

export const ValidateRequest = async (req, res, next) => {

    const rules = [

        body('cmpName').trim().notEmpty().withMessage("Please enter the name of the company"),
        body('category').trim().notEmpty().withMessage("Please select a category"),
        body('location').trim().notEmpty().withMessage("Please enter the location"),
        body('salary').trim().notEmpty().withMessage("Please enter a valid salary"),
        body('noOfPos').trim().notEmpty().isFloat({gt:0}).withMessage("Please enter a valid opening"),
        body('skills').isArray().withMessage("Please check atleast two skills"),
        body('lastDate').isDate().withMessage("Enter a valid date"),
        body('imageUrl').custom((value,{req})=>{
            if(!req.file){
                throw new Error("Image is required")
            }else{
                return true;
            }
        })
    ];

    await Promise.all(rules.map(rule => rule.run(req)));

    var validateErrors = validationResult(req);

    if(!validateErrors.isEmpty()){

        return res.render('postjob', { errMsgs: validateErrors.array() , user:req.session.userEmail });
        
    }else{
       return next();
    }

}