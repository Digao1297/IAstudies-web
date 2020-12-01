<template>
  <div class="home center-x-y">
    <div class="container-home">
      <div class="matriz">
        {{ pos }}

        <div class="stock" ref="stock"></div>
      </div>
      <button :disabled="inMove" @click.prevent="callApi">move</button>
      <div class="options center-x">
        <div class="form-group col-5">
          <label for="inputOption">Options</label>
          <select id="inputOption" class="form-control">
            <option selected> </option>
            <option>Busca gulosa</option>
          </select>
        </div>
      </div>
    </div>
    {{ getResult }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  data: () => ({
    pos: { x: 0, y: 0 },
    robots: {},
    inMove: false,
    /**
     * shelf : 0
     * hall : 1
     * dead zone : 2
     * robots : 3
     * delivery : 4
     *
     *
     */
    result: [
      "5:2",
      "5:1",
      "4:1",
      "3:1",
      "2:1",
      "1:1",
      "0:1",
      "0:2",
      "0:3",
      "0:4",
      "1:4",
      "2:4",
      "3:4",
      "4:4",
      "5:4",
      "5:3",
    ],
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

    // result: [
    //   "12:0",
    //   "11:0",
    //   "11:1",
    //   "11:2",
    //   "11:3",
    //   "11:4",
    //   "11:5",
    //   "11:6",
    //   "11:7",
    //   "11:8",
    //   "11:9",
    //   "11:10",
    //   "10:10",
    //   "10:9",
    // ],
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
      [3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ],
    positionStop: {
      "11:1": true,
      "11:4": true,
      "11:7": true,
      "11:10": true,
      "11:13": true,
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
      "14": false,
    },
  }),
  computed: {
    ...mapGetters({
      getResult: "getResult",
    }),
  },
  methods: {
    ...mapActions({
      actionSendRequest: "actionSendRequest",
    }),

    createStock() {
      const stock = this.$refs.stock;

      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[0].length; j++) {
          switch (this.matrix[i][j]) {
            case 0:
              stock.appendChild(this.createField(i, j, 50, 50, ["shelf"]));
              break;
            case 1:
              stock.appendChild(this.createField(i, j, 50, 50, ["hall"]));
              break;
            case 3:
              stock.appendChild(
                this.createField(i, j, 50, 50, ["garage", "robot"])
              );
              break;
            case 4:
              stock.appendChild(this.createField(i, j, 50, 50, ["delivery"]));
              break;

            default:
              stock.appendChild(this.createField(i, j, 50, 50, ["dead-zone"]));
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
          robot.style.width = width - 10 + "px";
          robot.style.height = height - 10 + "px";

          field.appendChild(robot);

          this.robots[name] = { x, y };
        } else if (type[i] == "shelf") {
          field.addEventListener("click", () => {
            this.setPosition(x, y);
          });
          field.style = "cursor:pointer;";
          field.classList.add(type[i]);
          field.classList.add("center-x-y");
        } else {
          field.classList.add(type[i]);
          field.classList.add("center-x-y");
        }
      }

      field.setAttribute("id", `${x}:${y}`);
      field.style.width = width + "px";
      field.style.height = height + "px";

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
    setElement(robot, position, color = "#ff0000") {
      let el = document.getElementById(`${position}`);
      el.style.backgroundColor = color;
      el.appendChild(robot);
    },
    setPosition(x, y) {
      this.pos.x = x;
      this.pos.y = y;
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    /**
     * metodo responsavel por mover o robo seguindo o vetor com a rota.
     */
    async moveRobot(robot) {
      this.inMove = !this.inMove;
      for (let i = 0; i < this.result.length; i++) {
        this.setElement(robot, this.result[i]);
        // console.log(`move ${this.result[i]}`);
        await this.sleep(200);
      }
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
        await this.sleep(100);
      }

      /**
       * for responsavel por percorrer o linha para a entrega
       * a cada alteração da posição do robo é adicionado na @goBack para gerar a rota de volta.
       */
      for (let j = side; j < this.matrix[11].length - 1; j++) {
        this.setElement(robot, `11:${j}`);

        // console.log(`delivery B 11:${j}`);

        goBack.push(`11:${j}`);
        await this.sleep(100);
      }
      /**
       * for responsavel por percorrer a @goBack para retornar o robo a posição da pratilheira.
       */
      for (i = goBack.length - 1; i >= 0; i--) {
        this.setElement(robot, goBack[i]);

        // console.log(`go back ${goBack[i]}`);

        goBack.push(goBack[i]);
        await this.sleep(100);
      }
      nameRobot = robot.getAttribute("id");
      positionRobot = goBack[0].split(":");
      this.robots[nameRobot] = { x: positionRobot[0], y: positionRobot[1] };
      this.inMove = !this.inMove;
    },

    callApi() {
      let request = {
        destiny: this.pos,
        robots: this.robots,
      };

      this.actionSendRequest({
        url: "http://localhost:8000/api/v1/algorithms/a_star",
        request,
      }).then(() => {
        this.start("r4");
      });
    },
  },
  mounted() {
    this.createStock();
  },
};
</script>

<style lang="scss">
.matriz {
  padding: 5px;
}
.options {
  margin: 20px 0 0 0;
}
.form-group > label {
  font-size: 20px;
}

.hall {
  background-color: rgb(155, 155, 155);
}
.shelf {
  background-color: rgb(187, 187, 187);
}
.delivery {
  background-color: red;
}
.dead-zone {
  background-color: black;
}

// Robot
.robot {
  background-color: blueviolet;
  border-radius: 25px;
  color: white;
  transition: all 0.5s ease-in-out;
}
.garage {
  background-color: darkgreen;
}

.stock {
  background-color: rgb(155, 155, 155);
  width: 750px;
  height: 650px;
  display: flex;
  flex-wrap: wrap;
}
.route {
  background-color: coral;
}

.selected {
  background-color: orange !important;
}
</style>
