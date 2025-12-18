# Database Implementation Guide

## In-Memory vs SQLite - Quick Comparison

### In-Memory (Array)

    import { notes } from "../data/data.js";
    const allNotes = notes;  // Direct access

**Pros:**

- Simple and fast
- No async/await needed

**Cons:**

- Data disappears when server restarts
- Can't save new/updated notes permanently

### SQLite (Database)

    import { getDb } from "../database/connection.js";
    const db = await getDb();
    const allNotes = await db.all("SELECT * FROM notes");

**Pros:**

- Data persists across restarts
- Real database practice
- Auto-generated IDs

**Cons:**

- Requires async/await
- Slightly more setup

## Key Differences

| Feature               | In-Memory    | SQLite           |
| --------------------- | ------------ | ---------------- |
| Data survives restart | ❌ No        | ✅ Yes           |
| Code complexity       | Simple       | Slightly more    |
| Real-world usage      | Testing only | Production ready |

## Example: What Happens When Server Restarts

**Scenario:** User creates a note "Buy groceries", then server restarts.

- **In-Memory:** Note is gone ❌
- **SQLite:** Note still exists ✅

## Setup (Already Done)

1. ✅ createNotesTable.js - Creates the notes table
2. ✅ seedData.js - Adds initial test data
3. ✅ database.db - The actual database file

## Using SQLite in Controllers

**Before (In-Memory):**

    export const getAllData = (req, res) => {
      let data = notes;
      res.json(data);
    }

**After (SQLite):**

    export const getAllData = async (req, res) => {
      const db = await getDb();
      let data = await db.all("SELECT * FROM notes");
      res.json(data);
    }

**Changes:**

1. Add `async` to function
2. Get database connection with `await getDb()`
3. Use SQL queries with `await`

## Data Format Notes

SQLite stores some fields differently:

- `tags`: Stored as JSON string → use `JSON.parse(row.tags)` when reading
- `updatedAt`: Stored as Unix timestamp → convert to Date when needed

## Quick Start

    # Create table
    node database/createNotesTable.js

    # Add test data (only runs once)
    node database/seedData.js

## Recommendation

Since the database is already set up, go ahead and use it. It's only slightly more work than in-memory, but gives you real persistence and better practice for real-world apps.
