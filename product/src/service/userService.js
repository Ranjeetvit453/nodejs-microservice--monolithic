const user = require("../model/userModel")
const product =require("../model/productModel")
module.exports = class UserService{
   
    static async userUpdate(data){
      try{ 
        const userRes = await user.findOneAndUpdate({_id:data.id},data,{new: true,upsert: true });
        let sendRes 
           if(userRes){
            sendRes = {
              status:200,
              message:"user update successfully "
            }
           }else{
            sendRes = {
              status:500,
              message:"some technocal problem"
            }
           }
           return sendRes
      }catch(err){
        throw new Error(err);
      }
    }

  static async userList(pages){
    try{
     const  page = pages;
     const limit = 10;
      //const resSave = await user.find().select("_id name email mobile");
      const [{paginatedResult,  totalCount }] = await user.aggregate(
        [{
        $facet: {
          paginatedResult: [
            { $skip: ((page - 1) * limit) },
            { $limit: limit * 1 }
          ],
          totalCount: [
            { $count: 'totalCount' }
          ]
        }
      }]
      )
      
      let sendRes 
      if(paginatedResult.length>0){
          const [count] = totalCount;
          const pages =Math.ceil(count?.totalCount/limit);
          // (int) Math.Ceiling((double) imagesFound.Length / PageSize);

       sendRes = {
         status:200,
         data:paginatedResult,
         totalCount:pages,
         message:" user List  "
       }
      }else{
       sendRes = {
         status:200,
         data:[],
         totalCount:0,
         message:"data not found"
       }
      }
      return sendRes
   }catch(err){
       throw new Error(err)
   }
  }


  static async userDelete(id){
    try{
      const userRes = await user.findOneAndDelete({_id:id});
      let sendRes 
         if(userRes){
          sendRes = {
            status:200,
            message:"user delete successfully "
          }
         }else{
          sendRes = {
            status:500,
            message:"some technocal problem"
          }
         }
         return sendRes
    }catch(err){
      throw new Error(err)
    }

  }
    

    static async userLog(data){
        try{
           const resSave = new user(data);
           const userRes = resSave.save();
           let sendRes 
         if(userRes){
          sendRes = {
            status:200,
            data:userRes,
            message:"user login successfully "
          }
         }else{
          sendRes = {
            status:500,
            data:[],
            message:"some technocal problem"
          }
         }
         return sendRes
        }catch(err){
            next(err);
        }
    }

    static async addProduct(data){
        try{
           const resSave = new product(data);
           const userRes = await resSave.save();
           let sendRes 
         if(userRes){
          sendRes = {
            status:201,
            data:userRes,
            message:"add product successfully "
          }
         }else{
          sendRes = {
            status:500,
            data:[],
            message:"some technocal problem"
          }
         }
         return sendRes
        }catch(err){
            next(err);
        }
    }

    
    static async register(data){
        try{
           const resSave = new user(data);
           const userRes = await resSave.save();
           delete userRes.password;

           let sendRes 
         if(userRes){
          sendRes = {
            status:201,
            data:userRes,
            message:"user register successfully "
          }
         }else{
          sendRes = {
            status:500,
            data:[],
            message:"some technocal problem"
          }
         }
         return sendRes
        }catch(err){
            next(err);
        }
    }

    static async productList(){
        try{
            const resSave = await product.find();
            let sendRes 
            if(resSave.length>0){
             sendRes = {
               status:200,
               data:resSave,
               message:" product List  "
             }
            }else{
             sendRes = {
               status:200,
               data:[],
               message:"data not found"
             }
            }
            return sendRes
         }catch(err){
             next(err);
         }
    }

    
}