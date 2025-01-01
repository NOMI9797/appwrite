import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../appwrite/Services/dbServices';
import { Link } from 'react-router-dom';
import { MessageSquare, Loader, Search, Calendar, User, ThumbsUp, LogOut } from 'lucide-react';
import { signOutUser } from '../appwrite/Services/authServices';

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    try {
      const response = await db.CustomerQueries.list();
      setMessages(response.documents);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOutUser();
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16 space-y-8 animate-fadeIn">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl opacity-20 rounded-full"></div>
              <MessageSquare className="w-24 h-24 mx-auto text-purple-600 mb-6 animate-bounce" />
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 leading-tight">
              Welcome to CustomerQueries!
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Join our community to discover what customers are saying and share your valuable thoughts.
              Your voice matters in shaping better experiences.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { title: 'Real-time Updates', desc: 'Get instant feedback from customers' },
              { title: 'Secure Platform', desc: 'Your data is always protected' },
              { title: 'Easy Integration', desc: 'Seamless connection with your systems' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-purple-600 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-x-6 animate-slideUp">
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started →
            </Link>
            <Link
              to="/signup"
              className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Customer Messages
          </h2>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 mb-8">Discover what our community is saying</p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
            >
              <option value="all">All Messages</option>
              <option value="recent">Recent First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Messages Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredMessages.map((msg, index) => (
              <div
                key={msg.$id}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <h3 className="text-xl font-semibold text-purple-600">
                      {msg.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(msg.$createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{msg.message}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful
                  </button>
                  <span>ID: #{msg.$id.slice(-4)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 