require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Chưa đăng nhập' });
  }
}

// ===== USERS =====
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'Thiếu thông tin' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const [r] = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );
    res.json({ id: r.insertId, username });
  } catch (e) {
    res.status(400).json({ message: 'Username hoặc email đã tồn tại' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  const u = rows[0];
  if (!u || !(await bcrypt.compare(password, u.password_hash)))
    return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
  const token = jwt.sign(
    { id: u.id, username: u.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ token, user: { id: u.id, username: u.username } });
});

// ===== FAVORITES =====
app.get('/api/favorites', auth, async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM favorites WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id]
  );
  res.json(rows);
});

app.post('/api/favorites', auth, async (req, res) => {
  const { movie_id, title, poster_path, release_date } = req.body;
  await db.query(
    'INSERT IGNORE INTO favorites (user_id, movie_id, title, poster_path, release_date) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, movie_id, title, poster_path, release_date || null]
  );
  res.json({ ok: true });
});

app.delete('/api/favorites/:movieId', auth, async (req, res) => {
  await db.query('DELETE FROM favorites WHERE user_id = ? AND movie_id = ?', [
    req.user.id,
    req.params.movieId,
  ]);
  res.json({ ok: true });
});

// ===== COMMENTS =====
app.get('/api/comments/:movieId', async (req, res) => {
  const [rows] = await db.query(
    `SELECT c.id, c.user_id, c.content, c.created_at, u.username
     FROM comments c JOIN users u ON u.id = c.user_id
     WHERE c.movie_id = ? ORDER BY c.created_at DESC`,
    [req.params.movieId]
  );
  res.json(rows);
});

app.post('/api/comments', auth, async (req, res) => {
  const { movie_id, content } = req.body;
  if (!content) return res.status(400).json({ message: 'Nội dung trống' });
  const [r] = await db.query(
    'INSERT INTO comments (user_id, movie_id, content) VALUES (?, ?, ?)',
    [req.user.id, movie_id, content]
  );
  res.json({ id: r.insertId });
});

app.put('/api/comments/:id', auth, async (req, res) => {
  await db.query('UPDATE comments SET content = ? WHERE id = ? AND user_id = ?', [
    req.body.content,
    req.params.id,
    req.user.id,
  ]);
  res.json({ ok: true });
});

app.delete('/api/comments/:id', auth, async (req, res) => {
  await db.query('DELETE FROM comments WHERE id = ? AND user_id = ?', [
    req.params.id,
    req.user.id,
  ]);
  res.json({ ok: true });
});

app.listen(process.env.PORT, () =>
  console.log(`API chạy tại http://localhost:${process.env.PORT}`)
);