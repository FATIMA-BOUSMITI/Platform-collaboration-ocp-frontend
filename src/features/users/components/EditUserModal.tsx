import type { User } from "../../../types/User.type";
import UserForm from "../../admin/UserForm";
export default function EditUserModal({open,user,onClose,onUserUpdated}:{open:boolean;user:User;onClose:()=>void;onUserUpdated:(u:User)=>void}){return open?<UserForm user={user} onClose={onClose} onSaved={onUserUpdated}/>:null;}
