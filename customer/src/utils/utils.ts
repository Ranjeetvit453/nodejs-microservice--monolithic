

export class Utils {

    static tokenVerify(req:any,res:any,next:any){
        try{
          const token = req.headers["authorization"];
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
            const error:any = err
          throw new Error(error);
        }
      }
}