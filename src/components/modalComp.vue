<template>
  <!--Модальное окно регистрация перекрывает весь экран-->
  <div class="modal-backdrop">
    <div class="modal">
      <div class="reg-head">
        <!--Тут у нас переключатель регистрации и логина-->
        <div class="login"
             :class="{choose: isOpen}"
             @click="isOpen = true"
        >
          <div class="login-text">
            Войти
          </div>
        </div>
        <div class="signIn"
             :class="{choose: isOpen === false}"
             @click="isOpen = false"
        >
          <div class="signIn-text">
            Регистрация
          </div>
        </div>
      </div>


      <!--Тут регистрация и логин-->
      <div class="body">
        <div class="log-in"
             v-if="isOpen"
        >
          <v-log-in />
        </div>
        <div class="sign-in"
             v-else
        >
          <v-sign-in />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vLogIn from './v-login.vue'
import vSignIn from './v-signin.vue'
export default {
  name: 'modal',
  data: () => ({
    isOpen: true
  }),
  components: {
    vLogIn,
    vSignIn
  }
}
</script>

<style scoped>
.modal-backdrop {
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: start;
}
.modal {
  margin-top: 200px;
  overflow-x: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 448px;
  background: #323232;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
.reg-head {
  margin-top: 23px;
  width: 384px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row ;
}
.login {
  width: 71px;
  text-align: center;
}
.signIn {
  width: 120px;
  text-align: center;
}
.login, .signIn {
  cursor: pointer;
  color: white;
  opacity: 0.2;
  font-family: Gilroy, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
}
.login-text::selection, .signIn-text::selection {
  background: transparent;
}
.choose {
  opacity: 1 !important;
  font-family: Gilroy, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px !important;
  border-width: 0 0 1px 0;
  border-color: white;
  border-style: solid;
}
</style>