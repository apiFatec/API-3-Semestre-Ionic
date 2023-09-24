import { Bold, Circle } from "lucide-react";
import React, { useState, ChangeEvent } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularTotalProgressBar() {
  const [percentual, setPercentual] = useState(35);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPercentual(parseInt(e.target.value));
  };

  return (
    <div style={{ width: "85px" }}>
      <CircularProgressbar
        value={percentual}
        text={`${percentual}%`}
        strokeWidth={6} // Espessura da barra de progresso
        styles={{
          path: { stroke: `#FE4A4A` }, // Cor da barra de progresso
          text: { fill: `#FE4A4A`, fontSize: "22px", fontWeight: 600}, // Cor e tamanho do texto
        }}
      />
    </div>
  );
}

export default CircularTotalProgressBar;
