import { ReactNode } from "react";
import Text from "../text";
import {Slot} from '@radix-ui/react-slot'

interface MenuItemProps{
    menuTitle:string;
    children?: ReactNode;
}

function MenuItem(props: MenuItemProps){
    return(
        <li className="mt-5 py-2">
            <div className="flex items-center px-4 rounded-full hover:bg-sky-400 pl-2">
                <Slot className="text-slate-50">{props.children}</Slot>
                <Text className="font-extrabold ml-4">{props.menuTitle}</Text>
            </div>
        </li>
    )
}

export default MenuItem;