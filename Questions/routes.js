import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createQuestion = async (req, res) => {
    try {
      const question = await dao.createQuestion(req.body);
      res.status(201).json(question);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
    }
    const getQuestion = async (req, res) => {
    try {
      const {id} = req.params;
      const questions = await dao.findQuestion(id);
      res.status(200).json(questions);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    }
    const getQuestionsForQuiz = async (req, res) => {
    try {
      const {qID} = req.params;
      const questions = await dao.findQuestionByQuiz(quizID);
      res.status(200).json(questions);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    }
    const updateQuestion = async (req, res) => {
    const {id} = req.params;
    let question = req.body;
    try {
      question = await dao.updateQuestion(id, question);
      res.json(question);
    } 
    catch (error) {
      res.status(409).json({ message: error.message });
    } 
    }

    app.post('api/questions', createQuestion);
    app.put('api/questions/:id', updateQuestion);
    app.get('api/questions/:id', getQuestion);
    app.get('api/quiz/:qID/questions', getQuestionsForQuiz);
}