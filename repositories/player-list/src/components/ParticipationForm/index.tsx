import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { cs } from "utils/className";

type Props = {
  allowed: boolean;
  alreadyInTheListVerifier: (name: string) => boolean
  className?: string;
  onFinish: (name: string) => void;
};

export function ParticipationForm({alreadyInTheListVerifier, ...props}: Props) {
  const [name, setName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [buttonText, setButtonText] = useState("Sem permissão para editar")

  useEffect(() => {
    if(alreadyInTheListVerifier(name)){
      setButtonDisabled(true);
      setButtonText("Este nome já está na lista!")
    }
    else if (!props.allowed){
      setButtonDisabled(true);
      setButtonText("Sem permissão para editar")
    }
    else if (!name){
      setButtonDisabled(true);
      setButtonText("Insira um nome")
    }
    else{
      setButtonDisabled(false);
      setButtonText("Participar da lista")
    }
  }, [alreadyInTheListVerifier, name, props])

  return (
    <div className={cs([styles.participationForm, props.className])}>
      <input
        type="text"
        value={name}
        placeholder="Seu nome aqui!"
        onChange={(evt) => setName(evt.currentTarget.value)}
      />
      <button
        onClick={() => {
          props.onFinish(name);
        }}
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>
    </div>
  );
}
