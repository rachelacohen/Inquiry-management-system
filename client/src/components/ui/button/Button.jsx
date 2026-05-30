import styles from './button.module.css'
export const Button = ({ children, onClick, disabled = false, height = '40px', width = 'auto', fontSize = '0.8rem', type = 'button' }) => {

    return (
        <button
            type={type}
            onClick={onClick}
            className={styles.button_app}
            disabled={disabled}
        
            style={{ height: height, width: width, fontSize: fontSize, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
         
            >
            {children}
        </button>
    )
}