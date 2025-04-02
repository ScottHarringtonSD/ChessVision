export class Puzzle {
    FEN: string = ''

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.FEN) this.FEN = initializer.FEN;
      }
}