import Heading from '../../components/headers'
import Text from '../../components/text'
import logo from '../../assets/logo.svg'
import { TextInput } from '../../components/textInput'
import {Lock, User} from 'phosphor-react';
import Button from '../../components/button';

function Login(){
    return (
        <div className='text-cyan-50 flex flex-col items-center mt-16'>
            <header className='flex flex-col items-center'>
                <img src={logo} alt='logo'/>
            <Heading size='lg' className='mt-2'>ARede</Heading>
            <Text className='mt-1 opacity-50'>Faça login para começar</Text>
            </header>

            <form className='flex flex-col gap-4 items-stretch w-full max-w-sm mt-10 '>
                <label htmlFor='user' className='flex flex-col gap-2'>
                    <Text>Login</Text>
                    <TextInput.Root>
                        <TextInput.Icon><User /></TextInput.Icon>
                        <TextInput.Input id="user" type="text" placeholder='Digite seu login'/>
                    </TextInput.Root>
                </label>
                <label htmlFor='password' className='flex flex-col gap-2'>
                    <Text>Senha</Text>
                    <TextInput.Root>
                        <TextInput.Icon><Lock /></TextInput.Icon>
                        <TextInput.Input id="password" type="password" placeholder='Digite sua senha'/>
                    </TextInput.Root>
                </label>
                <Button type="submit" className='mt-4'>Entrar</Button>
            </form>

            <footer>
                <h1>footer</h1>
            </footer>
        </div>
    )
}

export default Login