import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Get prediction result from localStorage (will be replaced with API call)
    const assessmentData = localStorage.getItem('assessmentData');
    
    if (!assessmentData) {
      navigate('/assessment');
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // Mock prediction result (will be replaced with actual ML prediction)
      const mockPrediction = {
        risk: 'Low',
        confidence: 85,
        recommendations: [
          'Maintain a healthy diet rich in fruits and vegetables',
          'Engage in regular physical activity (at least 150 minutes per week)',
          'Monitor your blood pressure regularly',
          'Maintain a healthy weight',
          'Limit alcohol consumption',
          'Avoid smoking and tobacco products'
        ],
        precautions: [
          'Schedule regular check-ups with your healthcare provider',
          'Keep track of your cholesterol levels',
          'Manage stress through relaxation techniques',
          'Get adequate sleep (7-9 hours per night)',
          'Stay hydrated throughout the day'
        ],
        lifestyle: [
          'Follow a heart-healthy diet (Mediterranean or DASH diet)',
          'Reduce sodium intake to less than 2,300mg per day',
          'Include omega-3 fatty acids in your diet',
          'Practice mindfulness or meditation',
          'Build a support network of family and friends'
        ]
      };

      setPrediction(mockPrediction);
      setLoading(false);
    }, 2000);
  }, [navigate]);

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return 'text-green-600';
      case 'moderate':
        return 'text-yellow-600';
      case 'high':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getRiskBgColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 border-green-300';
      case 'moderate':
        return 'bg-yellow-100 border-yellow-300';
      case 'high':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const handleNewAssessment = () => {
    localStorage.removeItem('assessmentData');
    navigate('/assessment');
  };

  const handleBackHome = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mb-4"></div>
          <p className="text-xl text-gray-700">Analyzing your health data...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Results</h1>
          <p className="text-gray-600">Based on the information you provided</p>
        </div>

        {/* Risk Assessment Card */}
        <div className={`${getRiskBgColor(prediction?.risk)} border-2 rounded-xl p-8 mb-6 shadow-lg`}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Risk Level</h2>
            <div className={`text-6xl font-bold ${getRiskColor(prediction?.risk)} mb-4`}>
              {prediction?.risk}
            </div>
            <p className="text-gray-700 text-lg mb-6">
              Confidence Score: <span className="font-bold">{prediction?.confidence}%</span>
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  prediction?.risk?.toLowerCase() === 'low'
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : prediction?.risk?.toLowerCase() === 'moderate'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                    : 'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ width: `${prediction?.confidence}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">Model Confidence Level</p>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recommendations
          </h3>
          <ul className="space-y-3">
            {prediction?.recommendations?.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Precautions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Precautions
          </h3>
          <ul className="space-y-3">
            {prediction?.precautions?.map((prec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-600 mr-2 mt-1">⚠</span>
                <span className="text-gray-700">{prec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lifestyle Tips Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Lifestyle Tips
          </h3>
          <ul className="space-y-3">
            {prediction?.lifestyle?.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">♥</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Important Medical Disclaimer
          </h3>
          <p className="text-red-700 mb-3">
            This prediction is generated by a machine learning algorithm and is for informational purposes only. 
            It should NOT be considered as a medical diagnosis or substitute for professional medical advice.
          </p>
          <p className="text-red-700 font-semibold">
            ⚕️ Please consult with a qualified healthcare provider or your local doctor for proper medical evaluation and treatment.
          </p>
        </div>

        {/* Emergency Contact Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-blue-800 mb-3">Emergency Contact</h3>
          <p className="text-blue-700">
            If you are experiencing chest pain, shortness of breath, or other severe symptoms, 
            call emergency services (108/102 in India or your local emergency number) immediately.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleNewAssessment}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold 
                     hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg"
          >
            Take New Assessment
          </button>
          <button
            onClick={handleBackHome}
            className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold 
                     hover:bg-gray-50 transform hover:scale-105 transition-all shadow-lg"
          >
            Back to Home
          </button>
        </div>

        {/* Download/Print Options */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-3">Save your results for reference</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              🖨️ Print Results
            </button>
            <button
              onClick={() => {
                const dataStr = JSON.stringify(prediction, null, 2);
                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                const exportFileDefaultName = 'heart-health-results.json';
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
              }}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              💾 Download Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
