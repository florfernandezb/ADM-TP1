Vue.component('userForm-component', {
	data: function () {
		return {
			user_data: {
				userName: "",
				userBirthDate: "",
			},

			error: [],
			hasBeenSent: false,

			arr: []
		}
	},
	computed: {
		hayErrores: function () {
			return this.error.length;
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
				<input type="date" v-model="user_data.userBirthDate" placeholder="Ingrese su año de nacimiento"/>
			</div>
			
			<button type="button" @click="save(user_data)" value="Guardar">Guardar </button>
		</form>	
	</div>
			
		
		<ul class="lista">
		
			<li v-for="(item,index) in arr" v-bind:key="index">{{item}}</li>
		</ul>
		<div v-if="hasBeenSent === true">
			<div v-if="hayErrores" class="classerror">
			 <ul>
	     		 <li v-for="x in error" >{{x}}</li>
	    	</ul>
	  		</div>
	  		<div v-else class="hasBeenSent">
	          <span>Enviado con éxito</span>
	      </div>
 		</div>
	
	</div>`,
	methods: {
		mustShowError: function (fieldToEvaluate) {
			return fieldToEvaluate == "" ? true : false

		},
		save: function (user_data) {
		
			this.hasBeenSent = true
			this.error = []

			if (this.mustShowError(user_data.userName)) {
				this.error.push('Debe ingresar el nombre')
			}
			if (this.mustShowError(user_data.userBirthDate)) {
				this.error.push('Debe ingrsar la fecha de nacimiento')
			}

			if (this.error.length == 0) {
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
	}
})