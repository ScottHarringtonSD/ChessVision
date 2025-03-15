export class StockfishResponse {
  text: string = "";

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.text) this.text = initializer.text;
  }
}
