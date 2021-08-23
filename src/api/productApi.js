import axiosClient from "./axiosClient"

const productApi=({
    getAll:async(params)=>{
        const url='/products/paging';
        return await axiosClient.get(url,{params,headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    add: async(params)=>{
        const url='/products/create';
        return await axiosClient.post(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token"),
        }})
    },
    delete:async(params)=>{
        const url='/products/'+params;
        return await axiosClient.delete(url,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    update:async(params)=>{
        const url='/products/';
        return await axiosClient.put(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    GetCategoryAssign: async(params)=>{
        const url='/products/categoryassign/'+params;
        return await axiosClient.get(url,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    CategoryAssign:async(params)=>{
        const url='products/categoryassign';
        return await axiosClient.post(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    ListImage: async(params)=>{
        const url='products/ProductImage/'+params;
        return await axiosClient.get(url,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    AddImage:async(params)=>{
        const url='products/image/';
        return await axiosClient.post(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    DeleteImage: async(params)=>{
        const url='products/ProductImage/'+params;
        return await axiosClient.delete(url,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    GetById: async(params)=>{
        const url="products/Detail/"+params;
        return await axiosClient.get(url)
    }
})
export default productApi