<template>
  <div class="vacancies">
    <div class="RO-module"
        v-if="GET_USER_DATA.role === 'ro'"
    >
        <h3>Admin</h3>
        <div class="vac-app-list">
            <div class="vac-app-list-item"
                v-for="item in GET_USER_APP"
                :key="item.id"
            >
                <!-- {{item}} -->
                <div class="user">
                    UserID {{item.user}}
                </div>
                <div class="vacancy">
                    VacID {{item.vacancy}}
                </div>
                <div class="satus">
                    Status {{item.status}}
                </div>
            </div>
        </div>

    </div>
    <div class="user"
        v-else
    >
        <h3>User</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'vacancies',
    data: () => ({

    }),
    computed: {
        ...mapGetters([
            'GET_USER_DATA',
            'GET_USER_APP'
        ])
    },
    methods: {
        ...mapActions([
            'GET_VAC_APP',
            'GET_USER_ID'
        ])
    },
    mounted() {
        this.GET_VAC_APP()
        this.GET_USER_ID()
    }
}
</script>

<style>
.vacancies {
    background: #323232;
}
.RO-module {
    color: white;
}
.vac-app-list-item {
     border-color: white;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    padding-bottom: 150px;
}
</style>