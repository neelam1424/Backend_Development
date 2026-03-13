

//Handling async await with Promise

const asyncHandler= (reqHandler) => {
    return (req,res,next) => {
        Promise.resolve(reqHandler(req,res,next)).catch((err)=> next(err))
    }
}
export { asyncHandler}







// asyncHandler using
//higher order function(function which can accept functions as parameters also and also can return them)
// const asynchandler = () => {}
// const asyncHandler = (func) => {()=>{}}
// const asynchandler = (func) => () => {}

// try catch 


// const asyncHandler = (fn) => async(req,res,next) =>{
//     try {
//         await fn(req,res,next)
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             sucess: false,
//             message: error.message
//         })
        
//     }
// }