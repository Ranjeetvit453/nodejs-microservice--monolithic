const { Router } = require("express");
const UserController = require("../controller/userController");
const UserValidation = require("../validation/userValidation");
const Utils = require("../Utils/utils");
const ErrorHandler = require("../globalMiddleware/errorHandle")
 

 class UserRouter{

  constructor(){
    this.router = Router();
    this.getRouter();
    this.postRouter();
    this.putRouter();
    this.patchRoter();
    this.deleteRouter()
  }


  getRouter(){
    
    this.router.get("/product-list",
    //Utils.verifyToken,
    ErrorHandler.handelError,
    UserController.productList)
    this.router.get("/user-list/:pages",
    Utils.verifyToken,
    UserController.userList)
  }

  postRouter(){
    this.router.post("/login",
    //Utils.verifyToken,
    UserValidation.UserLogin(),
    ErrorHandler.handelError,
    UserController.userLogin)

    this.router.post("/register",
    UserValidation.register(),
    ErrorHandler.handelError,
   UserController.register)

    this.router.post("/create-product",UserValidation.addProduct(),ErrorHandler.handelError,UserController.addProduct)
  }
  putRouter(){

  }
  patchRoter(){
   this.router.patch("/user-update",
   Utils.verifyToken,
     UserController.userUpdate)
  }
  deleteRouter(){
   this.router.delete(
    "/user-delete/:id",
    Utils.verifyToken,
     UserController.userDelete
    )
  }
}
 
module.exports =  new UserRouter().router;