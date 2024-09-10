import * as fs from 'fs'

// Writing in File ------------------------
//// Blocking Code
// fs.writeFileSync('./file.txt','Hello, Devs')

// console.log("1")
// fs.writeFile('./file.txt',"Hello, Dosto\nDon't Forget to Subscribe",(err)=>{
//     console.log("File Writing COmplete")
// })
// console.log("2")

// Reading a File ------------------------

// blocking
    // console.log(1)
    // const text = fs.readFileSync("./file.txt","utf-8")
    // console.log(text)
    // console.log(2)

//non-blocking
    // console.log(1)
    // fs.readFile("./file.txt","utf-8",(err,text)=>{
    //     if(err){
    //         console.log("Something Went wrong when reading this file")
    //         return
    //     }
    //     console.log(text)
    // })
    // console.log(2)

// Append in file ------------------------
// Blocking Code
    // console.log(1)
    // fs.appendFileSync("./file.txt","This is Text\n")
    // console.log(2)
// Non-Blocking Code
    // console.log(1)
    // fs.appendFile("./file.txt","This is Text\n",(err)=>{
    //     console.log("Appending Complete")
    // })
    // console.log(2)

// Copy a file ------------------------
// fs.cpSync('./file.txt',"./copy.txt")

// Delete a File ----------------
    // fs.unlinkSync('./copy.txt')
