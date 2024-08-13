export const playerFactory = (name, symbol) => {
  const sayHello = () => {
    return `Hi ${name}, You play ${symbol}.`;
  };

  return {
    sayHello,
    name,
    symbol,
    choice: null,
    allChoices: [],
    addChoice(choice) {
      this.allChoices.push(choice);
    },
  };
};
