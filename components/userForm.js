Vue.component('userForm-component', {
	data: function () {
		return {
			user_data: {
				userName: "",
				userBirthDate: "",
			}, arr: []
		}
	},
	template: `<div class="container">

	<div class="form row">
		<form v-on:submit.prevent>
			<div class="col-6">
				<label>Nombre</label>
				<input type="text" v-model.trim="user_data.userName" placeholder="Ingrese su nombre"/>
			</div>
			<div class="col-6">
				<label>Año de nacimiento</label>
				<input type="number" v-model="user_data.userBirthDate" placeholder="Ingrese su año de nacimiento"/>
			</div>
			
			<button type="button" @click="save(user_data)" value="Guardar">Guardar </button>
		</form>	
	</div>
			
		
		<ul class="lista">
		
			<li v-for="(item,index) in arr" v-bind:key="index">{{item}}</li>
		</ul>
	
	</div>`,
	methods: {
		save: function (user_data) {

			if (!localStorage.userData) {
				arr = []
			} else {
				arr = JSON.parse(localStorage.getItem("userData"))
			}

			arr.push({ ...user_data, userId: arr.length + 1 })

			localStorage.setItem("userData", JSON.stringify(arr))

			this.$router.push('/trivia');
		}
	}
})