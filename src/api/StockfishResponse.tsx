export class StockfishResponse {
  text: string = "";
  move: string = "";
  fen: string = "";
  from: string = "";
  to: string = "";
  san: string = "";

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.text) this.text = initializer.text;
    if (initializer.move) this.move = initializer.move;
    if (initializer.fen) this.fen = initializer.fen;
    if (initializer.from) this.from = initializer.from;
    if (initializer.to) this.to = initializer.to;
    if (initializer.san) this.san = initializer.san;
  }
}
