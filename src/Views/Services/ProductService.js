const ProductService=()=>{
const  promise = new Promise(function(resolve,reject){

        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(data =>resolve(data))
        .catch(error=>reject(error))
    })
return promise;
}

export default ProductService;