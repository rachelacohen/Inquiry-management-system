import styles from './Input.module.css'

export const Input = ({ type, placeholder, value, onChange, disabled = false, height = 'auto', required = false }) => {
    return (
        <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        className={styles.input_app}
        required={required} 
        />
    )
}