export class ApiError{
    constructor(statusCode=500,message="Something went wrong",data=null,errors=[],stack=""){
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = false
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}