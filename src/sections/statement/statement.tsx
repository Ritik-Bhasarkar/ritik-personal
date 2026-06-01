import styles from './statement.module.scss';

export default function Statement() {
    return (
        <section className={styles['statement']} id="statement">
            <div className={styles['statement--inner']}>
                <p className={styles['statement--eyebrow']}>
                    <span className={styles['statement--eyebrow-dot']} />
                    Statement — what I actually do
                </p>
                <p className={styles['statement--text']}>
                    I build interfaces that shape how{' '}
                    <span className={styles['statement--box']}>people &amp; products</span> meet.
                    From marketing platforms to{' '}
                    <span className={styles['statement--em']}>ad-experience engines</span>, my work
                    lives at the intersection of performance &amp; craft.
                </p>
                <div className={styles['statement--foot']}>
                    <span className={styles['statement--tag']}>Build · Ship · Refine</span>
                </div>
            </div>
        </section>
    );
}
