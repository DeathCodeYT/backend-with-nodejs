import fs from 'fs'
import path from 'path'
import mime from 'mime-types'
import axios from 'axios'
export const uploadFileOnBunny = async(directoryPath,file)=>{
    try {
        if(!file) return null
        const fileSteram = fs.createReadStream(file.path);
        const fileExtension = path.extname(file.originalname).slice(1)

        const uri = `https://sg.storage.bunnycdn.com/deathcode-temp/${directoryPath}/${file.filename}`
        const contentType = mime.lookup(fileExtension) || "application/octet-stream"

        const resp = await axios.put(uri,fileSteram,{
            headers:{
                AccessKey:process.env.BUNNY_ACCESS_KEY,
                "content-type":contentType
            }
        })
        fs.unlinkSync(file.path)
        // console.log(resp)
        return {
            success:true,
            url: `https://deathcode-temp.b-cdn.net/${directoryPath}/${file.filename}`,
            public_id: file.filename,
            message:"File Uploaded"
        }
    } catch (error) {
        fs.unlinkSync(file.path)
        console.log(error);
        return null
    }
}
export const deleteFileFromBunny = async(directoryPath,fileId)=>{
    try {
        const uri = `https://sg.storage.bunnycdn.com/deathcode-temp/${directoryPath}/${fileId}`
        const resp = await axios.delete(uri,{
            headers:{
                AccessKey:process.env.BUNNY_ACCESS_KEY,
            }
        })

        // console.log(resp)
        return {
            success:true,

            message:"File Deleted"
        }
    } catch (error) {
        console.log(error);
        return null
    }
}