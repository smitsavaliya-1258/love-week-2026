---

# 💖 Love Week 2026 — Divya ❤️ Smit

A private Valentine Week experience built as a time-locked interactive website.

From **7th February to 14th February**, one chapter unlocks each day.
No rushing. No skipping ahead. Just a slow build through memories, promises, and moments.

---

## 🌸 Concept

This project is designed as:

* 📅 **Date-locked daily chapters** (7 Feb → 14 Feb)
* 🔒 Cards unlock only on the correct day (Asia/Kolkata time)
* 🎮 Light interaction (no annoying games)
* 💌 Minimal, aesthetic, calm UI
* ❤️ Personal messages inside each day

Each card represents a day in Valentine Week:

| Date   | Day             | Interaction Type    |
| ------ | --------------- | ------------------- |
| 7 Feb  | Rose Day        | Secret Unlock       |
| 8 Feb  | Propose Day     | Choice Interaction  |
| 9 Feb  | Chocolate Day   | Slider Response     |
| 10 Feb | Teddy Day       | Private Letter      |
| 11 Feb | Promise Day     | Commitment Check    |
| 12 Feb | Hug Day         | Memory Reveal       |
| 13 Feb | Kiss Day        | Reflective Question |
| 14 Feb | Valentine’s Day | Final Reveal        |

---

## 🛠 Tech Stack

* HTML
* CSS (Glassmorphism UI)
* Vanilla JavaScript
* LocalStorage (for daily progression)
* GitHub Pages (Hosting)

No backend. No frameworks. Clean and lightweight.

---

## 🔐 Unlock Logic

* Date comparison uses **Asia/Kolkata timezone**
* Cards unlock only if:

  * The current date matches or exceeds unlock date
  * The previous day has been completed
* Completion status is stored in `localStorage`

---

## 🚀 Deployment

Hosted using **GitHub Pages**

Live site:

```
https://smitsavaliya-1258.github.io/love-week-2026/
```

To deploy:

1. Go to Repo → Settings
2. Open Pages
3. Set Source to `main` branch
4. Root folder `/`
5. Save

---

## 🧪 Testing

To test unlock behavior:

* Temporarily change system date
* Or modify dates in `week.js`
* Clear localStorage if needed

Reset progress using browser console:

```js
Object.keys(localStorage).forEach(k => {
  if (k.startsWith("done_")) localStorage.removeItem(k);
});
location.reload();
```

---

## 💡 Design Philosophy

* Simple > Loud
* Intentional > Flashy
* Emotional > Over-engineered
* Controlled interactions (no irritation)

This is not meant to be a game.
It’s meant to feel personal.

---

## ❤️ Personal Note

Built by **Smit**
For **Divya**

One chapter per day.
One choice, every day.

---
