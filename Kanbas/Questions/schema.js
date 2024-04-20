import mongoose from 'mongoose';


const questionSchema = new mongoose.Schema({
    title: String,
    quizID: String,
    points: Number,
    question: String,
    questionType: {
        type: String,
        enum: ['multipleChoice', 'trueFalse', 'fillInBlanks'],
        default: 'multipleChoice'
    },
    choices:[choicesSchema],
    trueFalse : Boolean,
    blanks:[blanksSchema]
}, {collection:"questions"});


const choicesSchema = new mongoose.Schema({
    choices: [{ text: String, isCorrect: Boolean }]
}, { collection: "choices" });


const blanksSchema = new mongoose.Schema({
    blanks: [{ blank: String, answer: String }]
}, { collection: "blanks" });

export default questionSchema;