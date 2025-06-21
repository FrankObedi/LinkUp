'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Settings, Users, MessageCircle, LogOut, MapPin, Clock, Code, Briefcase, Target, User } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Mock user data
const currentUser = {
  username: 'hackergirl',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  bio: 'Full-stack developer passionate about AI and blockchain',
  skills: ['React', 'Node.js', 'Python', 'AI/ML'],
  interests: ['Web3', 'AI', 'Fintech', 'Healthcare'],
  timezone: 'PST',
  status: 'Looking for team'
}

// Mock potential matches
const potentialMatches = [
  {
    id: 1,
    username: 'blockchaindev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Blockchain enthusiast with 3+ years in DeFi. Looking to build the next big thing!',
    skills: ['Solidity', 'Web3.js', 'React', 'Node.js'],
    interests: ['DeFi', 'NFTs', 'Web3', 'Gaming'],
    timezone: 'EST',
    goals: ['Build a DeFi protocol', 'Win hackathon'],
    matchScore: 92
  },
  {
    id: 2,
    username: 'airesearcher',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'PhD student in ML. Love creating AI solutions that make a real impact.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'React'],
    interests: ['AI/ML', 'Healthcare', 'Education', 'Research'],
    timezone: 'PST',
    goals: ['Build AI-powered healthcare app', 'Network with developers'],
    matchScore: 88
  },
  {
    id: 3,
    username: 'fullstackpro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Senior dev at a startup. Always excited to mentor and build cool projects.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    interests: ['SaaS', 'Fintech', 'EdTech', 'Mentoring'],
    timezone: 'CST',
    goals: ['Build a SaaS product', 'Mentor newcomers'],
    matchScore: 85
  }
]

export default function DashboardPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<number[]>([])
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const currentCard = potentialMatches[currentIndex]

  const handleSwipe = (liked: boolean) => {
    if (!currentCard) return

    setDirection(liked ? 'right' : 'left')
    
    if (liked) {
      setMatches([...matches, currentCard.id])
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setDirection(null)
    }, 300)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handleSwipe(false)
    if (e.key === 'ArrowRight') handleSwipe(true)
  }

  const handleLogout = () => {
    // In a real app, this would clear auth tokens
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600 fill-current" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LinkUp
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/matches" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">Matches</span>
                {matches.length > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {matches.length}
                  </span>
                )}
              </Link>
              <Link href="/teams" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <Users className="h-5 w-5" />
                <span className="font-medium">Teams</span>
              </Link>
              <Link href="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Profile</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Next Teammate
          </h1>
          <p className="text-gray-600">
            Swipe right to connect, left to pass. Use arrow keys for quick navigation.
          </p>
        </div>

        {/* Swipe Interface */}
        <div className="flex justify-center" onKeyDown={handleKeyPress} tabIndex={0}>
          <div className="relative w-full max-w-sm">
            <AnimatePresence mode="wait">
              {currentCard ? (
                <motion.div
                  key={currentCard.id}
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    y: 0,
                    x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
                    rotate: direction === 'left' ? -30 : direction === 'right' ? 30 : 0
                  }}
                  exit={{ 
                    scale: 0.8, 
                    opacity: 0,
                    x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
                    rotate: direction === 'left' ? -30 : direction === 'right' ? 30 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                >
                  {/* Profile Image */}
                  <div className="relative h-80 bg-gradient-to-br from-blue-400 to-purple-500">
                    <img
                      src={currentCard.avatar}
                      alt={currentCard.username}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {currentCard.matchScore}% Match
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {currentCard.username}
                      </h2>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{currentCard.timezone}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{currentCard.bio}</p>

                    {/* Skills */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                        <Code className="h-4 w-4 mr-1" />
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentCard.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentCard.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Goals */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Hackathon Goals</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {currentCard.goals.map((goal, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    All caught up!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    You've seen all potential matches for now. Check back later for more awesome teammates!
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/matches"
                      className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      View Your Matches ({matches.length})
                    </Link>
                    <Link
                      href="/profile"
                      className="block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Update Your Profile
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            {currentCard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center space-x-6 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe(false)}
                  className="bg-white border-2 border-red-200 text-red-600 p-4 rounded-full shadow-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  <X className="h-8 w-8" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe(true)}
                  className="bg-white border-2 border-green-200 text-green-600 p-4 rounded-full shadow-lg hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                >
                  <Heart className="h-8 w-8" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white/70 backdrop-blur-sm rounded-lg p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <span>⌨️</span>
              <span>Use arrow keys to swipe faster</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>💬</span>
              <span>Matched users get Discord connection</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>🔄</span>
              <span>Update your profile for better matches</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 