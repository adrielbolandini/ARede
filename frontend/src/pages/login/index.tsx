import AuthForm from "../../components/authform";
import api from "../../services/api";

function Login(){

    async function handleLogin(user:string, password:string){
        const data = await api.post('/login', {
            user,
            password
        });
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