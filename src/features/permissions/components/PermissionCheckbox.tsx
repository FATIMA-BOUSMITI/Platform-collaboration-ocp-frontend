import "../styles/PermissionCheckbox.css";

interface Props {

    checked: boolean;

    onChange: (checked: boolean) => void;

}

export default function PermissionCheckbox({

    checked,

    onChange

}: Props) {
    

    return (

        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="permission-checkbox"
        />

    );

}