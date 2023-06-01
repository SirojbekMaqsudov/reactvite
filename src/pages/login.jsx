import {useState} from 'react';
import {useSignIn} from "react-auth-kit";
import api from "../http/api.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const signIn = useSignIn()

    const [payload, setPayload] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    const handleChange = e => {
        setError(null)
        setPayload(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const Auth = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/auth/login', payload)
            const {data} = response

            if (signIn({
                tokenType: "Bearer",
                token: data.accessToken,
                authState: data.user,
                expiresIn: 5,
                refreshToken: data.refreshToken,
                refreshTokenExpireIn: 1440
            })) {
                return navigate('/')
            }

        }catch (e) {
            setError(e?.response?.data?.error)
        }
    }

    return (
        <div className="Login min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-10 py-12 px-4 sm:px-6 lg:px-8">
            <div>
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or
                    <a href="/auth/registration" className="font-medium text-indigo-600 border-b border-indigo-600"> register your FREE account </a>
                </p>
            </div>
            <form className="max-w-md w-full mx-auto bg-white shadow-2xl rounded-lg p-7 space-y-4" onSubmit={Auth}>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-600 mb-1" htmlFor="email">Email Address</label>
                    <input className="border rounded-md bg-white px-3 py-2"
                           type="text"
                           name="email"
                           id="email"
                           placeholder="Enter your Email Address"
                           onChange={handleChange}
                           required={true}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-600 mb-1" htmlFor="password">Password</label>
                    <input className="border rounded-md bg-white px-3 py-2"
                           type="password"
                           name="password"
                           id="password"
                           placeholder="Enter your Password"
                           onChange={handleChange}
                           required={true}
                    />
                </div>
                <p className={'text-red-500'}>{error}</p>
                <div>
                    <button className="w-full bg-indigo-600 text-white rounded-md p-2">Sign in</button>
                </div>
            </form>
        </div>
    );
};

export default Login;