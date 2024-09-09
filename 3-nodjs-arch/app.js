
// Blocking Code
    // console.log("start")
    // let date = Date.now()
    // while(Date.now()-date<3000){
    //     // console.log("wait...")
    // }
    // console.log("process completed")

// Non-Blocking Code
    console.log("start non blocking")
    setTimeout(()=>{
        console.log("Process Completed")
    },3000)
    console.log("hello js")