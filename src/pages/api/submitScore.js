import db from '../../app/Server/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { studentid, studentname, courseid, moduleid, topicid, score } = req.body;

    const query = 'INSERT INTO performance (studentid, studentname, courseid, moduleid, topicid, score) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [studentid, studentname, courseid, moduleid, topicid, score];

    db.query(query, values, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        console.log(err);
      } else {
        res.status(200).json({ message: 'Performance data saved successfully', results });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
