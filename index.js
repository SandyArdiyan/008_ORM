const express = require('express');
const app = express();
const db = require('./models');
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.listen(PORT, () => {
  console.log('server started on port 3000');
})

db.sequelize.sync()
.then(() => {
  app.listen(3000, () => {
    console.log('Server started');
  });
})

.catch((err) => {
  console.log(err);
});

app.post('/Komiks', async (req, res) => {
  const data = req.body;
  try {
    const Komik = await db.Komik.create(data);
    res.send(Komik);
  } catch (err) {
    res.send(err);
  }
});

app.get('/Komiks', async (req, res) => {
  try {
    const Komiks = await db.Komik.findAll();
    res.send(Komiks);
  } catch (err) {
    res.send(err);
  }
});

app.get('/Komiks', async (req, res) => {
  try {
    const Komiks = await db.Komik.findAll();
    res.send(Komiks);
  } catch (err) {
    res.send(err);
  }
});

app.put('/Komiks/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body; 

  try {
    const Komik = await db.Komik.findByPk(id);

    if (!Komik) {
      return res.status(404).send({ message: 'Komik tidak di temukan' });
    }
    await Komik.update(data);

    res.send(Komik);

  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/Komiks/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const Komik = await db.Komik.findByPk(id);
    if (!Komik) {
      return res.status(404).send({ message: 'Komik tidak di temukan' });
    }

    await Komik.destroy();
    res.send({ message: 'Komik berhasil di hapus' });
  } catch (err) {
    res.status(500).send(err);
  }
});

  