import React, {useState} from 'react'

interface ToggleSwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({checked, onChange}) => {
    const [isChecked, setIsChecked] = useState(checked)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked)
        onChange(event.target.checked)
    }

    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className="toggle-switch-checkbox"
                id="toggleSwitch"
                checked={isChecked}
                onChange={handleChange}
            />
            <label className="toggle-switch-label" htmlFor="toggleSwitch">
                <span className="toggle-switch-inner"></span>
                <span className="toggle-switch-switch"></span>
            </label>
        </div>
    )
}

export default ToggleSwitch
