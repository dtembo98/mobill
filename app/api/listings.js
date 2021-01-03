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

    if(listing.location)
{
    data.append('location',JSON.stringify(listing.location))
}
return client.post(endpoint,data,{
    onUploadProgress:(progress) =>onUploadProgress(progress.loaded / progress.total)
})
}

export default {
    getListings,
    addListing
}