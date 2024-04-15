import { Schema } from "mongoose";

const QuizSchema = new Schema({
    id: {type:String, required:true, unique:true},
    title: String,
    description: String,
    course: String,
    points: Number,
    quizeType: String,
    timeLimit : Number,
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",},
    isShuffled: Boolean,
    ismultipleAttempts: Boolean,
    isPublished: Boolean,
    viewResponse:  {
      type: String,
      enum: ["Always"],
      default: "Always",},
    showCorrectAnswers: {
      type: String,
      enum: ["Immediately", "After all attempts are graded", "After due date"],
      default: "Immediately",},
    accessCode: String,
    onQuestionAtaTime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    dueDate: String,
    availabilityDate: String,
    untilDate: String
  },
  { collection: "quizes" });
export default QuizSchema;

