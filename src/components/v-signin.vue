<template>
  <!--Это регистрация-->
  <div class="v-login">
    <form @submit.prevent="submitHandler">
      <!--Это почта с валидацией-->
      <div class="email"
           :class="{invalid: ($v.user_name.$dirty && !$v.user_name.required),
                   valid: $v.user_name.$dirty && $v.user_name.required}"
      >
        <!--Это форма-->
        <input class="email-input rep"
               type="text"
               v-model.trim="user_name"
               placeholder="Введите имя пользователя"
        >
      </div>
      <!--Это валидация почты-->
      <div class="label-div">
        <transition name="fade">
          <div
              class="invalid-text"
              v-if="$v.user_name.$dirty && !$v.user_name.required"
          >
            Необходимо ввести имя пользователя
          </div>
        </transition>
      </div>

      <!--Это пароль-->
      <div class="password"
           :class="{invalid: ($v.password.$dirty && !$v.password.required),
                   valid: $v.password.$dirty && $v.password.required}"
      >
        <!--Это форма пароля-->
        <input class="email-input  rep"
               type="text"
               v-model.trim="password"
               placeholder="Введите пароль"
        >
      </div>
      <!--Это валидация пароля-->
      <div class="label-div">
        <transition name="fade">
          <div
              class="invalid-text"
              v-if="$v.password.$dirty && !$v.password.required"
          >
            Необходимо ввести пароль
          </div>
        </transition>
      </div>

      <!--Это повторение пароля-->
      <div class="password"
           :class="{valid: repeat_password === password && repeat_password.length !== 0,
                    invalid: repeat_password !== password || ( repeat_password.length === 0  && $v.repeat_password.$dirty)
           }"
      >
        <input class="email-input rep"
               type="text"
               v-model.trim="repeat_password"
               placeholder="Повторите пароль"
        >
      </div>
      <!--Это валидация повторения пароля-->
      <div class="label-div">
        <transition name="fade">
          <div
              class="invalid-text"
              v-if="repeat_password !== password && $v.repeat_password.$touch"
          >
            Необходимо чтобы пароли совпадали
          </div>
        </transition>
      </div>



      <div class="first_name"
           :class="{invalid: ($v.first_name.$dirty && !$v.first_name.required),
                   valid: $v.first_name.$dirty && $v.first_name.required}"
      >
          <input class="email-input  rep"
                 placeholder="Введите имя"
                 v-model.trim="first_name"
                 type="text"
          >
      </div>
      <div class="label-div">
        <transition name="fade">
          <div
              class="invalid-text"
              v-if="$v.first_name.$dirty && !$v.first_name.required"
          >
            Необходимо ввести имя
          </div>
        </transition>
      </div>



      <div class="first_name"
           :class="{invalid: ($v.second_name.$dirty && !$v.second_name.required),
                   valid: $v.second_name.$dirty && $v.second_name.required}"
      >
          <input class="email-input  rep"
                 placeholder="Введите фамилию"
                 v-model.trim="second_name"
                 type="text"
          >
      </div>
      <div class="label-div">
        <transition name="fade">
          <div
              class="invalid-text"
              v-if="$v.second_name.$dirty && !$v.second_name.required"
          >
            Необходимо ввести фамилию
          </div>
        </transition>
      </div>

<!--//----------------------------------->

    <div class="org-role-div">
        <div class="org-role"
                :class="{list_dropdown_pressed: isRoleListOpen1 === true,
                        invalid: ($v.role.$dirty && !$v.role.required),
                        valid: role !== '' && $v.role.$dirty && !($v.role.$dirty && !$v.role.required)}"
        >
            <div class="list-title"
                @click="isRoleListOpen1 = !isRoleListOpen1"
            >
                <p
                class="choseField" 
                :class="{list_dropdown_pressed: isRoleListOpen1 === true}"
                    v-if="!role.length"
                >Роль</p>
                <p v-else
                    class="choseField"
                    :class="{list_dropdown_pressed: isRoleListOpen1 === true}"
                >{{ role_list_means[role_list.indexOf(role)] }}</p>
                <div class="material-icons"
                        v-if="isRoleListOpen1 === false"
                >
                    keyboard_arrow_down
                </div>
                <div class="material-icons list_dropdown_pressed"
                        v-else
                >
                    keyboard_arrow_up
                </div>
            </div>
          </div>
        <div class="invalid-text"
                v-if="$v.role.$dirty && !$v.role.required"
        >
            Укажите роль
        </div>
    </div>

    <div class="list-dropdown-div"
        v-if="isRoleListOpen1 === true"
    >
        <div class="list-dropdown">
            <div class="list-dropdown-item"
                v-for="item in role_list"
                @click="choose_role(item)"
                :key="item"
            >
            <span>{{ role_list_means[role_list.indexOf(item)] }}</span>
            </div>
        </div>
    </div>


<!--//----------------------------------->

<div class="org-role-div">
        <div class="org-role"
                :class="{list_dropdown_pressed: isRoleListOpen2 === true,
                        invalid: ($v.role.$dirty && !$v.role.required),
                        valid: role !== '' && $v.role.$dirty && !($v.role.$dirty && !$v.role.required)}"
        >
            <div class="list-title"
                @click="isRoleListOpen2 = !isRoleListOpen2"
            >
                <p 
                class="choseField"
                :class="{list_dropdown_pressed: isRoleListOpen2 === true}"
                    v-if="!role.length"
                >ГОСБ</p>
                <p v-else
                class="choseField"
                    :class="{list_dropdown_pressed: isRoleListOpen2 === true}"
                >{{ gosb_list_means[gosb_list.indexOf(gosb)] }}</p>
                <div class="material-icons"
                        v-if="isRoleListOpen2 === false"
                >
                    keyboard_arrow_down
                </div>
                <div class="material-icons list_dropdown_pressed"
                        v-else
                >
                    keyboard_arrow_up
                </div>
            </div>
          </div>
        <div class="invalid-text"
                v-if="$v.role.$dirty && !$v.role.required"
        >
            Укажите роль
        </div>
    </div>

    <div class="list-dropdown-div"
        v-if="isRoleListOpen2 === true"
    >
        <div class="list-dropdown">
            <div class="list-dropdown-item"
                v-for="item in gosb_list"
                @click="choose_gosb(item)"
                :key="item"
            >
            <span>{{ gosb_list_means[gosb_list.indexOf(item)] }}</span>
            </div>
        </div>
    </div>


<!--//----------------------------------->


    <div class="first_name"
        :class="{invalid: ($v.first_name.$dirty && !$v.first_name.required),
                   valid: $v.first_name.$dirty && $v.first_name.required}"
    >
          <input class="email-input  rep"
                 placeholder="Введите ВСП"
                 v-model.trim="vsp"
                 type="number"
          >
    </div>
    <div class="label-div">
    <transition name="fade">
        <div
            class="invalid-text"
            v-if="$v.first_name.$dirty && !$v.first_name.required"
        >
        Необходимо ввести ВСП
        </div>
    </transition>
    </div>




      <!--Это нижняя часть тут чекбокс и кнопка зарегистрироваться-->
      <div class="login-footer">

        <!--Это согласие с политикой конфедициальности-->
        <div class="checkbox-div">
          <div class="checkbox">
            <input type="checkbox">
          </div>
          <div class="checkbox-label">
            Соглашаюсь с
            <span class="text-btn">Политикой конфиденциальности</span>
          </div>
        </div>

        <!--Кнопка зарегистрироваться-->
        <button class="reg-btn" type="submit">
          <span class="reg-btn-text">
            Зарегистрироваться
          </span>
        </button>
      </div>
    </form>
 </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: "v-login",
  data: () => ({
    email: '',
    user_name: '',
    password: '',
    repeat_password: '',
    first_name: '',
    second_name: '',
    role: '',
    gosb: '',
    vsp: null,
    role_list: [
        'smo',
        'vmo',
        'mo',
        'skm',
        'km',
        'k',
        'ro'
    ],
    role_list_means: [
        'Старший менеджер по обслуживанию',
        'Ведущий менеджер по обслуживанию',
        'Менеджер по обслуживанию',
        'Старший клиентский менеджер',
        'Клиентский менеджер',
        'Консультант',
        'Руководитель офиса'
    ],
    gosb_list: [
        4157,
        9070,
        8635,
        8636,
        8567,
        8645,
        8557,
        8556
    ],
    gosb_list_means: [
        'Биробиджанское отделение',
        'ГО по Хабаровскому краю',
        'Приморское отделение',
        'Благовещенское отделение',
        'Ю.-Сахалинское отделение',
        'С.-Восточное отделение',
        'Чукотское отделение',
        'Камчатское отделение'
    ],
    isRoleListOpen1: false,
    isRoleListOpen2: false,
  }),
  validations: {
    user_name: {
      required
    },
    password: {
      required
    },
    repeat_password: {
      required
    },
    first_name: {
        required
    },
    second_name: {
        required        
    },
    role: {
        required
    },
    vsp: {
        required
    }
  },
  methods: {
    ...mapActions([
      'CREATE_USER'
    ]),

    // Это переключение между войти и зарегистрироваться
    toggleRegister () {
      this.$emit('toggleRegister')
    },

    // Это отправка данных на сервер и зарегаться
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        username: this.user_name,
        password: this.password,
        first_name:this.first_name,
        last_name: this.second_name,
        role: this.role,
        gosb: this.gosb,
        vsp: parseInt(this.vsp)
      }
      // console.log(formData)
      this.CREATE_USER(formData)
    },

    choose_role(item) {
        this.isRoleListOpen1 = false
        this.role = item
    },
    choose_gosb(item) {
        this.isRoleListOpen2 = false
        this.gosb = item
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.valid {
  border-color: #00FFC2 !important;
}
.invalid {
  border-color: #FF7a7a !important;
}
.invalid-text {
  margin-top: 5px;
  color: #FF7a7a;
  font-family: Gilroy, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}
.label-div {
  height: 40px;
}
.v-login {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.email {
  margin-top: 35px;
  width: 384px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
}
.email-input {
  height: 40px;
  background-color: #3c3c3c;
  box-shadow: none;
  border: none;
  flex-grow: 1;
  color: white;
  outline: none;
}
.rep {
  margin-left: 24px;
}
.email-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
  margin-right: 14px;
}
.org-role-div {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.org-role {
  margin-bottom: 40px;
  width: 344px;
  height: 48px;
  padding-left: 24px;
  padding-right: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: #3c3c3c;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  border-color: #636363;
}
.list-title {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.list_dropdown_pressed {
  background-color: #f5f5f5;
  color: black !important;
}
.list-dropdown-div {
  margin-top: 48px;
  color: black;
  width: 345px;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: flex-end !important;
}
.list-dropdown {
  margin-right: 1px;
  width: 215px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
.list-dropdown-item {
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Gilroy, sans-serif;
  color: black;
  opacity: 0.8;
}
.list-dropdown-item span {
padding-left: 15px;
font-family: Gilroy, sans-serif;
color: black;
opacity: 0.8;
}
.list-dropdown-item span::selection {
background: transparent;
}
.list-dropdown-item:hover {
    background-color: white;
}
.material-icons {
  font-family: 'Material Icons', sans-serif;
  color: white;
  font-size: 20px;
  font-weight: lighter;
}
.password {
  width: 384px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
}
.first_name {
    width: 384px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
}
.login-footer {
  width: 100%;
  margin-top: 31px;
  display: flex;
  justify-content: right;
  align-items: center;
  flex-direction: column;
}
.checkbox-div {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
}
.checkbox-label {
  margin-left: 16px;
  font-family: Gilroy, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: white;
  cursor: pointer;
}
input[type = checkbox] {
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-color: #323232 !important;
  outline: none;
}
input[type = checkbox]:checked {
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-color: #323232 !important;
  outline: none;
}
.text-btn {
  color: #0ccc9e;
}
.text-btn::selection {
  background: transparent;
}
.reg-btn {
  margin: 35px 0 35px 0;
  width: 220px;
  height: 40px;
  background: linear-gradient(360deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), #00FFC2;
  background-blend-mode: multiply, normal;
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.reg-btn-text {
  font-family: Gilroy, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: black;
}
.reg-btn-text::selection {
  background: transparent;
}
.choseField {
  color:blanchedalmond;
}
</style>