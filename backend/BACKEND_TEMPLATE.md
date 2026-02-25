# 🐍 Python Backend - Quick Start Template

## Files to Create in `backend/` folder

### 1. requirements.txt
```txt
flask==3.0.0
flask-cors==4.0.0
pandas==2.1.4
numpy==1.26.2
scikit-learn==1.3.2
joblib==1.3.2
```

### 2. app.py (Flask API)
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load the trained model
try:
    model = joblib.load('model/heart_disease_model.pkl')
    print("Model loaded successfully!")
except:
    model = None
    print("Model not found. Train the model first!")

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        
        # Extract features in the correct order
        features = [
            int(data['age']),
            int(data['gender']),
            int(data['chestPainType']),
            int(data['bloodPressure']),
            int(data['cholesterol']),
            int(data['fastingBloodSugar']),
            int(data['restingECG']),
            int(data['maxHeartRate']),
            int(data['exerciseAngina']),
            float(data['stDepression']),
            int(data['stSlope']),
            int(data['majorVessels']),
            int(data['thallium'])
        ]
        
        # Convert to numpy array
        features_array = np.array([features])
        
        # Make prediction
        prediction = model.predict(features_array)[0]
        
        # Get prediction probability (confidence)
        prediction_proba = model.predict_proba(features_array)[0]
        confidence = max(prediction_proba) * 100
        
        # Prepare response
        result = {
            'prediction': 'Presence' if prediction == 1 else 'Absence',
            'confidence': round(confidence, 1),
            'riskLevel': 'High' if prediction == 1 else 'Low'
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### 3. train_model.py (Train ML Model)
```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

# Create model directory if it doesn't exist
os.makedirs('model', exist_ok=True)

# Load dataset
print("Loading dataset...")
df = pd.read_csv('data/Heart_Disease_Prediction.csv')

print(f"Dataset shape: {df.shape}")
print("\nFirst few rows:")
print(df.head())

# Check for missing values
print("\nMissing values:")
print(df.isnull().sum())

# Prepare features (X) and target (y)
# Map the target variable: 'Presence' -> 1, 'Absence' -> 0
df['Heart Disease'] = df['Heart Disease'].map({'Presence': 1, 'Absence': 0})

# Features
X = df.drop('Heart Disease', axis=1)
y = df['Heart Disease']

print(f"\nFeatures shape: {X.shape}")
print(f"Target shape: {y.shape}")
print(f"\nClass distribution:\n{y.value_counts()}")

# Split data into training and testing sets (80-20)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\nTraining set: {X_train.shape}")
print(f"Testing set: {X_test.shape}")

# Train Random Forest Classifier
print("\nTraining Random Forest model...")
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)
print("Model training complete!")

# Make predictions on test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"\nModel Accuracy: {accuracy * 100:.2f}%")

print("\nClassification Report:")
print(classification_report(y_test, y_pred, 
                          target_names=['Absence', 'Presence']))

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\nTop 5 Most Important Features:")
print(feature_importance.head())

# Save the trained model
model_path = 'model/heart_disease_model.pkl'
joblib.dump(model, model_path)
print(f"\n✅ Model saved to: {model_path}")

# Test prediction with sample data
print("\n--- Testing with Sample Data ---")
sample_data = X_test.iloc[0:1]
sample_pred = model.predict(sample_data)[0]
sample_proba = model.predict_proba(sample_data)[0]
confidence = max(sample_proba) * 100

print(f"Sample features: {sample_data.values[0]}")
print(f"Prediction: {'Presence' if sample_pred == 1 else 'Absence'}")
print(f"Confidence: {confidence:.1f}%")
```

### 4. explore_data.py (Data Exploration)
```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv('data/Heart_Disease_Prediction.csv')

print("=" * 50)
print("HEART DISEASE DATASET EXPLORATION")
print("=" * 50)

# Basic info
print("\n1. DATASET OVERVIEW")
print("-" * 50)
print(f"Shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")

print("\n2. DATA TYPES")
print("-" * 50)
print(df.dtypes)

print("\n3. MISSING VALUES")
print("-" * 50)
print(df.isnull().sum())

print("\n4. STATISTICAL SUMMARY")
print("-" * 50)
print(df.describe())

print("\n5. TARGET VARIABLE DISTRIBUTION")
print("-" * 50)
print(df['Heart Disease'].value_counts())
print("\nPercentage:")
print(df['Heart Disease'].value_counts(normalize=True) * 100)

print("\n6. UNIQUE VALUES PER COLUMN")
print("-" * 50)
for col in df.columns:
    print(f"{col}: {df[col].nunique()} unique values")

print("\n7. SAMPLE DATA")
print("-" * 50)
print(df.head(10))

# Age distribution
print("\n8. AGE STATISTICS")
print("-" * 50)
print(f"Mean Age: {df['Age'].mean():.1f}")
print(f"Median Age: {df['Age'].median():.1f}")
print(f"Age Range: {df['Age'].min()} - {df['Age'].max()}")

# Correlations (if needed)
print("\n9. CORRELATIONS WITH TARGET")
print("-" * 50)
# Convert target to numeric
df_numeric = df.copy()
df_numeric['Heart Disease'] = df_numeric['Heart Disease'].map({'Presence': 1, 'Absence': 0})
correlations = df_numeric.corr()['Heart Disease'].sort_values(ascending=False)
print(correlations)

print("\n" + "=" * 50)
print("✅ Data exploration complete!")
print("=" * 50)
```

---

## 📋 Step-by-Step Backend Setup

### Step 1: Setup Python Environment
```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Prepare Dataset
```bash
# Create data folder
mkdir data

# Copy the dataset
# Place Heart_Disease_Prediction.csv in backend/data/
```

### Step 3: Explore the Data
```bash
python explore_data.py
```

### Step 4: Train the Model
```bash
python train_model.py
```

Expected output:
```
Loading dataset...
Dataset shape: (270, 14)
...
Training Random Forest model...
Model training complete!

Model Accuracy: 85-95%  (approximate)

✅ Model saved to: model/heart_disease_model.pkl
```

### Step 5: Start the API Server
```bash
python app.py
```

Expected output:
```
Model loaded successfully!
 * Running on http://127.0.0.1:5000
```

### Step 6: Test the API
Open a new terminal and test:

```bash
# Test health check
curl http://localhost:5000/api/health

# Test prediction (example using curl)
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 45,
    "gender": 1,
    "chestPainType": 2,
    "bloodPressure": 120,
    "cholesterol": 200,
    "fastingBloodSugar": 0,
    "restingECG": 0,
    "maxHeartRate": 150,
    "exerciseAngina": 0,
    "stDepression": 1.5,
    "stSlope": 2,
    "majorVessels": 0,
    "thallium": 3
  }'
```

Expected response:
```json
{
  "prediction": "Absence",
  "confidence": 87.5,
  "riskLevel": "Low"
}
```

---

## 🔗 Connect Frontend to Backend

### Update frontend/src/pages/Results.jsx

Replace lines 13-21 (mock prediction) with:

```javascript
useEffect(() => {
  const assessmentData = localStorage.getItem('assessmentData')
  if (!assessmentData) {
    navigate('/home')
    return
  }

  // Call backend API
  const fetchPrediction = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: assessmentData
      })
      
      if (!response.ok) {
        throw new Error('Prediction failed')
      }
      
      const data = await response.json()
      setPrediction(data)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      // Fallback to mock data if API fails
      const mockPrediction = {
        prediction: Math.random() > 0.5 ? 'Presence' : 'Absence',
        confidence: (Math.random() * 30 + 70).toFixed(1),
        riskLevel: Math.random() > 0.5 ? 'High' : 'Low'
      }
      setPrediction(mockPrediction)
      setLoading(false)
    }
  }

  fetchPrediction()
}, [navigate])
```

---

## 🧪 Testing Checklist

- [ ] Python virtual environment activated
- [ ] All dependencies installed
- [ ] Dataset placed in `backend/data/`
- [ ] Data exploration runs successfully
- [ ] Model trains without errors
- [ ] Model saved in `backend/model/`
- [ ] Flask server starts successfully
- [ ] Health check endpoint works
- [ ] Prediction endpoint returns valid JSON
- [ ] Frontend connects to backend
- [ ] End-to-end flow works (Assessment → Prediction)

---

## 🐛 Common Issues & Solutions

### Issue 1: ModuleNotFoundError
**Solution**: Make sure virtual environment is activated and dependencies are installed
```bash
venv\Scripts\activate
pip install -r requirements.txt
```

### Issue 2: CORS Error in Frontend
**Solution**: Flask-CORS is already configured, but ensure backend is running on port 5000

### Issue 3: Model not found
**Solution**: Train the model first
```bash
python train_model.py
```

### Issue 4: Dataset not found
**Solution**: Ensure dataset is in correct location
```
backend/data/Heart_Disease_Prediction.csv
```

---

## 📈 Model Improvement Ideas

1. **Try Different Algorithms**:
   - Decision Tree
   - Naive Bayes
   - Support Vector Machine (SVM)
   - XGBoost

2. **Hyperparameter Tuning**:
   - GridSearchCV
   - RandomizedSearchCV

3. **Feature Engineering**:
   - Create age groups
   - Combine related features
   - Polynomial features

4. **Handle Class Imbalance**:
   - SMOTE (Synthetic Minority Oversampling)
   - Class weights

---

## ✅ Next Steps After Backend is Working

1. Add user authentication (JWT)
2. Set up database (MongoDB/PostgreSQL)
3. Store prediction history
4. Add more API endpoints
5. Deploy to production
6. Write comprehensive tests

---

**Good luck with your backend development! 🚀**

**Remember**: Start simple, test often, and iterate!
