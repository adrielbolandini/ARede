import AuthForm from "../../components/authform";
import api from "../../services/api";
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

interface userToken{
    profile: string;
    user:string
}

function Login(){

    const navigate = useNavigate();

    async function handleLogin(user:string, password:string){
        try{
            const {data} = await api.post('/login', {
                user,
                password
            });
            const decodedToken = jwt_decode(data.accessToken) as userToken;
            localStorage.setItem('profile',decodedToken.profile);
            localStorage.setItem('user',decodedToken.user);
            localStorage.setItem('accessToken',data.accessToken);
            return navigate('/home');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthForm 
        formTitle="Faça login e comece a usar" 
        submitFormButtonText="Entrar" 
        linkDescription="Não possui conta, faça seu cadastro agora!"
        routeName="/signup"
        submitFormButtonAction = {handleLogin}
        />
    )
}

export default Login