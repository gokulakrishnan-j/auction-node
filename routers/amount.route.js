import { auth } from "../index.js"
import express from 'express'
import { checkingAnount, postingAmount, getingAmount, edtingAmount, deletingAmount } from "../service/amount.service.js"

const Router = express.Router()

Router.post('/',auth,async function(request,response){
    const {team} = request.body
 const checkAmount = await checkingAnount(team)

   if(!checkAmount){
   const amount = await postingAmount(request)
  
    response.send("ok")
   }
  })

Router.get('/',auth,async function(request,response){
   
     const amount = await getingAmount()
    
      response.send(amount)
      
    
    })
Router.put('/:team',auth,async function(request,response){
   const {team} = request.params
   const data = request.body
   const amount = await edtingAmount(team, data)
       
         response.send(amount)
   
       
       })

Router.delete('/delete',auth,async function(request,response){
        const amount = await deletingAmount()
            
              response.send(amount)
        
            
            })

export default Router


