


class Utils {

  

    static tokenVerify(req,res,next){
      try{
        const token = req.headers["authorization"];
       // console.log("token -------",token)
        if(token){
           req.user = {
            name:"ranjeet",
            id:12,
           }
           next()
        }else{
            throw new Error("invild token")
        }
      }catch(err){
        throw new Error(err);
      }
    }
}
module.exports = Utils;