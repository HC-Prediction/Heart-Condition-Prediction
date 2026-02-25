# Backend Setup Guide

## Python Backend for Heart Condition Prediction

### Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

3. Install required packages:
```bash
pip install flask flask-cors pandas numpy scikit-learn joblib
```

### Required Files

- `app.py` - Main Flask application
- `model.py` - ML model training script
- `predict.py` - Prediction logic
- `requirements.txt` - Python dependencies

### Dataset

The dataset (Heart_Disease_Prediction.csv) should be placed in the `data/` directory.

### API Endpoints

#### POST /api/predict
- Input: Health assessment parameters (JSON)
- Output: Prediction result with confidence score

Example request:
```json
{
  "age": 45,
  "gender": 1,
  "chest_pain_type": 2,
  "blood_pressure": 120,
  "cholesterol": 200,
  "fasting_blood_sugar": 0,
  "resting_ecg": 0,
  "max_heart_rate": 150,
  "exercise_angina": 0,
  "st_depression": 1.5,
  "st_slope": 2,
  "major_vessels": 0,
  "thallium": 3
}
```

Example response:
```json
{
  "prediction": "Absence",
  "confidence": 85.5,
  "risk_level": "Low"
}
```

### Next Steps

1. Train the ML model using the dataset
2. Save the trained model using joblib
3. Create Flask API endpoints
4. Test the API with sample data
5. Connect frontend to backend

## Coming Soon!

The full backend implementation will be added in the next phase.
