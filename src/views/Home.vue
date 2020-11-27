<template>
  <div class="home center-x-y">
    <div class="container-home">
      <div class="matriz">
        {{ pos }}

        <div class="stock" ref="stock"></div>
      </div>
      <button @click="moveRobot('r0')">move</button>
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
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({
    pos: { x: 0, y: 0 },
    /**
     * shelf : 0
     * hall : 1
     * dead zone : 2
     * robots : 3
     * delivery : 4
     *
     *
     */
    result: ["11:0", "11:1", "10:1", "9:1", "8:1", "7:1", "7:2"],
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
  }),
  methods: {
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
          robot.classList.add("robot");
          robot.setAttribute("id", `r${y}`);
          robot.style.width = width - 10 + "px";
          robot.style.height = height - 10 + "px";

          field.appendChild(robot);
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

    moveRobot(r) {
      const robot = document.getElementById(r);
      // let count = 0;
      for (var i = 0; i <= this.result.length; i++) {
        let el = document.getElementById(`${this.result[i]}`);
        if (i >= this.result.length) break;
        (() => {
          setTimeout(() => {
            el.style.backgroundColor = "#292929";
            el.appendChild(robot);
            console.log(`${this.result.length == i} - ${i}`);
          }, i * 500);
        })(i);
      }
    },

    deliveryPackge(r) {
      const robot = document.getElementById(r);

      for (var i = 0; i <= this.result.length; i++) {
        let el = document.getElementById(`${this.result[i]}`);
        if (i >= this.result.length) break;
        (() => {
          setTimeout(() => {
            el.style.backgroundColor = "#292929";
            el.appendChild(robot);
            console.log(`${this.result.length == i} - ${i}`);
          }, i * 1000);
        })(i);
      }
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
</style>
