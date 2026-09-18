# Student Notes CRUD Micro-App

A MERN application for creating, viewing, and deleting student notes.

## Candidate details

- Name: Mihir Pradhan
- Student ID: `<ADD_YOUR_STUDENT_ID>`
- GitHub repository: `<ADD_YOUR_GITHUB_REPOSITORY_URL>`

## Requirements

- Node.js and npm
- MongoDB running locally on the default port (`27017`)

## Run the project

1. Start MongoDB locally.
2. Install and start the backend:

   ```bash
   cd server
   npm install
   npm start
   ```

   The API runs at `http://localhost:5000` and connects to
   `mongodb://localhost:27017/notes_db`.

3. In another terminal, install and start the frontend:

   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173` in a browser.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/notes` | Create a note |
| `GET` | `/api/notes` | List notes newest first |
| `DELETE` | `/api/notes/:id` | Delete a note |

## Endpoint smoke tests

Create a note:

```bash
curl -i -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"MERN Lab","content":"Complete the CRUD activity."}'
```

List notes:

```bash
curl -i http://localhost:5000/api/notes
```

Delete a note (replace `<NOTE_ID>` with an `_id` from the list response):

```bash
curl -i -X DELETE http://localhost:5000/api/notes/<NOTE_ID>
```

## Submission screenshots

After running the app, save the required evidence in `screenshots/`:

- `ui-preview.png`: browser view with at least two rendered notes.
- `delete-action.png`: view after deletion with the successful `200 OK` DELETE request visible in the DevTools Network tab.

Do not include `node_modules/` or `dist/` in the submitted ZIP.

