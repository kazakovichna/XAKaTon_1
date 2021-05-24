<template>
  <div id="EmptyLayout">
    <div class="head">
      <div class="name">
        <h1>UserName</h1>
      </div>
      <div class="role">
        <h1>Role</h1>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout'
}
</script>

<style>
.head {
  width: 100%;
  height: 100px;
  background: #232323;
  color: aliceblue;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;

}
</style>