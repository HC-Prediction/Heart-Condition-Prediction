import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'

function Home() {
  const navigate = useNavigate()
  const userName = (() => {
    const name = localStorage.getItem('userName') || localStorage.getItem('userEmail')
    return name?.split('@')[0] || 'User'
  })()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    navigate('/')
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">Heart Health</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-500 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Ready to check your heart health? Take our quick assessment.
          </p>
        </div>

        {/* Main Card */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card bg-gradient-to-br from-red-500 to-pink-500 text-white">
            <h2 className="text-2xl font-bold mb-4">Start Your Assessment</h2>
            <p className="mb-6 text-white/90">
              Our advanced ML algorithm will analyze your health parameters to predict potential heart conditions. 
              The assessment takes only 2-3 minutes.
            </p>
            <Link
              to="/assessment"
              className="inline-block bg-white text-red-500 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Begin Assessment →
            </Link>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-red-500 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Fill the Form</h3>
                  <p className="text-gray-600 text-sm">Answer simple questions about your health</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-red-500 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">AI Analysis</h3>
                  <p className="text-gray-600 text-sm">ML algorithms process your data instantly</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-red-500 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Get Results</h3>
                  <p className="text-gray-600 text-sm">Receive detailed predictions and recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Secure & Private</h3>
            <p className="text-gray-600 text-sm">Your health data is safe and secure</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Instant Results</h3>
            <p className="text-gray-600 text-sm">Get predictions in real-time</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Expert Insights</h3>
            <p className="text-gray-600 text-sm">Backed by medical research</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-yellow-700 text-sm">
              <strong>Important:</strong> This tool provides predictions only. Always consult a healthcare professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
