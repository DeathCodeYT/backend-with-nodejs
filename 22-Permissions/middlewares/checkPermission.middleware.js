import { Permission } from "../model/permission.model.js";
import { ApiError } from "../utils/ApiError.js";


export async function checkPermissions(perm,user){ // perm = "PERMISSIONL.BLOG.EDIT"
    if(user.role.value=="admin") return true
    const  p = await Permission.findOne({value:perm})
    if(!p){
        throw new ApiError(401,"Permission doesn't Exist")
    }
    const hasRolePermission = user.role.permissions.some((per)=>per.value==p.value)
    if(hasRolePermission) return true
    const hasUserPermission = user.permissions.some((per)=>per.value==p.value)
    if(hasUserPermission) return true

    return false
}

