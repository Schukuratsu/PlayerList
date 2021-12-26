import styles from './styles.module.scss'

import { PlayerItem } from "components/PlayerItem";

type PlayerType = {
  name: string;
  paid: boolean;
};

type Props = {
  players: PlayerType[];
  maxPlayers: number;
};

function createFixedSizeList<T>(
  size: number,
  populatedList: T[]
): (T | undefined)[] {
  if (populatedList.length > size)
    throw Error("The given populatedList is too big!");
  const fixedSizeList = new Array(size).fill(undefined);
  populatedList.forEach((value, idx) => {
    fixedSizeList[idx] = value;
  });
  return fixedSizeList;
}

export function PlayerList(props: Props) {
  return (
    <div className={styles.playerList}>
      {createFixedSizeList(props.maxPlayers, props.players).map(
        (player, idx) => {
          const position = idx + 1;
          return (
            <PlayerItem
              position={position}
              name={player?.name}
              paid={player?.paid}
            />
          );
        }
      )}
    </div>
  );
}
