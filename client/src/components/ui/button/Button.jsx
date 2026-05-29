import styles from './button.module.css'
export const Button = ({ children, onClick, disabled = false, outlined = false, thin = false, dark = false, height = 'auto', width = 'auto', fontSize = '0.8rem', type = 'button' }) => {

    return (
        <button
            type={type}
            onClick={onClick}
            className={styles.button_app}
            disabled={disabled}
            outlined={outlined}
            thin={thin}
            dark={dark}
            style={{ height: height, width: width, fontSize: fontSize }}
         
            >
            {children}
        </button>
    )
}