export class ApiResponse{
    constructor(statusCode=200,success=true,data=null,message="",otherData=null){
        this.statusCode = statusCode
        this.success = success
        this.data = data
        this.message = message
        this.otherData = otherData
    }
}