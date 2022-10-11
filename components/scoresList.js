Vue.component("scoresList-component", {
    data: function () {
        return {
            userData: [],
            record: [],
            usersCount: 0
        }
    },
    created: function () {
        this.getSavedData();
    },
    template: ` <div>
        <ul class="list-group">
            <li v-for="(item,index) in record" v-bind:key="index">{{item.userId}} {{item.userName}} <span class="badge">{{item.score ? item.score : 0}}</span></li>
        </ul>
        <button type="button" @click="backToHome">volver al inicio</button>
        <button type="button" @click="clean">limpiar historial</button>
    </div>
    `,
    methods: {
        getSavedData: function () {

            if (localStorage.record) {
                this.record = JSON.parse(localStorage.getItem("record"))
            }
            if (localStorage.userData) {
                this.userData = JSON.parse(localStorage.getItem("userData"))

                this.userData = { ...this.userData, userId: this.usersCount }

                userDataExist = this.record.filter(record => record.userName === this.userData.userName && record.score === this.userData.score && record.userBirthDate === this.userData.userBirthDate)

                if (userDataExist.length == 0) {
                    this.record.push({ ...this.userData, userId: this.record.length + 1 })
                    this.usersCount += 1
                }
            }
            localStorage.setItem("record", JSON.stringify(this.record))
        },
        backToHome: function () {
            this.$router.push("/")
        },
        clean: function () {
            this.record = []
            localStorage.setItem("record", JSON.stringify([]))
        }
    }
})