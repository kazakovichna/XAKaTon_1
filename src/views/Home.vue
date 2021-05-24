<template>
  <div class="home">

    <div class="modal"
        v-if="isModalOpen"
    >
      <h1>{{modalDay}} {{chosen_mon}} {{chosen_year}}</h1>
      <div class="modalVacList"
            v-if="modalVac.length !== 0"
      >
        <div class="modalVacListItem"
            :class="{SMO: item.role === 'smo',
                    VMO: item.role === 'vmo',
                    MO: item.role === 'mo',
                    SKM: item.role === 'skm',
                    KM: item.role === 'km',
                    K: item.role === 'k'}"
            v-for="item in modalVac"
            :key="item.id"
        >
          <div class="roles">
            {{item.role}}
          </div>
          <div class="vsp">
            {{item.vsp}}
          </div>
          <div class="address">
            {{item.address}}
          </div>
          <div class="GetVac"
              @click="GetVac(item)"
          >
            <h3>Подать заявку</h3>
          </div>
          <div class="deleteBtn"
              @click="deleteVacanty(item)"
          >
          <h3>Удалить</h3>
          </div>
        </div>
      </div>
      <div class="create-vacancy">
        <input type="text" placeholder="Введите ВСП" v-model="vsp">
        
        <div class="gosb"
            @click="gosb_sel = !gosb_sel"
        >
            ГОСБ {{gosb}}
        </div>

        <div class="gosb-list"
              v-if="gosb_sel"
        >
          <div class="gosb-list-item"
              v-for="item in gosb_mas"
              :key="item"
              @click="gosb = item"
          >
            {{item}}
          </div>
        </div>

        <div class="role"
            @click="role_sel = !role_sel"
        >
            Дольжность {{role}}
        </div>

        <div class="role-list"
              v-if="role_sel"
        >
          <div class="role-list-item"
              v-for="item in role_mas"
              :key="item"
              @click="role = item"
          >
            {{item}}
          </div>
        </div>

        <div>Дата: {{`${chosen_year}-${chosen_mon + 1}-${modalDay + 1}`}}</div>
        <input type="text" placeholder="Введитее адрес" v-model="address">

        <div class="create-btn"
            @click="createVacancy(`${chosen_year}-${chosen_mon + 1}-${modalDay + 1}`, role, gosb, vsp, address)"
        >
          Создать вакансию
        </div>
      </div>
      <div class="close-btn"
          @click="closeWindow()"
      >
        <h1>Close</h1>
      </div>
    </div>


    <div class="someFilter">
      <div class="material-icons"
          @click="clickMon(0)"
      >
          arrow_back_ios
      </div>
      <div class="filter">
        {{mon_mas[chosen_mon]}}
        {{chosen_year}}
      </div>
      <div class="material-icons"
          @click="clickMon(1)"
      >
        arrow_forward_ios
      </div>
    </div>

    <router-link to="/Vacancies">
      <h1>Вакансии</h1> 
    </router-link>

    <div class="calendar">
      <div class="week" 
           v-for="cur_week in week_mas.length"
           :key="cur_week"
      >
        <div class="day"
             v-for="day in week_mas[cur_week - 1]"
             :key="day"
             @click="openModal((cur_week - 1)*7 + day - 1)"
        >
          <div class="day_num">
            {{(cur_week - 1)*7 + day}}
          </div>
          <div class="day_config">
            <div class="config SMO"
                v-if="boolListMas[(cur_week - 1)*7 + day - 1][0] === 'smo'"
            ></div>
            <div class="config VMO"
                v-if="boolListMas[(cur_week - 1)*7 + day - 1][1] === 'vmo'"
            ></div>
            <div class="config MO"
                v-if="boolListMas[(cur_week - 1)*7 + day - 1][2] === 'mo'"
            ></div>
            <div class="config SKM"
                v-if="boolListMas[(cur_week - 1)*7 + day - 1][3] === 'skm'"
            ></div>
            <div class="config KM"
                v-if="boolListMas[(cur_week - 1)*7 + day - 1][4] === 'km'"
            ></div>
            <div class="config K"
                v-if="boolListMas[(cur_week - 1)*7 + day - 1][5] === 'k'"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Home',
    data:() => ({
      modalDay: null,
      address: '',
      vsp: null,
      gosb: null,
      gosb_sel: false,
      gosb_mas: [ 
        4157,
        9070,
        8635,
        8636,
        8567,
        8645,
        8557,
        8556
      ],
      role: null,
      role_sel: false,
      role_mas: [
        'smo',
        'vmo',
        'mo',
        'skm',
        'km',
        'k'
    ],
      chosen_day: new Date().getDate(),
      week_mas: [],
      weekQuantity: null,
      chosen_mon: new Date().getMonth(),
      chosen_year: new Date().getFullYear(),
      year_mas: [
        2020,
        2021,
        2022,
        2023,
        2024,
        2025
            ],
      mon_mas: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      vacList: [],
      vasListMas: [],
      boolListMas: [],
      mon_mas_length: [],
      isModalOpen: false,
      modalVac: []
    }),
    computed: {
      ...mapGetters([
        'GET_VACANCIES',
        'GET_USER_DATA'
      ])
    },
    methods: {
      ...mapActions([
        'FETCH_VACANCIES',
        'FETCH_USER_DATA',
        'GET_USER_ID',
        'CREATE_VACANCY',
        'FETCH_CUR_VACANCIES',
        'DELETE_VACANCIES',
        'GET_VAC'
      ]),
      markOutMonth() {
        this.week_mas = []
        if (!(this.chosen_year % 4 && this.chosen_year % 400)) {
          this.mon_mas_length = [
            31, 29, 31, 30, 
            31, 30, 31, 31, 
            30, 31, 30, 31
          ]
        } else {
          this.mon_mas_length = [
            31, 28, 31, 30, 
            31, 30, 31, 31, 
            30, 31, 30, 31]
        }
        this.weekQuantity = (this.mon_mas_length[this.chosen_mon] % 4 == 0) ? 4 : 5
        for (let i = 0; i < this.weekQuantity; i++) {
          if (i !== 4) {
            this.week_mas.push(7)
          } else {
            this.week_mas.push(this.mon_mas_length[this.chosen_mon] - 28)
          }
        }
      },
      clickMon(dir) {
          if (dir == 0) {
            if (this.chosen_mon == 0) {
              this.chosen_mon = 11
              this.chosen_year--
              this.markOutMonth()
              this.makeVacList()
            } else {
              this.chosen_mon--
              this.markOutMonth()
              this.makeVacList()
            } 
          } else {
            if (this.chosen_mon == 11) {
              this.chosen_mon = 0
              this.chosen_year++
              this.markOutMonth()
              this.makeVacList()
            } else {
              this.chosen_mon++
              this.markOutMonth()
              this.makeVacList() 
            }
          }
      },
      makeVacList() {
        this.vasListMas = []
        for (let i = 0; i < this.mon_mas_length[this.chosen_mon]; i++) {
            this.vasListMas[i] = []
        }

        Object.values(this.GET_VACANCIES).forEach((el) => {
          const year = parseInt(el.date.substr(0, 4))
          const mon = parseInt(el.date.substr(5, 2))
          const day = parseInt(el.date.substr(8, 2))
          
          this.vasListMas[day - 1].push(el)
        })

        for( let i = 0; i < this.mon_mas_length[this.chosen_mon]; i++) {
          const config = [false, false, false, false, false, false]
          this.boolListMas.push(config)
        }

        for( let i = 0; i < this.boolListMas.length; i++) {
          for (let j = 0; j < this.vasListMas[i].length; j++) {
            if (this.vasListMas[i][j] !== undefined && this.vasListMas[i][j].role === "smo") {
              this.boolListMas[i][0] = "true"
            }
            if (this.vasListMas[i][j] !== undefined && this.vasListMas[i][j].role === "vmo") {
              this.boolListMas[i][1] = "true"
            }
            if (this.vasListMas[i][j] !== undefined && this.vasListMas[i][j].role === "mo") {
              this.boolListMas[i][2] = "true"
            }

            if (this.vasListMas[i][j] !== undefined && this.vasListMas[i][j].role === "skm") {
              this.boolListMas[i][3] = "true"
            }
            if (this.vasListMas[i][j] !== undefined && this.vasListMas[i][j].role === "km") {
              this.boolListMas[i][4] = "true"
            }
            if (this.vasListMas[i][j] !== undefined && this.vasListMas[i][j].role === "k") {
              this.boolListMas[i][5] = "true"
            }
          }
        }
      },
      openModal(curDay) {
        this.modalVac = []
        this.modalDay = curDay
        for (let i = 0; i < this.GET_VACANCIES.length; i++) {
          for(let j = 0; j < this.vasListMas[curDay].length; j++) {
            if (this.vasListMas[curDay][j].id === this.GET_VACANCIES[i].id) {
              this.modalVac.push(this.GET_VACANCIES[i])
            }
          }
        }
        this.isModalOpen = true
        console.log(this.modalVac)
        // if (this.modalVac.length !== 0) {
        //   this.isModalOpen = true
        // }
      },
      closeWindow() {
        this.isModalOpen = false
      },
      async createVacancy(date, role, gosb, vsp, address) {
        const formData = {
          date: date,
          role: role,
          gosb: gosb,
          vsp: vsp,
          address: address
        }
        console.log(formData)
        await this.CREATE_VACANCY(formData)
        
        this.markOutMonth()
        await this.FETCH_VACANCIES()
        this.makeVacList()
      },
      async deleteVacanty(item) {
        console.log(item)
        await this.DELETE_VACANCIES(item.id)

        this.markOutMonth()
        await this.FETCH_VACANCIES()
        this.makeVacList()
      },
      async GetVac(item) {
        await this.GET_VAC(item)
      }
    },
    
    // async created() {
    //   this.markOutMonth()
    //   await this.FETCH_VACANCIES()
    //   this.makeVacList()
    // },
    async mounted() {
      this.markOutMonth()
      await this.FETCH_VACANCIES()
      this.makeVacList()
      
      await this.GET_USER_ID()
    }
  }
</script>

<style>
  .home{
    color: aliceblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
  }
  .someFilter {
    height: 60px;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
  }
  .filter {
    width: 176px;
    height: 40px;
    border-radius: 1px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-sizing: border-box;
    border-radius: 1px;
  }
  .calendar {
    width: 90%;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 5px;
  }
  .week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 5px;
  }
  .day {
    height: 92px;
    background-color: #656565;

    color: #323232;
    font-family: Gilroy, sans-serif;
    font-size: 54px;
    font-weight: 400;
    font-style: normal;
    text-shadow: 1px 0 1px #656565, 
    0 1px 1px #656565, 
    -1px 0 1px #656565, 
    0 -1px 1px #656565;
  }
  .day_config {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }
  .config {
    width: 10px;
    height: 10px;
    border-radius: 360px; 
    opacity: 70%;
  }
  .material-icons {
    cursor: pointer;
  }
  .material-icons::selection {
    background: transparent;
  }
  .day:hover {
    outline-width: 1px;
    outline-color: wheat;
    outline-style: solid;
    cursor: pointer;
    background-color: #606060;
    font-weight: 300;
    color: white;
  }
  .day::selection {
    background: transparent;
  }
  .SMO{
    background-color: ivory;
    color: black;
  }
  .VMO{
    background-color: indigo
  }
  .MO{
    background-color: mediumblue
  }
  .SKM{
    background-color: seagreen
  }
  .KM{
    background-color: goldenrod;
  }
  .K{
    background-color: maroon;
  }
  .modal {
    position: absolute;
    width: 100%;
    height: 1000px;
    background: #323232;
  }
  .modalVacList {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .modalVacListItem {
    width: 300px;
    border-color: white;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;

    margin: 5px;
    opacity: 80%;
  }
  .close-btn {
    border-color: white;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
  }
  .close-btn:hover{
    background-color: blanchedalmond;
    color: black;
  }
  .create-btn {
    border-color: white;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    margin-bottom: 150px;
  }
  .create-btn:hover {
    background-color: blanchedalmond;
    color: black;
  }
</style>