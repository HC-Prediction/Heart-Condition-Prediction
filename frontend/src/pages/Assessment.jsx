import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Assessment() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    chestPainType: '',
    bloodPressure: '',
    cholesterol: '',
    fastingBloodSugar: '',
    restingECG: '',
    maxHeartRate: '',
    exerciseAngina: '',
    stDepression: '',
    stSlope: '',
    majorVessels: '',
    thallium: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Store form data and navigate to results
    localStorage.setItem('assessmentData', JSON.stringify(formData))
    navigate('/results')
  }

  const handleBack = () => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800 mb-4 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Health Assessment</h1>
        <p className="text-gray-600">Please fill in all the fields accurately for the best prediction results</p>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="card">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                max="120"
                className="input-field"
                placeholder="e.g., 45"
              />
              <p className="text-xs text-gray-500 mt-1">Your current age in years</p>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select your gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>

            {/* Chest Pain Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Chest Pain <span className="text-red-500">*</span>
              </label>
              <select
                name="chestPainType"
                value={formData.chestPainType}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select type</option>
                <option value="1">Typical Angina (pressure/fullness during activity)</option>
                <option value="2">Atypical Angina (mild discomfort)</option>
                <option value="3">Non-Anginal Pain (not related to heart)</option>
                <option value="4">Asymptomatic (no chest pain)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Type of chest discomfort you experience</p>
            </div>

            {/* Blood Pressure */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resting Blood Pressure <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                required
                min="80"
                max="200"
                className="input-field"
                placeholder="e.g., 120"
              />
              <p className="text-xs text-gray-500 mt-1">Systolic BP in mm Hg (normal: 90-120)</p>
            </div>

            {/* Cholesterol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cholesterol Level <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="cholesterol"
                value={formData.cholesterol}
                onChange={handleChange}
                required
                min="100"
                max="600"
                className="input-field"
                placeholder="e.g., 200"
              />
              <p className="text-xs text-gray-500 mt-1">Serum cholesterol in mg/dl (normal: below 200)</p>
            </div>

            {/* Fasting Blood Sugar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fasting Blood Sugar Level <span className="text-red-500">*</span>
              </label>
              <select
                name="fastingBloodSugar"
                value={formData.fastingBloodSugar}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select range</option>
                <option value="0">Less than 120 mg/dl (Normal)</option>
                <option value="1">Greater than 120 mg/dl (High)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Blood sugar after fasting for 8+ hours</p>
            </div>

            {/* Resting ECG */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resting ECG Results <span className="text-red-500">*</span>
              </label>
              <select
                name="restingECG"
                value={formData.restingECG}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select result</option>
                <option value="0">Normal</option>
                <option value="1">ST-T Wave Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Result from your ECG test at rest</p>
            </div>

            {/* Max Heart Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Heart Rate Achieved <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="maxHeartRate"
                value={formData.maxHeartRate}
                onChange={handleChange}
                required
                min="60"
                max="220"
                className="input-field"
                placeholder="e.g., 150"
              />
              <p className="text-xs text-gray-500 mt-1">Highest heart rate during exercise (normal: 140-180)</p>
            </div>

            {/* Exercise Angina */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise-Induced Chest Pain <span className="text-red-500">*</span>
              </label>
              <select
                name="exerciseAngina"
                value={formData.exerciseAngina}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select option</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Do you experience chest pain during exercise?</p>
            </div>

            {/* ST Depression */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ST Depression <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stDepression"
                value={formData.stDepression}
                onChange={handleChange}
                required
                min="0"
                max="10"
                step="0.1"
                className="input-field"
                placeholder="e.g., 1.5"
              />
              <p className="text-xs text-gray-500 mt-1">ST depression induced by exercise (from ECG, usually 0-6)</p>
            </div>

            {/* ST Slope */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slope of Peak Exercise ST Segment <span className="text-red-500">*</span>
              </label>
              <select
                name="stSlope"
                value={formData.stSlope}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select slope</option>
                <option value="1">Upsloping</option>
                <option value="2">Flat</option>
                <option value="3">Downsloping</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Pattern observed on stress test ECG</p>
            </div>

            {/* Major Vessels */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Major Vessels <span className="text-red-500">*</span>
              </label>
              <select
                name="majorVessels"
                value={formData.majorVessels}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select number</option>
                <option value="0">0 vessels</option>
                <option value="1">1 vessel</option>
                <option value="2">2 vessels</option>
                <option value="3">3 vessels</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Major coronary arteries colored by fluoroscopy</p>
            </div>

            {/* Thallium */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stress Test Result (Thallium) <span className="text-red-500">*</span>
              </label>
              <select
                name="thallium"
                value={formData.thallium}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select result</option>
                <option value="3">Normal</option>
                <option value="6">Fixed Defect</option>
                <option value="7">Reversible Defect</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Result from nuclear stress test imaging</p>
            </div>

          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> Please consult with your healthcare provider to obtain accurate values for medical parameters like ECG results, stress test results, etc. 
                If you don't have recent test results, this tool may not provide accurate predictions.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Get Prediction →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Assessment
