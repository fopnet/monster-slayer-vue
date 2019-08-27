new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isRunning: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.isRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      const damage = this.calculateDamaged(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`,
      });

      if (this.checkWin()) {
        this.monsterAttack();
      }
    },
    specialAttack() {
      const damaged = this.calculateDamaged(10, 20);
      this.monsterHealth -= damaged;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster hard for ${damaged}`,
      });
      if (this.checkWin()) {
        this.monsterAttack();
      }
    },
    monsterAttack() {
      const damaged = this.calculateDamaged(5, 12);
      this.playerHealth -= damaged;

      this.checkWin();

      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damaged}`,
      });
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Player heal for 10`,
      });
      this.monsterAttack();
    },
    giveUp() {
      this.isRunning = false;
    },
    calculateDamaged(min, max) {
      return Math.floor(Math.random() * max) + min;
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        alert("You Won");
        this.isRunning = false;
        return false;
      } else if (this.playerHealth <= 0) {
        alert("You Lost ");
        this.isRunning = false;
        return false;
      }
      return true;
    },
  },
});
