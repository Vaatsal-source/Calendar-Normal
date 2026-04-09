# 🌌 Cosmic Calendar Planner

A visually immersive and interactive calendar application built with **Next.js**, **Tailwind CSS**, and **Framer Motion**. This project combines functionality with aesthetics, offering users a seamless way to plan their schedules while enjoying a dynamic cosmic-themed UI.

---

## 🚀 Overview

Cosmic Calendar Planner is a modern web application designed to enhance productivity through an engaging user experience. It allows users to:

* Select date ranges
* Add notes for specific date ranges
* Mark custom holidays
* Navigate across months with smooth animations
* Experience a visually rich cosmic background that changes dynamically

This project emphasizes **UI/UX design**, **state management**, and **interactive animations**.

---

## ✨ Features

### 📅 Interactive Calendar

* Click to select start and end dates
* Supports range selection with visual highlighting
* Intelligent reset logic for re-selection

### 📝 Notes System

* Add notes tied to selected date ranges
* Automatically saved using **localStorage**
* Visual indicators for days with notes

### 🎉 Custom Holidays

* Double-click any date to mark it as a holiday
* Assign custom names to special days
* Persisted locally in browser storage

### 🌠 Dynamic Cosmic Background

* Background changes based on the current month
* High-resolution space imagery
* Smooth transitions using Next.js Image optimization

### 🎨 Rich UI/UX

* Glassmorphism-based card design
* Smooth animations powered by Framer Motion
* Cursor-based glow effect
* Responsive design for different screen sizes

### ⚡ Performance Optimizations

* Dynamic imports to prevent SSR issues
* Memoization for efficient background rendering
* Optimized state updates and re-renders

---

## 🛠️ Tech Stack

* **Frontend Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Image Optimization:** Next.js Image Component
* **State Management:** React Hooks
* **Persistence:** localStorage

---

## 📂 Project Structure

```
.
├── page.js               # Main calendar component
├── CosmicBackground.js  # Dynamic background renderer
├── images.js            # Monthly hero images
```

---

## ⚙️ How It Works

### 1. Date Selection Logic

* First click → Start date
* Second click → End date
* Clicking again resets intelligently

### 2. Notes Mapping

* Notes are stored using a unique key:

  ```
  year-month-startDate-endDate
  ```
* This allows efficient retrieval and updates

### 3. Holiday System

* Each day is mapped to a key:

  ```
  year-month-day
  ```
* Stored and retrieved via localStorage

### 4. Animations

* Month transitions use directional slide animations
* Hover interactions enhance responsiveness
* Micro-interactions improve usability

---

## 🧠 Key Engineering Highlights

* **Dynamic Rendering Control:** Avoided SSR issues using `next/dynamic`
* **Efficient State Syncing:** Used multiple `useEffect` hooks for syncing localStorage
* **UI Feedback Systems:** Visual cues for today, selected ranges, notes, and holidays
* **Reusable Logic:** Modular functions for date calculations

---

## 📸 UI Highlights

* Cosmic animated background
* Smooth month transitions
* Interactive hover effects
* Minimal yet futuristic design

---

## 🧪 Possible Improvements

* Backend integration for cloud sync
* User authentication
* Drag-to-select date ranges
* Mobile gesture enhancements
* Export calendar data (PDF/CSV)

---

## 🏁 Getting Started

### 1. Clone the Repository

```
git clone <your-repo-url>
cd cosmic-calendar
```

### 2. Install Dependencies

```
npm install
```

### 3. Run the Development Server

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Why This Project?

This project demonstrates:

* Strong understanding of **React state management**
* Ability to design **interactive UI systems**
* Skill in **performance optimization**
* Focus on **user experience and visual design**

It reflects a balance between **engineering discipline** and **creative frontend development**.

---

## 📬 Contact

Feel free to reach out for collaborations or opportunities.

---

## ⭐ Final Note

This project was built with a focus on creating something both **useful** and **visually delightful**. It showcases how thoughtful design and solid engineering can come together to create impactful user experiences.

---

**Made with 🚀 using Next.js & creativity**
