<template>
  <div class="text-center">
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
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  props: {
    monsterHealth: {
      type: Number,
      rerquired: true,
      default: 100
    },
    playerHealth: {
      type: Number,
      rerquired: true,
      default: 100
    },
    resetHealths: {
      type: Function
    }
  },
  data: () => {
    return {
      isRunning: false,
      resource: {}
    };
  },
  methods: {
    startGame() {
      this.isRunning = true;
      this.resetHealths();

      eventBus.resetTurn();
    },
    attack() {
      const damage = this.calculateDamaged(3, 10);
      const val = this.monsterHealth - damage;
      this.setMonsterHealth(val);

      eventBus.addTurn({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`
      });

      if (this.checkWin(val)) {
        this._monsterAttack(this.playerHealth);
      }
    },
    specialAttack() {
      const damaged = this.calculateDamaged(10, 20);
      const val = this.monsterHealth - damaged;
      this.setMonsterHealth(val);

      eventBus.addTurn({
        isPlayer: true,
        text: `Player hits Monster hard for ${damaged}`
      });

      if (this.checkWin(val)) {
        this._monsterAttack(this.playerHealth);
      }
    },
    _monsterAttack(playerHealth) {
      const damaged = this.calculateDamaged(5, 12);
      const val = playerHealth - damaged;

      this.setPlayerHealth(val);

      this.checkWin(val);

      eventBus.addTurn({
        isPlayer: false,
        text: `Monster hits Player for ${damaged}`
      });
    },
    heal() {
      let newHealth = 100;
      if (this.playerHealth <= 90) {
        newHealth = this.playerHealth + 10;
        this.setPlayerHealth(newHealth);
      } else {
        this.setPlayerHealth(newHealth);
      }

      eventBus.addTurn({
        isPlayer: true,
        text: `Player heal for 10`
      });
      //   this._monsterAttack(newHealth);
    },
    giveUp() {
      this.isRunning = false;
    },
    calculateDamaged(min, max) {
      return Math.floor(Math.random() * max) + min;
    },
    checkWin(val) {
      if (val <= 0) {
        this.isRunning = false;

        this.submit({
          score: this.playerHealth
        }).then(
          resp =>
            alert(
              `You Won. Score ${this.playerHealth} saved in key ${resp.data.name}`
            ),
          err => alert(`error: ${err}`)
        );

        return false;
      } else if (val <= 0) {
        alert("You Lost ");
        this.isRunning = false;
        return false;
      }
      return true;
    },
    setMonsterHealth(val) {
      eventBus.monsterHealthChange(val);
    },
    setPlayerHealth(val) {
      eventBus.playerHealthChange(val);
    },
    submit(data) {
      return this.resource.save({}, data);
      // return this.$http.post("scores.json", data);
    }
  },
  created() {
    this.resource = this.$resource("scores.json");
  }
};
</script>

<style scoped>
button {
  font-size: 20px;
  background-color: #eee;
  padding: 12px;
  box-shadow: 0 1px 1px black;
  margin: 10px;
}

#start-game {
  background-color: #aaffb0;
}

#start-game:hover {
  background-color: #76ff7e;
}

#attack {
  background-color: #ff7367;
}

#attack:hover {
  background-color: #ff3f43;
}

#special-attack {
  background-color: #ffaf4f;
}

#special-attack:hover {
  background-color: #ff9a2b;
}

#heal {
  background-color: #aaffb0;
}

#heal:hover {
  background-color: #76ff7e;
}

#give-up {
  background-color: #ffffff;
}

#give-up:hover {
  background-color: #c7c7c7;
}
</style>