import {createRefresh} from "react-auth-kit";
import api from "../http/api.js";

const refreshApiCallback = createRefresh({
    interval: 5,
    refreshApiCallback: async ({refreshToken}) => {
        console.log(`Refresh`)
        try {
            const response = await api.post('/auth/refresh', {refreshToken})

            return {
                isSuccess: true,
                newAuthToken: response.data.accessToken,
                newRefreshToken: response.data.refreshToken,
                newAuthTokenExpireIn: 4,
                newRefreshTokenExpiresIn: 60,
                newAuthUserState: response.data.user
            }
        }catch (e) {
            console.log(e)
            return {
                isSuccess: false
            }
        }
    }
})

export default refreshApiCallback