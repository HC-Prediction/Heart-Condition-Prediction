# Heart Condition Prediction System

A full-stack web application for predicting heart disease risk using machine learning algorithms.

## 🚀 Technology Stack

### Frontend
- **React.js** - UI library
- **TailwindCSS** - Styling framework
- **React Router** - Navigation
- **Vite** - Build tool

### Backend (To be implemented)
- **Python** - Backend language
- **Flask/FastAPI** - Web framework
- **Scikit-learn** - Machine Learning library
- **Pandas/NumPy** - Data processing

### ML Algorithm
- Random Forest / Decision Tree / Naive Bayes

## 📋 Features

- ✅ Modern, responsive UI design
- ✅ User authentication (Login/Register)
- ✅ Comprehensive health assessment form with 13 parameters
- ✅ User-friendly medical parameter descriptions
- ✅ Real-time prediction results
- ✅ Confidence score display
- ✅ Personalized health recommendations
- ✅ Precautions and to-do lists
- ✅ Medical disclaimer and emergency guidance

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Python 3.8+ (for backend)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5174`

### Backend Setup (Coming Soon)

The backend will be implemented with Python and will include:
- RESTful API endpoints
- Machine Learning model training
- Model deployment and inference
- Database integration

## 📊 Assessment Parameters

The system collects the following health parameters:

1. **Age** - Current age in years
2. **Gender** - Male/Female
3. **Chest Pain Type** - 4 types (Typical Angina, Atypical Angina, Non-Anginal, Asymptomatic)
4. **Resting Blood Pressure** - Systolic BP in mm Hg
5. **Cholesterol Level** - Serum cholesterol in mg/dl
6. **Fasting Blood Sugar** - Above/Below 120 mg/dl
7. **Resting ECG Results** - Normal, ST-T Abnormality, LV Hypertrophy
8. **Maximum Heart Rate** - Achieved during exercise
9. **Exercise-Induced Angina** - Yes/No
10. **ST Depression** - Value from exercise ECG
11. **ST Slope** - Upsloping, Flat, Downsloping
12. **Major Vessels** - Count (0-3) from fluoroscopy
13. **Thallium Stress Test** - Normal, Fixed Defect, Reversible Defect

## 🎨 User Flow

1. **Landing Page** → Introduction and features
2. **Login/Register** → User authentication
3. **Home Dashboard** → Welcome screen with info
4. **Assessment Form** → Input health parameters
5. **Results Page** → Prediction with recommendations

## 📱 Screenshots

### Landing Page
- Beautiful gradient design
- Feature highlights
- Call-to-action buttons
- Medical disclaimer

### Assessment Form
- User-friendly input fields
- Helpful descriptions for each parameter
- Validation and tooltips
- Progress tracking

### Results Page
- Clear prediction display
- Confidence score visualization
- Detailed recommendations
- Emergency contact information

## ⚠️ Important Notes

- This tool is for **educational and informational purposes only**
- **NOT a substitute for professional medical advice**
- Always consult with a qualified healthcare provider
- Keep emergency services contact readily available

## 🔮 Next Steps

- [ ] Implement Python backend with Flask/FastAPI
- [ ] Train ML model using the provided dataset
- [ ] Create API endpoints for prediction
- [ ] Add user authentication with JWT
- [ ] Implement database (MongoDB/PostgreSQL)
- [ ] Add assessment history tracking
- [ ] Deploy to production (Frontend: Vercel/Netlify, Backend: Heroku/Railway)
- [ ] Add email notifications
- [ ] Generate PDF reports

## 👨‍💻 Development

### Project Structure
```
frontend/
├── public/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Assessment.jsx
│   │   └── Results.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🤝 Contributing

This is a student project for Trending Technology Lab. Feel free to suggest improvements!

## 📄 License

This project is for educational purposes.

## 📧 Contact

For questions or suggestions, please reach out through your course instructor.

---

**Made with ❤️ for Trending Technology Lab**
