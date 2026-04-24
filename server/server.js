 
const app = require("./src/app.js")
 
 

const PORT = process.env.PORT || 3000


async function startServer() {
    try{
// Db coonection goes herer
 

const server = app.listen(PORT,()=>{
    console.log("Server is running on port :",PORT)
})

server.on("err",(error)=>{
    console.error(error)
    process.exit(1);

})

    }catch(err){
console.error("Failed to start server",err)
process.exit(1)
    }
}

startServer()