

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    console.log(availableQuestions);
    getNewQuestion()
}
getNewQuestion = () => {
    if (questions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("/end.html")
    }


    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.getElementsByClassName.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * questions.length)
    console.log(questions.length);
    currentQuestion = questions[questionIndex]
    question.innerText = currentQuestion.question


    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

        questions.splice(questionIndex, 1)
    })
    acceptingAnswers = true
    questionCounter++
}