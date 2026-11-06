// routes/routes.js
const { ObjectId } = require('mongodb');

module.exports = function(app, db) {
    app.post('/notes/add', async (req, res) => {
        try {
            const note = {
                text: req.body.body,
                title: req.body.title
            };
            const result = await db.collection('notes').insertOne(note);
             console.log('Inserted note with id:', result.insertedId); 
            
            res.send({ note });
        } catch (err) {
            console.error('An error has occurred', err);
            res.status(500).send({ error: 'An error has occurred', details: err.message });
        }
    });

     app.get('/notes/all', async (req, res) => {
        try {
            const result = await db.collection('notes').find({}).toArray();
            res.send(result);
        } catch (err) {
            console.error('An error has occurred', err);
            res.status(500).send({ error: 'An error has occurred', details: err.message });
        }
    });

    // МАРШРУТ UPDATE (изменение заметки по ID)
    app.put('/notes/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const updatedNote = {
                text: req.body.body,
                title: req.body.title
            };
           
            const result = await db.collection('notes').updateOne(
                { _id: new ObjectId(id) }, 
                { $set: updatedNote }
            );
            
            if (result.matchedCount === 0) {
                return res.status(404).send({ error: 'Заметка не найдена' });
            }
            res.send({ message: 'Заметка успешно обновлена' });
        } catch (err) {
            console.error('Ошибка при обновлении:', err);
            res.status(500).send({ error: 'Произошла ошибка', details: err.message });
        }
    });

    // МАРШРУТ DELETE (удаление заметки по ID)
    app.delete('/notes/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const result = await db.collection('notes').deleteOne({ _id: new ObjectId(id) });
            
            if (result.deletedCount === 0) {
                return res.status(404).send({ error: 'Заметка не найдена' });
            }
            res.send({ message: 'Заметка успешно удалена' });
        } catch (err) {
            console.error('Ошибка при удалении:', err);
            res.status(500).send({ error: 'Произошла ошибка', details: err.message });
        }
    });


};