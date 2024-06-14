import { api } from "@/lib/api-client"

export const loginUserByUserNameandEmail = async (data) => {
    // try {
        const result = await api.post("/auth/login",data)
        return result
    // } catch (error) {
    //     throw new Error(error)
    // }
}
