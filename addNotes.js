/****
Remember to do a .toLowerCase for all tags!
****/

const form = document.getElementById("noteForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    title: form.title.value,
    content: form.content.value,
    category: form.category.value,
    tags: form.tags.value.split(",").map((t) => t.trim().toLowerCase()),
  };
});

await fetch("http://localhost:3500/api/notes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

form.reset();
