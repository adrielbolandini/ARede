import MenuItem from "../menuItem";
import {House, User, UsersThree} from 'phosphor-react';

function Menu(){
    return(
        <ul>
            <MenuItem menuTitle="Pagina Inicial"><House size={38} weight='fill'/></MenuItem>
            <MenuItem menuTitle="Perfil"><User size={38} weight='fill'/></MenuItem>
            <MenuItem menuTitle="Amigos"><UsersThree size={38} weight='fill'/></MenuItem>
        </ul>
    )
}

export default Menu;