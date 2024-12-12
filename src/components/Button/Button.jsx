import styles from "./Button.module.css";
function Button({children,handleClick,style="primary",type="button",shadow="false"}) {
    return (
        <button
          type={type}
          onClick={handleClick}
          className={`${styles.button} ${styles[style]} ${shadow && styles.shadow}`}
        >
            {children}
        </button>
    )
    }
    export default Button;