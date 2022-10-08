const Questions = [{
    id: 0,
    q: "What is capital of India?",
    a: [{ text: "gandhinagar", isCorrect: false },
        { text: "Surat", isCorrect: false },
        { text: "Delhi", isCorrect: true },
        { text: "mumbai", isCorrect: false }
    ]

},
{
    id: 1,
    q: "What is the capital of Thailand?",
    a: [{ text: "Lampang", isCorrect: false, isSelected: false },
        { text: "phuket", isCorrect: false },
        { text: "Ayutthaya", isCorrect: false },
        { text: "Bangkok", isCorrect: true }
    ]

},
{
    id: 2,
    q: "What is the capital of Gujarat",
    a: [{ text: "surat", isCorrect: false },
        { text: "vadodara", isCorrect: false },
        { text: "gandhinagar", isCorrect: true },
        { text: "rajkot", isCorrect: false }
    ]

}

]

Vue.component("trivia-component", {
    data: function () {
        return {
            questionsList: Questions
            , arr: []
        }
    },
    template: `<div class="panel">
        <div v-for="(question,index) in questionsList">
            <div class="result">
    
            </div>
            <div class="question-container" id="question">
                {{question.q}}
            </div>
            <div class="option-container">
                <button class="option" onclick="" :id="question.a[0]" >{{question.a[0].text}}</button>
        
                <button class="option" :id="question.a[1].text" >{{question.a[1].text}}</button>
        
                <button class="option" :id="question.a[2].text">{{question.a[2].text}}</button>
        
                <button class="option" :id="question.a[3].text">{{question.a[3].text}}</button>
            </div>
            <div class="navigation">
                <button class="evaluate">Evaluate</button>
                <button class="next">Next</button>
            </div>
        </div>
    </div>`
});