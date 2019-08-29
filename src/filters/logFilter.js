export const LogFilter = {
  data: () => {
    return {
      turns: [],
      isPlayer: false,
      isMonster: false,
    };
  },
  computed: {
    filteredTurns() {
      // xor operator
      let all = false;
      let filter = false;
      if (!this.isPlayer !== !this.isMonster) {
        filter = this.isPlayer ? true : false;
      } else {
        all = true;
      }
      return this.turns.filter(el => all || el.isPlayer === filter);
    },
  },
};
