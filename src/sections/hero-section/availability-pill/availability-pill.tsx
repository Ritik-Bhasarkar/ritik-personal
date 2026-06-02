import styles from './availability-pill.module.scss';

export default function AvailabilityPill() {
    return (
        <div className={styles['availability-pill']}>
            <span className={styles['availability-pill--blink']} />
            Open to freelance
        </div>
    );
}
