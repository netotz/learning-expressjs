import { deleteCharacterById, deleteCharacters, getCharacterById, getCharacters, putCharacters } from './database/methods';
import express from 'express';
import { Character } from './models/Character';

const app = express();
app.use(express.json());

app.get('/characters', async (request, response) => {
    const characters = await getCharacters();
    console.log(characters?.length);

    return response.json(characters);
});

app.get('/characters/:id', async (request, response) => {
    const id = request.params.id;
    const character = await getCharacterById(id);
    
    return character == null ? response.sendStatus(404) : response.json(character);
});

app.delete('/characters/:id', async (request, response) => {
    const id = request.params.id;
    const result = await deleteCharacterById(id);
    
    return response.sendStatus(result || 500);
});

app.delete('/characters', async (request, response) => {
    const characters = request.body as string[];
    const result = await deleteCharacters(characters);

    
    return response.sendStatus(result || 500);
});

app.put('/characters', async (request, response) => {
    const characters = request.body as Character[];
    const result = await putCharacters(characters);
    
    return response.sendStatus(result || 500);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});