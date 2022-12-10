import MenuItem from "../menuItem";
import {House, User, UsersThree} from 'phosphor-react';

function Menu(){
    return(
        <ul className="pr-2">
            <MenuItem menuTitle="Pagina Inicial"><House size={28} weight='fill'/></MenuItem>
            <MenuItem menuTitle="Perfil"><User size={28} weight='fill'/></MenuItem>
            <MenuItem menuTitle="Amigos"><UsersThree size={28} weight='fill'/></MenuItem>
        </ul>
    )
}

export default Menu;