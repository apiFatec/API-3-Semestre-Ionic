import IonicText from "../../assets/IonicText.png";

export function Home() {
  return (
    <body style={{ marginLeft: "4rem" }}>
      <nav>Aqui vai ter a nav</nav>
      <img src={IonicText} alt="Minha Imagem" />
      <p style={{ color: "#6A6A6A" }}>Acompanhamento de processos</p>
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          marginTop: "4rem",
        }}
      >
        <section>
          <h3>Backlog</h3>
          <div
            style={{
              marginTop: "2rem",
              maxWidth: "15.938rem",
              display: "flex",
              padding: "4rem",
              borderRadius: "6px",
              boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)",
            }}
          ></div>
        </section>
        <section>
          <h3>Em Andamento</h3>
        </section>
        <section>
          <h3>Finalizado</h3>
        </section>
      </main>
    </body>
  );
}
