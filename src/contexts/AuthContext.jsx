import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import * as localStorageService from '../services/localStorage';
import { useContext } from 'react';
import { ErrContext } from '../contexts/ErrContext';
const AuthContext = createContext();

function AuthContextProvider(props) {
    const [user, setUser] = useState(null);
    const { error, setError } = useContext(ErrContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(localStorageService.getRole());
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [gender, setGender] = useState('');
    const [ageRegister, setAgeRegister] = useState('');
    const [interest, setInterest] = useState('');
    const navigate = useNavigate();
    const [loginLoading, setLoginLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    const handleSubmitLogin = async (isRemember) => {
        try {
            const res = await axios.post('/auth/login', { email, password });
            login(res.data.token, isRemember);
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
            setTimeout(() => setError(''), 3000);
        }
    };
    const login = async (token, isRemember) => {
        try {
            await localStorageService.setToken(token);
            setUser(jwtDecode(token));
            setRole('user');
            setLoginLoading(true);
            navigate('/');
            if (!isRemember) {
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register', {
                firstName,
                lastName,
                username,
                email,
                password,
                confirmPassword,
                profileUrl: imageUrl,
            });

            await axios.post(`/about/${res.data.myUser.id}`, {
                gender,
                interest,
                age: ageRegister,
            });
            navigate('/login');
            setFirstName('');
            setLastName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setAgeRegister('');
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    const logout = () => {
        localStorageService.removeToken();
        setUser(null);
        setRole('guest');
        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                email,
                setEmail,
                password,
                setPassword,
                error,
                setError,
                handleSubmitLogin,
                handleSubmitRegister,
                login,
                logout,
                firstName,
                setFirstName,
                lastName,
                setLastName,
                confirmPassword,
                setConfirmPassword,
                username,
                setUsername,
                role,
                setRole,
                loading,
                setLoading,
                imageUrl,
                setImageUrl,
                coverUrl,
                setCoverUrl,
                gender,
                setGender,
                interest,
                setInterest,
                loginLoading,
                setLoginLoading,
                ageRegister,
                setAgeRegister,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;
export { AuthContext };
