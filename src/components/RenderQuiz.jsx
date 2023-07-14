import { useState } from "react";
import { questionData } from "../questionData";

const RenderQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setErrorAlert("");
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === "") {
      // User has not selected an answer
      setErrorAlert("Please select an answer");
      return;
    }

    // Check if the selected answer is correct
    if (
      selectedAnswer === questionData.questions[currentQuestion].correctAnswer
    ) {
      setScore(score + questionData.perQuestionScore);
    }

    // Check if there are more questions or if the questionData is complete
    if (currentQuestion + 1 < questionData.totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setQuizComplete(true);
    }
  };

  if (quizComplete) {
    const totalQuestions = questionData.totalQuestions;
    const correctAnswers = score / questionData.perQuestionScore;
    const wrongAnswers = totalQuestions - correctAnswers;

    return (
      <div className="result-ui">
        <h2>Result</h2>
        <div className="score-breakdown-container">
          <div className="score-breakdown">
            <p>No. of questions:</p>
            <p>{totalQuestions}</p>
          </div>
          <div className="score-breakdown">
            <p>Total Score:</p>
            <p>{score}</p>
          </div>
          <div className="score-breakdown">
            <p>Correct Answers:</p>
            <p>{correctAnswers}</p>
          </div>
          <div className="score-breakdown">
            <p>Wrong Answers:</p>
            <p>{wrongAnswers}</p>
          </div>
        </div>
        <a href="/">
          <button className="play-btn quiz-btn">Play again</button>
        </a>
      </div>
    );
  }

  const currentQuestionData = questionData.questions[currentQuestion];
  const totalQuestions = questionData.totalQuestions;

  const buttonText = currentQuestion === totalQuestions - 1 ? "Finish" : "Next";

  return (
    <div className="quizApp-ui flex">
      <div className="header flex">
        <p>
          Question {currentQuestion + 1}/{totalQuestions}
        </p>
        <h1>Quiz App</h1>
      </div>
      <p className="question">{currentQuestionData.question}</p>
      <ul>
        {currentQuestionData.choices.map((choice, index) => (
          <li
            key={index}
            className={selectedAnswer === choice ? "selected" : ""}
          >
            <label>
              <input
                type="radio"
                name="answer"
                value={choice}
                checked={selectedAnswer === choice}
                onChange={() => handleAnswerSelect(choice)}
              />
              {choice}
            </label>
          </li>
        ))}
      </ul>
      {errorAlert && <p className="error">{errorAlert}</p>}
      <button onClick={handleNextQuestion} className="quiz-btn">
        {buttonText}
      </button>
    </div>
  );
};

export default RenderQuiz;
