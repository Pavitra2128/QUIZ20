import db from '../../app/Server/db';

export default function handler(req, res) {
  const { topicid } = req.query;

  if (!topicid) {
    res.status(400).json({ error: 'Topic ID is required' });
    return;
  }

  const query = 'SELECT id, topicid, question, option1, option2, option3, option4, correctOption FROM questions WHERE topicid = ?';
  db.query(query, [topicid], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      console.log(err);
    } else {
      res.status(200).json(results);
    }
  });
}
