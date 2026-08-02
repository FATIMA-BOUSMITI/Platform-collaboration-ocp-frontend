import "../styles/PermissionCheckbox.css";

interface Props {

    checked: boolean;

    onChange: () => void;

}

export default function PermissionCheckbox({

    checked,

    onChange

}: Props) {

    return (

        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="permission-checkbox"
        />

    );

}