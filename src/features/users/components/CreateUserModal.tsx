import type { User } from "../../../types/User.type";
import UserForm from "../../admin/UserForm";
export default function CreateUserModal({open,onClose,onUserCreated}:{open:boolean;onClose:()=>void;onUserCreated:(u:User)=>void}){return open?<UserForm onClose={onClose} onSaved={onUserCreated}/>:null;}
