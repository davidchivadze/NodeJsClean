import mysqlConnection from '../../Domain/Connection/Connection';
import ProductService from '../../Services/Products/Product.Service';
import e from 'express';
function SetImagesReturnResultValue(product, images) {
    product.Images = [];
    product.Images.push(images);
    returnResult.push(product);
}

export const AddProduct = async (req, res, next) => {
    var body = req.body;
    console.log(body);
    ProductService.SaveProduct(body, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: err
            })
        } else {
            new Promise((resolve,reject)=>{
             
                for(var i=0;i<body.Images.length;i++){
                ProductService.AddProductImage(result.insertId,body.Images[i],(err,resultImage)=>{
          
                    if(err){
                        console.log(err);
                        reject(err);
                    }

                    if(i===body.Images.length){
                        resolve("Success");
                    }
                })
            }
            }).then((message)=>{
                console.log(message);
                return res.status(200).json({
                    success: 1,
                    message: "Successfully Add"
                })
            }).catch((error)=>{
                console.log("error");
                return res.status(500).json({
                    success:0,
                    message:error
                })
            })

        }
    })
};
export const GetAllProduct = async (req, res, next) => {
    var body = req.query;
    console.log(body);
    const returnResult = [];
    ProductService.GetAllProducts(body, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: err
            })
        } else {
            const addElementsToForeach = new Promise((resolve, reject) => {
                result.forEach((element, index, array) => {
                    ProductService.GetProductImages(element.ID, (err, images) => {
                        new Promise((resolve,reject)=>{
                            var returnImages=[];
                            images.forEach((image,index,array)=>{
                                returnImages.push(image.Image);
                                if(index===array.length-1){
                                    resolve(returnImages);
                                }
                            })
                        }).then((images)=>{
                            element.Images = images;
                        });
                            
                    
                        returnResult.push(element);
                        if (index === array.length - 1) {
                        resolve();
                    }
                    });

                });
        })
    addElementsToForeach.then(()=>{
       
        return res.status(200).json({
            success: 1,
            products: returnResult,
        })
    })


}
     })
 }
 export const GetEditProduct=async(req,res,next)=>{
     const product=null;

     new Promise((resolve,reject)=>{
         ProductService.GetEditProduct(req.body.ProductID,(err,result)=>{
             if(err){
                reject(err);
             }else{            
                resolve(result);
             }
         })
       
     }).then((result)=>{
   
         new Promise((resolve,reject)=>{
          
             ProductService.GetProductImages(result.ID,(err,response)=>{
                 if(err){
                     reject(err);
                 }else{
                    
                     resolve(response);
                 }
             });
         }).then((imagesResult)=>{
             result.Images=imagesResult;
            
             return res.status(200).json({success:1,product:result});
         }).catch((err)=>{
         
             throw err;
         })
     }).catch((err)=>{       
         return res.status(500).json({success:0,Error:err})
     })
 }