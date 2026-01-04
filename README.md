# Note API

A RESTful API for managing notes with authentication, built with Express.js and SQLite.

---

## Features

- Create, read, update, and delete notes
- Filter and search notes by category, tags, title, and content
- Sort notes by date (newest/oldest)
- JWT-based authentication with access and refresh tokens
- Session management

---

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

### Create the notes table

```bash
node database/createNotesTable.js
```

### Create the users table

```bash
node database/createUserTable.js
```

### Seed initial data (optional)

```bash
node database/seedData.js
```

## Environment Variables

Create a .env file in the root directory with the following variables:

JWT_ACCESS_SECRET=your-access-token-secret-here

JWT_REFRESH_SECRET=your-refresh-token-secret-here

Important: Use strong, random strings for your secrets. Never commit the .env file to version control.

## Running the Application

Development mode (with auto-restart):
npm run dev

Production mode:
npm start

The server will start on port 3500 by default.

## API Endpoints

### Authentication Endpoints

All authenication endpoint have the prefix /v1/auth

LOGIN / POST
/login

**Headers**

- `Content-Type: application/json`

**Request Body**

```json
{
  "username": "testuser",
  "password": "password123"
}
```

REFRESH TOKEN / GET
/refresh

**Headers**

- `X-RefreshToken: <refresh_token>`

VALIDATE TOKEN / GET
/validate

**Headers**

- `Authorization: Bearer <access_token>`

LOGOUT / POST
/logout

**Headers**

- `Authorization: Bearer <access_token>`
- `X-RefreshToken: <refresh_token>`

### Notes Endpoints

All notes-endpoint have the prefix /api

ALL NOTES / GET
/

NOTEs BY QUERY / GET
?{filter}={query}
Possible filters: title, content, category and tags

NOTES BY CATEGORY / GET
/:field/:term
Possible field (as of right now): category

CREATE NOTE / POST
/notes

**Headers** -`Authorization: Bearer <access_token>`

**Body**

```json
{
  "title": "Note Title",
  "content": "Note content here",
  "category": "programming",
  "tags": ["javascript", "node"]
}
```

UPDATE NOTE / PATCH
/notes/:id

**Headers**

- `Authorization: Bearer <access_token>`

**Body**
Same as create (all fields optional)

DELETE NOTE / DELETE
/notes/:id

**Headers**

-`Authorization: Bearer <access_token>`

SORT NOTES BY DATE / GET
Newest:
/newest

Oldest:
/oldest
