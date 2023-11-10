export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name; // Define o nome da classe como o nome do erro
    Error.captureStackTrace(this, this.constructor); // Captura a pilha de chamadas
  }
}

