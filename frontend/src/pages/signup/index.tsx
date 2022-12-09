import AuthForm from "../../components/authform";
import api from '../../services/api';
import {useNavigate} from 'react-router-dom';

function Signup(){
    const navigate = useNavigate();

    async function handleRegister(user:string,password:string){
        try{
            await api.post('/signup', {
                user,
                password
            });
            return navigate('/');
        } catch{
            alert('Erro na criação do usuário')
        }
    }
    return (    
        <AuthForm 
        formTitle="Crie sua conta e comece a usar" 
        submitFormButtonText="Cadastrar" 
        linkDescription="Já possui uma conta? Faça seu login agora!"
        routeName="/"
        submitFormButtonAction = {handleRegister}/>
    )
}

export default Signup