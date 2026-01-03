import styles from "./styles.module.css";

type InputProps = {
    id: string;
    label: string;
} & React.ComponentProps<"input">;

export function Input({ id, label, ...rest }: InputProps) {
    return (
        <>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <input className={styles.input} id={id} type="text" {...rest} />
        </>
    );
}
