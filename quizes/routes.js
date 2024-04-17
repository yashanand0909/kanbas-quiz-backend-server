import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createQuiz = async (req, res) => {
    try {
      const quiz = await dao.createQuiz(req.body);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
   const getQuizesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const quizes = await dao.findquizesForCourse(courseId);
      res.status(200).json(quizes);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  
   const getQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuiz(id);
      res.status(200).json(quiz);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  
   const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    let quiz = req.body;
    try {
      quiz = await dao.updateQuiz(qid, quiz);
      res.json(quiz);
    } 
    catch (error) {
      res.status(409).json({ message: error.message });
    } 
  }
  
   const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      const status = await dao.deleteQuiz(qid);
      res.status(status)
    }
    catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
  
   const publishQuize = async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuiz(qid);
      quiz.isPublished = true;
      await dao.updateQuiz(qid, quiz);
      res.status(200).json(quiz);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
  
   const unpublishQuize = async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuiz(qid);
      quiz.isPublished = false;
      await dao.updateQuiz(qid, quiz);
      res.status(200).json(quiz);
    }
    catch (error) {
      res.status(409).json({ message: error.message });
    }
  }

  app.post("/api/quizes", createQuiz);
  app.get("/api/courses/:cid/quizes", getQuizesForCourse);
  app.get("/api/quizes/:qid/publish", publishQuize);
  app.get("/api/quizes/:qid/unpublish", unpublishQuize);
  app.get("/api/quizes/:qid", getQuiz);
  app.put("/api/quizes/:qid", updateQuiz);
  app.delete("/api/quizes/:qid", deleteQuiz);
}