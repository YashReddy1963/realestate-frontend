# Mini Real Estate Analysis Chatbot

A lightweight **AI-powered real estate analysis dashboard + chatbot**, built as part of an internship assignment.  
This application allows users to ask natural language questions about a real-estate dataset and receive:

- Dynamic Charts (Line, Bar, Multi-Line)
- Summaries & Insights
- Downloadable CSV/Excel reports
- Location-wise trends (price, sales, supply)
- NLP-based query detection

Both frontend and backend are deployed and fully functional.

Have a look - https://yashreddy1963.github.io/realestate-frontend/
---

## 🚀 Live Demo  

### **Frontend**  
https://yashreddy1963.github.io/realestate-frontend/

### **Backend API**  
https://realestate-backend-5hg5.onrender.com/api/query/

---

## Features  

### 🔹 Natural Language Query Chatbot  
Ask questions like:
- "Summarize property demand in Wakad"
- “Compare rent trends for Aundh and Akurdi”

The backend detects query intent and returns charts + summaries.

---

### 🔹 Interactive Charts  
Powered by **Recharts**, the dashboard supports:
- Line Charts  
- Multi-Line Charts  

Charts are dynamically generated based on the user’s question.

---

### 🔹 Data Export  
Users can download:
- Full dataset  
- Query-filtered results  
- Chart data  

Supported formats:
- Currently - **CSV**

---

## Tech Stack  

### **Frontend**
- React (Vite)
- TypeScript
- TailwindCSS
- ShadCN UI
- Recharts
- React Router
- TanStack Query
- gh-pages deployment

### **Backend**
- Django
- Django REST Framework
- Pandas
- NumPy
- OpenPyXL
- Render deployment (Gunicorn)

### **Data Handling**
- Excel sheet (`Sample_data.xlsx`) parsed via Pandas  
- In-memory DataFrame processing for fast queries

---

## How It Works  

1. User enters a question  
2. Frontend sends query → `/api/query/`  
3. Backend:
   - Determines query intent  
   - Filters DataFrame  
   - Prepares chart data  
   - Generates summary  
4. Frontend renders:
   - Chart (Recharts)
   - Summary text
   - Download buttons  

---

