<template>
  <div class="home">
    <div class="row center-x-y">
      <div class="col col-sm-5 col-md-5 col-lg-4 col-xl-4 ">
        <div class="options">
          <div class="form-group ">
            <label for="inputOption">
              <h3><span style="font-size:30px;">&#128187;</span> Algorithms</h3>
            </label>

            <select
              id="inputOption"
              class="form-control btn-group"
              v-model="selected"
            >
              <option value="" selected disabled hidden>Select Option</option>
              <option
                v-for="(algorithm, item) in algorithms"
                :key="item"
                :value="{ id: algorithm.id, text: algorithm.name }"
                >{{ algorithm.name }}</option
              >
            </select>
          </div>
        </div>
        <button
          type="button"
          class="btn-start btn btn-lg btn-success"
          :disabled="inMove"
          @click.prevent="callApi"
        >
          Start
        </button>
      </div>
      <div class="center-x col col-sm-12 col-md-12 col-lg-8 col-xl-8 ">
        <div class="stock" ref="stock"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  data: () => ({
    algorithms: [
      { id: 0, name: "Greedy Search" },
      { id: 1, name: "Search A Star" }
    ],
    selected: "",
    pos: { x: 0, y: 0 },
    robots: {},
    inMove: false,
    speed: 350,
    /**
     * shelf : 0
     * hall : 1
     * dead zone : 2
     * robots : 3
     * delivery : 4
     */
    // result: [
    //   "5:2",
    //   "5:1",
    //   "4:1",
    //   "3:1",
    //   "2:1",
    //   "1:1",
    //   "0:1",
    //   "0:2",
    //   "0:3",
    //   "0:4",
    //   "1:4",
    //   "2:4",
    //   "3:4",
    //   "4:4",
    //   "5:4",
    //   "5:3",
    // ],
    // result: [
    //   "12:4",
    //   "11:4",
    //   "11:3",
    //   "11:2",
    //   "11:1",
    //   "10:1",
    //   "9:1",
    //   "8:1",
    //   "7:1",
    //   "7:2",
    // ],

    result: [
      "12:0",
      "11:0",
      "11:1",
      "11:2",
      "11:3",
      "11:4",
      "11:5",
      "11:6",
      "11:7",
      "11:8",
      "11:9",
      "11:10",
      "10:10",
      "10:9"
    ],
    // result: ["1:14", "1:13", "2:13", "2:14"],
    matrix: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ],
    positionStop: {
      "11:1": true,
      "11:4": true,
      "11:7": true,
      "11:10": true,
      "11:13": true
    },
    shelfSide: {
      "0": true,
      "3": true,
      "6": true,
      "9": true,
      "12": true,
      "2": false,
      "5": false,
      "8": false,
      "11": false,
      "14": false
    }
  }),
  computed: {
    ...mapGetters({
      getResult: "getResult"
    })
  },
  methods: {
    ...mapActions({
      actionSendRequest: "actionSendRequest"
    }),

    createStock() {
      const stock = this.$refs.stock;
      let size = 4;
      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[0].length; j++) {
          switch (this.matrix[i][j]) {
            case 0:
              stock.appendChild(this.createField(i, j, size, size, ["shelf"]));
              break;
            case 1:
              stock.appendChild(this.createField(i, j, size, size, ["hall"]));
              break;
            case 3:
              stock.appendChild(
                this.createField(i, j, size, size, ["garage", "robot"])
              );
              break;
            case 4:
              stock.appendChild(
                this.createField(i, j, size, size, ["delivery"])
              );
              break;

            default:
              stock.appendChild(
                this.createField(i, j, size, size, ["dead-zone"])
              );
              break;
          }
        }
      }
    },
    createField(x, y, width, height, type) {
      const field = document.createElement("div");
      for (let i = 0; i < type.length; i++) {
        if (type[i] == "robot") {
          const robot = document.createElement("div");
          let name = "";
          name = `r${y}`;

          robot.classList.add("robot");
          robot.setAttribute("id", name);

          field.appendChild(robot);

          this.robots[name] = { x, y };
        } else if (type[i] == "shelf") {
          field.addEventListener("click", () => {
            this.setPosition(x, y);
          });
          field.style = "cursor:pointer;";
          field.classList.add(type[i]);
        } else {
          field.classList.add(type[i]);
        }
        field.classList.add("center-x-y");
        field.classList.add("square");
      }

      field.setAttribute("id", `${x}:${y}`);

      return field;
    },
    async start(r) {
      const robot = document.getElementById(r);

      if (
        this.result[this.result.length - 1] == `${this.pos.x}:${this.pos.y}`
      ) {
        await this.deliveryPackge(robot);
      } else if (
        this.result[this.result.length - 1] != `${this.pos.x}:${this.pos.y}`
      ) {
        await this.moveRobot(robot);
      }
    },
    setElement(robot, position) {
      let el = document.getElementById(`${position}`);
      el.appendChild(robot);
    },
    setPosition(x, y) {
      this.pos.x = x;
      this.pos.y = y;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    /**
     * metodo responsavel por mover o robo seguindo o vetor com a rota.
     */
    async moveRobot(robot) {
      this.inMove = !this.inMove;
      for (let i = 0; i < this.result.length; i++) {
        this.setElement(robot, this.result[i]);
        // console.log(`move ${this.result[i]}`);
        await this.sleep(this.speed);
      }
      await this.sleep(1000);

      this.deliveryPackge(robot);
    },

    /**
     * metodo responsavel por mover o robo para a entrega
     */
    async deliveryPackge(robot) {
      let goBack = [];
      let i = 0,
        colRobot = 0,
        side = 0,
        nameRobot = "",
        positionRobot;
      /**
       * for responsavel por fazer o robo descer a coluna ate a linha para a entrega
       * a cada alteração da posição do robo é adicionado na @goBack para gerar a rota de volta.
       */

      colRobot = this.result[this.result.length - 1].split(":");
      if (this.shelfSide[colRobot[1]]) {
        side = parseInt(colRobot[1]) + 1;
      } else {
        side = parseInt(colRobot[1]) - 1;
      }
      goBack.push(`${colRobot[0]}:${parseInt(colRobot[1])}`);

      this.setElement(robot, `${colRobot[0]}:${side}`);

      for (i = colRobot[0]; i < this.matrix.length - 1; i++) {
        this.setElement(robot, `${i}:${side}`);

        if (this.positionStop[`${i}:${side}`]) break;

        // console.log(`delivery A ${i}:${side}`);

        goBack.push(`${i}:${side}`);
        await this.sleep(this.speed);
      }

      /**
       * for responsavel por percorrer o linha para a entrega
       * a cada alteração da posição do robo é adicionado na @goBack para gerar a rota de volta.
       */
      for (let j = side; j < this.matrix[11].length - 1; j++) {
        this.setElement(robot, `11:${j}`);

        // console.log(`delivery B 11:${j}`);

        goBack.push(`11:${j}`);
        await this.sleep(this.speed);
      }
      await this.sleep(1000);

      /**
       * for responsavel por percorrer a @goBack para retornar o robo a posição da pratilheira.
       */
      for (i = goBack.length - 1; i >= 0; i--) {
        this.setElement(robot, goBack[i]);

        // console.log(`go back ${goBack[i]}`);

        goBack.push(goBack[i]);
        await this.sleep(this.speed);
      }
      nameRobot = robot.getAttribute("id");
      positionRobot = goBack[0].split(":");
      this.robots[nameRobot] = { x: positionRobot[0], y: positionRobot[1] };
      this.inMove = !this.inMove;
    },

    callApi() {
      let a_star = "http://localhost:8000/api/v1/algorithms/a_star";
      let greedy_search =
        "http://localhost:8000/api/v1/algorithms/greedy_search";

      let request = {
        destiny: this.pos,
        robots: this.robots
      };

      if (this.selected.id == 0)
        this.actionSendRequest({
          url: greedy_search,
          request
        }).then(() => {
          this.start("r0");
        });
      else if (this.selected.id == 1)
        this.actionSendRequest({
          url: a_star,
          request
        }).then(() => {
          this.start("r0");
        });
    }
  },
  mounted() {
    this.createStock();
  }
};
</script>

<style lang="scss">
.home {
  width: 100%;
}

.options {
  margin: 20px 0 0 0;
  padding: 0 2rem 0 2rem;
}

.form-group > label {
  font-size: 20px;
}
.btn-start {
  padding: 0.4rem 3rem 0.4rem 3rem !important;
}
.col {
  margin: 0 0 1rem 0;
}
.row {
  margin: 0 1rem 0 1rem;
}
.square {
  width: 4vw;
  height: 4vw;
}

.hall {
  background-color: rgb(75, 75, 75);
}
.shelf {
  background-image: url("../assets/shelf.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.delivery {
  background-color: #28a745;
}
.dead-zone {
  background-color: #4b4b4b;
}

// Robot
.robot {
  background-image: url("../assets/robot.png");
  background-repeat: no-repeat;
  background-size: contain;
  color: white;
  width: 3.5vw;
  height: 3.5vw;
}
.garage {
  background-color: #4b4b4b;
}
.container-stock {
  width: 60vw;
  height: 50vw;
  background-color: #4b4b4b;
  border-radius: 25px;
  padding: 1rem;
}
.stock {
  width: 60vw;
  height: 50vw;
  display: flex;
  flex-wrap: wrap;
  margin: 3rem 0 0 0;
}
.route {
  background-color: coral;
}

.selected {
  background-color: orange !important;
}

@media only screen and (max-width: 900px) {
  .square {
    width: 6vw;
    height: 6vw;
  }
  .stock {
    width: 90vw;
    height: 60vw;
  }
  .robot {
    width: 5.5vw;
    height: 5.5vw;
  }
}
@media only screen and (min-width: 1350px) {
  .square {
    width: 3vw;
    height: 3vw;
  }
  .stock {
    width: 45vw;
    height: 33vw;
  }
  .robot {
    width: 2.5vw;
    height: 2.5vw;
  }
}
</style>
