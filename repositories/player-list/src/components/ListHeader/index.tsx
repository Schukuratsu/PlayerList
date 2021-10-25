import styles from "./styles.module.scss";

type Props = {
  title: string;
  description: string;
};

export function ListHeader(props: Props) {
  return (
    <header>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>{props.description}</div>
    </header>
  );
}
