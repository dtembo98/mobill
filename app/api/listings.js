import client from "./client";
const endpoint = '/products'

const getListings = () => client.get(endpoint)


const addListing = (listing ,onUploadProgress)=>{
    const data = new FormData()
    data.append('title',listing.title)
    data.append('price',listing.price)
    data.append('quantity',listing.quantity)
    data.append('description',listing.description)
    data.append('barcode',listing.barcode)
    listing.images.forEach((image,index) =>
    data.append('file',{
        name:'file.jpg',
        type:'image/jpeg',
        uri:image
    }))
  

//     if(listing.barcode)
// {
//     data.append('barcode',JSON.stringify(listing.barcode))
//     console.log(" hey",listing.barcode)

// }
return client.post(endpoint,data,{
    onUploadProgress:(progress) =>onUploadProgress(progress.loaded / progress.total)
})
}

const getProduct = (barcode) =>
{
   return client.get(`${endpoint}/barcode/${barcode}`)
}
const buyProduct = (barcode,data) => {
  
    return client.post(`${endpoint}/buy/${barcode}`,data)
}

const checkSaleStatus = (id) =>
{
    
    return client.get(`${endpoint}/status/${id}`)
} 

export default {
    getListings,
    addListing,
    getProduct,
    buyProduct,
    checkSaleStatus
}