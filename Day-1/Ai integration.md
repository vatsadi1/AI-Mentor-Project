# 📅 Day 1 – AI Integration (Flow & Logic)

## 🎯 Goal of Day 1

```text
Take user input → send to backend → generate roadmap using AI → return response
```

---

## 🔄 End-to-End Flow

```text
User → Frontend Form → API Request → Backend → AI Agent → Groq API → Response → Frontend
```

---

## 🧩 Step-by-Step Logical Flow

### 1. User Interaction

```text
User fills roadmap form:
- role
- tech stack
- level
- time commitment
- goal
```

---

### 2. Frontend → Backend

```text
Frontend sends POST request:
→ /api/roadmap/generate
→ with user input data
```

---

### 3. Route Handling

```text
Backend receives request
→ matches route (/generate)
→ forwards to controller
```

---

### 4. Controller Logic

```text
Controller:
- receives request data
- validates input
- cleans data (trim, normalize)
- prepares structured object
```

---

### 5. AI Agent (Core Brain)

```text
Agent receives cleaned data
→ builds dynamic prompt
→ combines:
   role + tech stack + goals + constraints
```

---

### 6. AI Call (Groq)

```text
Agent sends HTTP request to Groq API
→ model processes prompt
→ generates roadmap
```

---

### 7. Response Handling

```text
AI response received
→ agent extracts useful content
→ returns to controller
```

---

### 8. Backend → Frontend

```text
Controller sends JSON response:
→ success + roadmap
```

---

### 9. Frontend Display

```text
Frontend receives response
→ updates UI
→ shows roadmap to user
```

---

## 🧠 Core Logic Summary

```text
Input → Processing → AI → Output
```

---

## ⚙️ Architecture Understanding

```text
Frontend → Controller → AI Agent → External API → Response
```

---

## 🔥 Key Decisions Taken

* Used **Groq instead of Gemini** for stability
* Used **direct API calls (no SDK)**
* Created **AI Agent layer for separation**
* Focused on **clean data flow**

---

## 🚧 Problems Solved

* API model mismatch issues
* SDK version conflicts
* Network errors (timeouts, ECONNRESET)
* Invalid API keys
* Hanging requests

---

## 🧠 What I Learned

```text
AI is just an external API.
The real skill is handling:
- request flow
- data transformation
- system architecture
```

---

## 🚀 Day 1 Outcome

```text
✔ AI integration complete
✔ Backend pipeline working
✔ Real roadmap generation functional
✔ System architecture established
```

---

## ⏭️ Next (Day 2)

```text
- Save roadmap in database
- Create GET API
- Avoid repeated AI calls
```

---
