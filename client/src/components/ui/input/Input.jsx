import styles from './Input.module.css'

export const Input = ({ type, placeholder, value, onChange, disabled = false, height = 'auto', required = false, label }) => {
    return (
        <div className={styles.input_container}>
            {label && <label className={styles.input_label}>{label}</label>}
            <input 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            className={styles.input_app}
            required={required} 
            disabled={disabled}
            style={{height}}
            />
        </div>
    )
}