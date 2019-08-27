<template>
  <div id="app">
    <section class="row">
      <div class="small-6 columns">
        <h1 class="text-center">YOU</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{width: playerHealth + '%'}"
          >{{ playerHealth }}</div>
        </div>
      </div>
      <div class="small-6 columns">
        <h1 class="text-center">MONSTER</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{width: monsterHealth + '%'}"
          >{{ monsterHealth }}</div>
        </div>
      </div>
    </section>
    <section class="row controls" v-if="!isRunning">
      <div class="small-12 columns">
        <button id="start-game" @click="startGame">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-else>
      <div class="small-12 columns">
        <button id="attack" @click="attack">ATTACK</button>
        <button id="special-attack" @click="specialAttack">SPECIAL ATTACK</button>
        <button id="heal" @click="heal">HEAL</button>
        <button id="give-up" @click="giveUp">GIVE UP</button>
      </div>
    </section>
    <section class="row log" v-if="turns.length > 0">
      <div class="small-12 columns">
        <ul>
          <li
            :key="i"
            v-for="(turn,i) in turns"
            :class="{'monster-turn': !turn.isPlayer, 'player-turn': turn.isPlayer }"
          >{{ turn.text }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  // name: "app",
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      isRunning: false,
      turns: []
    };
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
        text: `Player hits Monster for ${damage}`
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
        text: `Player hits Monster hard for ${damaged}`
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
        text: `Monster hits Player for ${damaged}`
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
        text: `Player heal for 10`
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
    }
  }
};
</script>
