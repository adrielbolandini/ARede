import AuthForm from "../../components/authform";

function Signup(){
    function handleRegister(user:string,password:string){
        
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