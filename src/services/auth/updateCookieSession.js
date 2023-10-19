import axiosInstance from "../../utils/axiosInstance";
import { SESSION_NAME } from "../../const/const";
import readCookieSession from "./readCookieSession";
import setCookieSession from "./setCookieSession";
import removeCookieSession from "./removeCookieSession";

const updateCookieSession = async (nameCookie = SESSION_NAME) => {
    try {
        const cookie = readCookieSession()
        if (cookie) {
            const data = await axiosInstance.put(`/auth/session`)
            setCookieSession(nameCookie, data)
        }
    } catch (error) {
        console.error(error)
    }

}

export default updateCookieSession