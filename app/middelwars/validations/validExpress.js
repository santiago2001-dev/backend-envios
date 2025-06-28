const {validationResult} = require('express-validator');
const validExpress= (req,res,next)=>{
    const existeError = validationResult(req);
    if(!existeError.isEmpty()){
        return res.status(400).json({error : existeError});
    }

    next();


}


module.exports= {validExpress}