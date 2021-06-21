var questionList = [
        {
                question: "Что из перечисленного не является языком программирования?",
                answersOption: ["HTML","Java","Python","DevOps"],
                rightOptions: [true,false,false,true],
                userOptions: [false,false,false,false],
                isRightAnswer: false
        },
        {
                question: "Какие из перечисленных видов тестирования могут быть автоматизированы?",
                answersOption: ["UI тестирование","Юзабилити тестирование","Тестирование совместимости","Unit тестирование"],
                rightOptions: [true,false,true,true],
                userOptions: [false,false,false,false],
                isRightAnswer: false
        },
        {
                question: "Выберите типы аглоритмов, которых не существует",
                answersOption: ["Алгоритм с ветвлением","Циклический безусловный","Циклический с параметром","Алгоритм с углублением"],
                rightOptions: [false,false,true,false],
                userOptions: [false,false,false,false],
                isRightAnswer: false
        },
        {
                question: "Какой(какие) из следующих конструкций используется(используются) для ветвления?",
                answersOption: ["switch case","if else","do while","for"],
                rightOptions: [true,true,false,false],
                userOptions: [false,false,false,false],
                isRightAnswer: false
        },
        {
                question: "Какого(каких) метода(методов) тестирования не существует?",
                answersOption: ["Метод белого ящика","Метод игры в ящик","Метод кротовой норы","Метод серого ящика"],
                rightOptions: [false,true,true,false],
                userOptions: [false,false,false,false],
                isRightAnswer: false
        },
]

function Question (question, answersOption=[],rightOptions=[],userOptions=[],isRightAnswer){
        this.question = question
        this.answersOption = answersOption
        this.rightOptions = rightOptions
        this.userOptions = userOptions
        this.isRightAnswer = isRightAnswer
}

function getQuestionText(){
        var input = prompt("Введите текст вопроса: ")
        return input
}

function getAnswerOption(){
        var answersOption = []
        for(var i = 1; i <=4;i++){
                var input = prompt(`Введите ${i} вариант ответа`)
                if(isNotEmpty(input,2,i)){
                        answersOption.push(input)
                }else return false
        }
        return answersOption
}

function testUnique(array) {
        var n = array.length
        for (var i = 0; i < n-1; i++) {
                for (var j = i+1; j < n; j++) {
                        if (array[ i ] === array[j]) return false
                }
        }
        return true
}

function getRightOption(){
        var rightOptions = [false,false,false,false]
        var input = prompt(`Введите верные варианты ответа через запятую от 1 до 4`)
        var exp = /[1-4]+[,]?[\w]\b/
        var isNum = exp.test(input)
        var answerOptions = input.split(",")
        if(isNotEmpty(input, 3)) {
                if(isNum&&(answerOptions.length <= 4)&&testUnique(answerOptions)){
                        for(var i = 0; i < answerOptions.length; i ++ ){
                                if(answerOptions[i]<=4){
                                        var numOptionTrue = answerOptions[i]
                                        rightOptions[numOptionTrue-1] = true
                                }else return alert(systemMessage(6))
                        }return rightOptions
                } else {
                        alert(systemMessage(6))
                        return false
                }
        } else {
                return false
        }

        //console.log(rightOptions)
}

function isNotEmpty(input, sm, option){
        if(input === ""){
                alert(systemMessage(sm,option))
                return false
        }else if(input === null){
                return false
        }else return true
}

function createQuestion(){
        var input = getQuestionText()
        if(isNotEmpty(input, 1)){
                var question = input
        }else return
        input = getAnswerOption()
        if(input){
                var answerOptions = input
        }else return
        input = getRightOption()
        if(input){
                var rightOptions = input
        }else return
        var userOptions = [false,false,false,false]
        var isRightAnswer = false
        questionList.push(new Question(question,answerOptions,rightOptions,userOptions,isRightAnswer))
        //console.log(questionList)
}

document.addEventListener("change", function (event){
        var check = event.target
        var selectedCheckbox = check.name.split(" ")
        if(check.checked){
                questionList[selectedCheckbox[0]].userOptions[selectedCheckbox[1]] = true
                console.log(check.name + " checked")
        } else{
                questionList[selectedCheckbox[0]].userOptions[selectedCheckbox[1]] = false
                console.log(check.name + " unchecked")
        }
        // console.log(questionList[selectedCheckbox[0]])

})

function markRightAnswers(){
        var countRightAnswers = 0
        var countQuestions = questionList.length
        for(var i = 0; i < countQuestions; i++){
                if(JSON.stringify(questionList[i].userOptions) === JSON.stringify(questionList[i].rightOptions)) {
                        questionList[i]["isRightAnswer"] = true
                        countRightAnswers++
                } else questionList[i]["isRightAnswer"] = false

        }
}

function showResult(){
        var incorrectAnswers = ""
        var countQuestions = questionList.length
        var countRightAnwers = countQuestions
        for(var i = 0; i < countQuestions; i++){
                if(questionList[i].userOptions.includes(true)){
                        if(questionList[i].isRightAnswer === false){
                                incorrectAnswers += `${i+1}. ${questionList[i].question}\n`
                                countRightAnwers--
                        }
                }else {
                        alert(systemMessage(4))
                        return
                }
        }
        if(countRightAnwers === countQuestions){
                alert(systemMessage(5,0,countRightAnwers,countQuestions))
        }else alert(systemMessage(7,incorrectAnswers,countRightAnwers,countQuestions))
}

function getResult(){
        var buttonResult = document.createElement("button")
        buttonResult.textContent = "Проверить результат"
        document.body.append(buttonResult)
        buttonResult.onclick = function (){
                markRightAnswers()
                showResult()


        }
}

function startTest(){
        var buttonCreateQuestion = document.getElementById("buttonCreateQuestion")
        buttonCreateQuestion.setAttribute("disabled", true)
        var buttonStartTest = document.getElementById("buttonStartTest")
        buttonStartTest.setAttribute("disabled", true)
        viewQuestions(questionList)
        getResult()


}

function viewQuestions(questionList){
        for(var i = 0; i < questionList.length; i++){
                var question = document.createElement("label")
                var br = document.createElement("br")
                question.textContent = `${i+1}. ${questionList[i].question}`
                document.body.append(question)
                document.body.append(br)
                for(var j = 0; j < questionList[i].answersOption.length; j++){
                        var br = document.createElement("br")
                        var answerOption = document.createElement("label")
                        var chekbox = document.createElement("input")
                        chekbox.type = "checkbox"
                        chekbox.name = `${i} ${j}` //checkbox name to match the value in the array
                        answerOption.textContent = questionList[i].answersOption[j]
                        document.body.append(chekbox)
                        //document.body.append(chekbox.name)
                        document.body.append(answerOption)
                        document.body.append(br)
                }
                var br = document.createElement("br")
                document.body.append(br)
        }
}


function systemMessage(sm, answerOption, countRightAnswers,countQuestions){
        switch (sm){
                case 1: return "Вы не ввели текст вопроса.Попробуйте добавить вопрос заново."

                case 2: return `Вы не ввели текст ${answerOption} варианта ответа. Попробуйтете добавить вопрос заново.`

                case 3: return "Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново."

                case 4: return "Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения."

                case 5: return `Ваш результат ${countRightAnswers} из ${countQuestions}. Вы молодец!`

                case 6: return "Поле может содержать только уникaльные цифры 1,2,3,4 разделенные запятой. Попробуйте добавить вопрос заново"

                case 7: return "Вы неправильно ответили на вопросы:\n\n" + answerOption +

                    "\n\nВаш результат " + countRightAnswers + " из " + countQuestions +"."

        }
}