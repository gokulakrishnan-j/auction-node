import { generator,auth } from "../index.js";
import express from 'express'

const Router = express.Router()

Router.get('/',auth,async function(request,response){
  
    var roomId = generator.generate({
      length: 4,
      numbers: true
    });
  
    response.send({roomId:roomId})
    
  
  })
  export default Router