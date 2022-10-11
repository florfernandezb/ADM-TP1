const Questions = [{
    id: 0,
    q: "¿Quién interpretó a Hitler en “El gran dictador”?",
    a: [{ text: "gandhinagar", isCorrect: false },
    { text: "Charles Chaplin.", isCorrect: true },
    { text: "Surat", isCorrect: false },
    { text: "mumbai", isCorrect: false }
    ],
    mustShow: true

},
{
    id: 1,
    q: "¿Cuál fue la primera película de Disney?",
    a: [{ text: "Lampang", isCorrect: false, isSelected: false },
    { text: "phuket", isCorrect: false },
    { text: "Ayutthaya", isCorrect: false },
    { text: "Blancanieves.", isCorrect: true }
    ],
    mustShow: false

},
{
    id: 2,
    q: "¿Cómo se llama la madre de Simba en la película de “El rey león”?",
    a: [{ text: "surat", isCorrect: false },
    { text: "vadodara", isCorrect: false },
    { text: "Sarabi.", isCorrect: true },
    { text: "rajkot", isCorrect: false }
    ],
    mustShow: false
}
]

Vue.component("trivia-component", {
    data: function () {
        let algo = Questions
        return {
            questionsList: algo,
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
    destroyed: function() {
        console.log("cuadno llega al destroy?")
        console.log(this.questionsList, Questions)
        this.questionsList = Questions
    },
    // <div v-for="(question,index) in questionsList">
    template: `<div class="panel">
        <div v-for="(question,index) in questionsList">
            <div v-if="question.mustShow"> 

                    <div v-if="answer.hasAnswered === true" class="result">
                        <div v-if="answer.isCorrect === true" class="alert alert-success" role="alert">
                            Felicitaciones! su rta es correcta!
                        </div>
                        <div v-else class="alert alert-danger" role="alert">
                            Respuesta incorrecta, vuelva a intentar
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
                        <button type="button" @click="nextQuestion(question.id)" class="next">Next</button>
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
                this.$router.push('/scores');
            } else {
                this.questionsList.map(quest => { if (quest.id == id) { quest.mustShow = false } })
                this.questionsList[id + 1].mustShow = true
                this.answer.hasAnswered = false
                console.log(this.questionsList, Questions)
            }
        }
    }
});