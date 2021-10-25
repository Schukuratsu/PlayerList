import styles from "./App.module.scss";
import { useState } from "react";
import { ListHeader } from "./components/ListHeader";
import { PlayerList } from "./components/PlayerList";
import { ParticipationForm } from "components/ParticipationForm";

const MAX_USERS_IN_LIST = 18;

function App() {
  const [list, setList] = useState([
    {
      name: "João Bolão",
      paid: false,
    },
  ]);

  const alreadyInTheListVerifier = (name: string)=>!!list.find((p) => p.name === name)

  const allowed = true;

  return (
    <div className={styles.main}>
      <ListHeader title="Jogão" description="teste" />
      <PlayerList maxPlayers={MAX_USERS_IN_LIST} players={list} />
      <ParticipationForm
        className={styles.participationForm}
        onFinish={(name: string) => {
          setList((l) => [...l, { name, paid: false }]);
        }}
        allowed={allowed}
        alreadyInTheListVerifier={alreadyInTheListVerifier}
      />
    </div>
  );
}

export default App;
