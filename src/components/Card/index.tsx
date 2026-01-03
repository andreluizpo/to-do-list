import styles from "./styles.module.css";

export function Card({ children }: { children: React.ReactNode }) {
    return <div className={styles.card}>{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
    return <div className={styles.cardHeader}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className={styles.cardContent}>{children}</div>;
}
