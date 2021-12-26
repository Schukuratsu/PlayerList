import styles from "./styles.module.scss";
import { cs } from "utils/className";

type Props = {
  name?: string;
  paid?: boolean;
  position: number;
};

export function PlayerItem(props: Props) {
  const isOcupied = !!props.name;

  return (
    <div className={styles.playerItem}>
      <div className={styles.positionLabel}>{props.position}.</div>
      <div className={cs([styles.nameLabel, isOcupied ? "" : styles.empty])}>
        {props.name ?? "Vaga disponível"}
      </div>
    </div>
  );
}
