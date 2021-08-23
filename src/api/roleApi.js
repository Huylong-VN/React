import axiosClient from "./axiosClient"

const roleApi={
    getAll:async(params)=>{
        const url="/roles";
        return await axiosClient.get(url,{params,headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    }
}

export default roleApi;