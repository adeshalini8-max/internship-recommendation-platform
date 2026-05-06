import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all internships initially
  useEffect(() => {
    fetchRecommendations([]);
  }, []);

  const fetchRecommendations = async (userSkills) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: userSkills }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      
      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError('Could not connect to the backend. Make sure the FastAPI server is running on port 8000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSearch = () => {
    fetchRecommendations(skills);
  };

  return (
    <div className="app-container">
      <header className="animate-fade-in">
        <h1>InternMatch AI</h1>
        <p>Find your perfect internship using our intelligent recommendation engine.</p>
      </header>

      <main className="main-content">
        {/* Left Column: Profile Form */}
        <section className="profile-section glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2>Your Profile</h2>
          <p style={{ marginBottom: '1.5rem' }}>Add your skills and technologies to get personalized matches.</p>
          
          <form onSubmit={addSkill} className="skill-input-container">
            <input
              type="text"
              placeholder="e.g., Python, React, Machine Learning..."
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
            />
            <button type="submit" style={{ padding: '1rem' }}>Add</button>
          </form>

          <div className="skills-list">
            {skills.map((skill, index) => (
              <div key={index} className="skill-tag animate-fade-in">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>&times;</button>
              </div>
            ))}
          </div>

          <button 
            className="submit-btn" 
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Find Matches'}
          </button>
        </section>

        {/* Right Column: Recommendations */}
        <section className="recommendations-section">
          <div className="dashboard-header animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2>Recommended Internships</h2>
            {skills.length > 0 && <span style={{ color: 'var(--success-color)' }}>Personalized matches</span>}
          </div>

          {error && (
            <div className="glass-panel" style={{ borderColor: '#ef4444', color: '#f87171' }}>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="loading-spinner glass-panel">Finding the best opportunities for you...</div>
          ) : (
            <div className="internships-grid">
              {recommendations.map((internship, index) => (
                <div 
                  key={internship.id} 
                  className="internship-card glass-panel animate-fade-in"
                  style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
                >
                  {internship.match_percentage && skills.length > 0 && (
                    <div className="match-badge">
                      {internship.match_percentage}% Match
                    </div>
                  )}
                  
                  <h3 className="internship-title">{internship.title}</h3>
                  <div className="company-name">{internship.company}</div>
                  
                  <p className="internship-desc">{internship.description}</p>
                  
                  <div className="req-skills">
                    {internship.required_skills.map((skill, i) => (
                      <span key={i} className="req-skill-tag">{skill}</span>
                    ))}
                  </div>
                  
                  <button className="apply-btn" onClick={() => alert(`Applied to ${internship.title} at ${internship.company}!`)}>
                    Apply Now
                  </button>
                </div>
              ))}
              
              {recommendations.length === 0 && !error && (
                <div className="glass-panel" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                  <p>No internships found. Try adding some skills!</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
