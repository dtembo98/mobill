import { create } from "apisauce";

const apiClient = create({
    baseURL:'http://mobill-api.herokuapp.com/api/v1',
})

export default apiClient