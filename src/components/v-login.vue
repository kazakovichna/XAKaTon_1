<template>
  <!--Это авторизация-->
 <div class="v-login">
   <form @submit.prevent="submitHandler">

     <!--Поле для почты в валидацией-->
     <div class="email"
           :class="{invalid: ($v.user_name.$dirty && !$v.user_name.required),
                   valid: $v.user_name.$dirty && $v.user_name.required}"
     >
       <div class="email-icon">
       </div>
       <input class="email-input"
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
           Требуется имя пользователя
         </div>
       </transition>
     </div>

     <!--Это пароль-->
     <div class="password"
         :class="{invalid: ($v.password.$dirty && !$v.password.required),
                   valid: $v.password.$dirty && $v.password.required}"
     >
       <!--Тут иконка-->
       <div class="email-icon">
       </div>
       <!--Это поле для ввода-->
       <input class="email-input"
              type="password"
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

     <!--Тут кнопки: забыли пароль и войти-->
     <div class="login-footer">
       <button class="logIn-btn"
               type="submit"
       >
       <span class="logIn-btn-text">
         Войти
       </span>
       </button>
     </div>
   </form>
 </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: "v-login",
  data: () => ({
    user_name: '',
    password: ''
  }),
  validations: {
    user_name: {
      required  
    },
    password: {
      required
    }
  },
  methods: {
    ...mapActions([
            'AUTH_USER'
    ]),
    // Это для переключения между войти и регистрацией
    toggleRegister () {
      this.$emit('toggleRegister')
    },
    // Это отправки формы
    async submitHandler () {
      // Этот if это валидация
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        username: this.user_name,
        password: this.password
      }
      // ну тут все просто
      // console.log(formData)
      await this.AUTH_USER(formData)
      this.$router.push('/')
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
  .v-login {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    outline: none;
    border: none;
    flex-grow: 1;
    color: white;
  }
  .label-div {
    height: 40px;
  }
  .email-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 24px;
    margin-right: 14px;
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
  .login-footer {
    margin-top: 31px;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  .forget-pass {
    margin-right: 31px;
    font-family: Gilroy, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    cursor: pointer;
    color: white;
    opacity: 0.3;
  }
  .logIn-btn {
    width: 176px;
    height: 40px;
    background: linear-gradient(360deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), #00FFC2;
    background-blend-mode: multiply, normal;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logIn-btn-text {
    font-family: Gilroy, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: black;
  }
  .logIn-btn-text::selection {
    background: transparent;
  }
</style>