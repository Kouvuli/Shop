import cartService from "../../services/cartService";
const apiControllers = {
   
   async addToCart(req, res){
       const userId = req.user||req.sessionID
       const productId= req.body.productId 
       await cartService.addToCart({userId, productId} ) //userId:userId
       res.json({success:true})

   }
};
export default apiControllers;
