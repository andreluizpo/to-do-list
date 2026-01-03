import styles from "./styles.module.css";

type ButtonProps = {
    children: React.ReactNode;
    variants?: "normal" | "icon";
} & React.ComponentProps<"button">;

export function Button({ children, variants = "normal", ...rest }: ButtonProps) {
    return (
        <button className={styles[variants]} {...rest}>
            {children}
        </button>
    );
}
