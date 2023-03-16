import { auth,jwt,genHashedPassword ,bcrypt} from "../index.js";
import express from 'express'
import { creatingUsers, getingUserName, storingInDb, gettingToken, deletingToken } from "../service/auction.service.js";
import * as dotenv from "dotenv"
dotenv.config()

const Router = express.Router()

async function createUser(userDetails){
    const user = await creatingUsers(userDetails)
   // returning boolean value
    return user
   }
   


   //geting username from database
async function getUserName(email){
       const users = await getingUserName(email)
       //returning a username
       return users
   }

Router.post("/signup",async function (request,response){
    const {username,password,email} = request.body
 
  
   
    // getting username from database to check it already exit
    const userFromDB = await getUserName(email)
 
    //validating if username is already exit
    if(userFromDB){
     response.status(400).send("username alreay exists")
    }
    //validating is password is not lesser then 8 character
    else if(password.length < 8){
     response.status(400).send("password must be 8 characters")
    }
    
    else{
     // getting send and geting hash password
     const hashedPassword=await genHashedPassword(password)
     
     //creating a user by name and hash password
     const result = await createUser({
         username:username,
         password:hashedPassword,
         email:email
     })
     response.send(result)
    }
 })


Router.post("/login",async function (request,response){
    const {email,password}=request.body

    // getting username from database to check it already exit
    const userFromDB = await getUserName(email)

    if(!userFromDB){
        response.status(401).send("Invalid credentials")
    }
    else{
        const storedDBPassword = userFromDB.password
        
        const isPasswordMatch= await bcrypt.compare(password,storedDBPassword)

        if(isPasswordMatch){
            const token = jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)

            const storeTokenInDB = await storingInDb(userFromDB, token)
           
            response.send({message : "successful login"})


        }
        else{
            response.status(401).send("Invalid credentials")
        }


    }
})


Router.get("/token/:email",async function(request,response){

    const {email} = request.params
            
    const getToken = await gettingToken(email)
    
   
    response.send(getToken)
})

Router.delete('/delete/:email',auth,async function(request,response){
    const {email} = request.params
    
    const token = await deletingToken(email)
        
          response.send("done")
    
        
        })

export default Router


