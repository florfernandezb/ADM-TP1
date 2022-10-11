const Questions = [{
    id: 0,
    q: "¿Cuál es la carne más cara del mundo?",
    a: [{ text: "Cerdo", isCorrect: false },
    { text: "Sushi", isCorrect: false },
    { text: "Wagyu", isCorrect: true },
    { text: "Pollo", isCorrect: false }
    ],
    additionalData: "¡La carne de Kobe Wagyu cuesta alrededor de $ 200 por libra! Este tipo de comida tiene su origen en la cocina japonesa pero ahora es conocida mundialmente",
    mustShow: true

},
{
    id: 1,
    q: "¿Qué refresco fue más famoso en 1892?",
    a: [{ text: "Pepsi Cola", isCorrect: false, isSelected: false },
    { text: "Dr. Pepper", isCorrect: false },
    { text: "Mountain Dew.", isCorrect: false },
    { text: "Coca Cola", isCorrect: true },
    ],
    additionalData: "Incluso hasta ahora, el clásico refresco Coca-Cola todavía mantiene su lugar en el número uno.!",
    mustShow: false

},
{
    id: 2,
    q: "¿Cuál es el significado literal de 'Dorito'?",
    a: [{ text: "Cosas deliciosas", isCorrect: false },
    { text: "Bondad cursi", isCorrect: false },
    { text: "Pequeñas cosas doradas", isCorrect: true },
    { text: "Pequeño y delicioso", isCorrect: false }
    ],
    additionalData: "¡Nada puede reemplazar estas pequeñas cosas doradas! Apuesto a que son la comida favorita de la mayoría de la gente. Esa es una de las buenas preguntas divertidas sobre la comida Trivia.",
    mustShow: false
},
{
    id: 3,
    q: "¿Cuál es el primer alimento en el espacio?",
    a: [{ text: "Hamburguesa", isCorrect: false },
    { text: "Carne en conserva", isCorrect: false },
    { text: "Huevos revueltos", isCorrect: false },
    { text: "Salsa de manzana", isCorrect: true }
    ],
    additionalData: "No es de extrañar que los astronautas estén tan en forma!",
    mustShow: false
},
{
    id: 4,
    q: " ¿Cuál es la traducción al inglés de la palabra eslava vodka?",
    a: [{ text: "Poca agua", isCorrect: true },
    { text: "Poco borracho", isCorrect: false },
    { text: "Mucha agua", isCorrect: false },
    { text: "agua bendita", isCorrect: false }
    ],
    additionalData: "Aunque signifique 'poca agua', no reemplace el agua con ella!",
    mustShow: false
},
{
    id: 5,
    q: " ¿Qué fruta puede ablandar la carne?",
    a: [{ text: "Piña", isCorrect: true },
    { text: "Naranja", isCorrect: false },
    { text: "Manzana", isCorrect: false },
    { text: "Fresa", isCorrect: false }
    ],
    additionalData: "La enzima de la piña llamada bromelina suaviza la fibra muscular.",
    mustShow: false
},
{
    id: 6,
    q: "¿Cómo se llama a un vegetariano que también come carne de pollo?",
    a: [{ text: "Pescetarian", isCorrect: false },
    { text: "Fruitario", isCorrect: false },
    { text: "Pollotario", isCorrect: true },
    { text: "Vegano", isCorrect: false }
    ],
    additionalData: "Estas personas están unos pasos antes que los vegetarianos. No comen carnes rojas ni cerdo!",
    mustShow: false
},
{
    id: 7,
    q: "¿Quién inventó la fritura?",
    a: [{ text: "Francés", isCorrect: false },
    { text: "Egipcios", isCorrect: true },
    { text: "Americanos", isCorrect: false },
    { text: "Británicos", isCorrect: false }
    ],
    additionalData: "En ese momento, ni siquiera sabían que iba a cambiar la industria alimentaria para siempre.!",
    mustShow: false
},
{
    id: 8,
    q: "¿Cuál fue la primera bebida de Starbucks?",
    a: [{ text: "Frappé de moca oscuro", isCorrect: false },
    { text: "Café latte", isCorrect: true },
    { text: "Caramel Macchiato", isCorrect: false },
    { text: "Latte de té verde", isCorrect: false }
    ],
    additionalData: "El Starbucks Cafe Latte se vendió por primera vez en Seattle.",
    mustShow: false
},
{
    id: 9,
    q: "¿Cuál es el sabor de helado más famoso del mundo?",
    a: [{ text: "Chocolate", isCorrect: true },
    { text: "fresa", isCorrect: false },
    { text: "Vainilla", isCorrect: false },
    { text: "Mango", isCorrect: false }
    ],
    additionalData: "Todo el mundo ama el helado de vainilla favorito clásico y pasado de moda!",
    mustShow: false
}
]

Vue.component("trivia-component", {
    data: function () {
        return {
            questionsList: Questions,
            selected: "",
            answer: {
                hasAnswered: false,
                isCorrect: false
            },
            counter: 0
        }
    },
    computed: {
        showAnswer: function () {
            return this.error.length;
        }
    },
    template: `<div class="panel">
        <div v-for="(question,index) in questionsList">
            <div v-if="question.mustShow"> 

                    <div v-if="answer.hasAnswered === true" class="result">
                        <div v-if="answer.isCorrect === true" class="alert alert-success" role="alert">
                            <span class="additionalData">{{question.additionalData}}</span>
                        </div>
                        <div v-else class="alert alert-danger" role="alert">
                        <span class="additionalData">Respuesta incorrecta, vuelva a intentar</span>
                        </div>
                        
                    </div>

                    <div class="question-container" id="question.text">
                        {{question.q}}
                    </div>
                    
                    <select v-model="selected" class="option-container">
                        <option v-for="answer in question.a" :value="answer.text" class="option">{{answer.text}}</option>
                    </select>
                    
                    <div class="navigation">
                        <button type="button" @click="save(question)" class="evaluate" value="Guardar">Guardar </button>
                        <button type="button" @click="nextQuestion(question.id)" class="next">Siguiente</button>
                    </div>
            </div>
        </div>
    </div>`,
    methods: {
        saveInLocalStorage: function (key, obj) {

            var newObj = JSON.parse(localStorage.getItem("userData"));
            for (var k in obj) {
                newObj[k] = obj[k];
            }
            localStorage.setItem("userData", JSON.stringify(newObj));
            return newObj;

        },
        save: function (question) {
            this.answer.hasAnswered = true
            let userData = JSON.parse(localStorage.getItem("userData"))
            for (answer of question.a) {
                if (answer.text == this.selected) {

                    if (answer.isCorrect) {
                        let userDataScore = userData.score ? userData.score : 0
                        localStorage.setItem("userData", JSON.stringify({ ...userData, score: userDataScore + 1 }));
                    }

                    this.answer.isCorrect = answer.isCorrect
                }
            }
        },
        nextQuestion: function (id) {
            if (this.questionsList.length - 1 === id) {
                this.resetQuestions()
                this.$router.push('/scores');
            } else {
                this.questionsList.map(quest => { if (quest.id == id) { quest.mustShow = false } })
                this.questionsList[id + 1].mustShow = true
                this.answer.hasAnswered = false
            }
        },
        resetQuestions: function () {
            for (let i = 0; i < this.questionsList.length; i++) {
                i == 0 ? this.questionsList[i].mustShow = true : this.questionsList[i].mustShow = false
            }
        },
    }
});