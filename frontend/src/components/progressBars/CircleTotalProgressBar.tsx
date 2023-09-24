import { Processes, Task } from "@/pages/process/process";
import { useState, ChangeEvent } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useEffect } from 'react';
import "react-circular-progressbar/dist/styles.css";

function CircularTotalProgressBar({ tasks }: { tasks?: Task[] }) {
  const [percentual, setPercentual] = useState(0);

  useEffect(() => {
    porcentagem();
  })

  function porcentagem() {
    const lenTasks = tasks?.length || 0; // Usar 0 como valor padrão se for undefined
    const finishedTasks = tasks?.reduce((result, task) => {
      if (task.status === "Finalizado") {
        return result + 1;
      }
      return result;
    }, 0);
    if (lenTasks === 0) {
      return 0; // Retorna 0 se não houver tarefas
    }

    const porcentagem = (finishedTasks || 0) / lenTasks * 100;
    setPercentual(porcentagem);
  }

  return (
    <div style={{ width: "85px" }}>
      <CircularProgressbar
        value={percentual}
        text={`${percentual}%`}
        strokeWidth={6} // Espessura da barra de progresso
        styles={{
          path: { stroke: `#FE4A4A` }, // Cor da barra de progresso
          text: { fill: `#FE4A4A`, fontSize: "22px", fontWeight: 600 }, // Cor e tamanho do texto
        }}
      />
    </div>
  );
}

export default CircularTotalProgressBar;
