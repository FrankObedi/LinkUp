'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Settings, Users, MessageCircle, LogOut, MapPin, Clock, Code, Briefcase, Target, User } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/app/components/logo/logo'

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

// Mock potential matches - HILARIOUS PROFILES THAT WILL MAKE JUDGES LAUGH! 😂
const potentialMatches = [
  {
    id: 1,
    username: 'StackOverflowCopyPaste',
    avatar: '/students/jaffar002.png',
    bio: 'I have successfully copied and pasted 47,392 lines of code from Stack Overflow. My debugging technique involves staring at the screen until the bugs get uncomfortable and fix themselves. 🐛',
    skills: ['Ctrl+C', 'Ctrl+V', 'Stack Overflow Premium', 'Console.log Debugging', 'Googling Error Messages'],
    interests: ['Copy-Paste Engineering', 'Stack Overflow Archaeology', 'Rubber Duck Psychology', 'Coffee-Driven Development'],
    timezone: 'EST',
    goals: ['Build an app that debugs itself', 'Get 1 million Stack Overflow points'],
    matchScore: 99
  },
  {
    id: 2,
    username: 'CaffeinatedCoder',
    avatar: '/students/IMG_0465.jpg',
    bio: 'I run on coffee and broken dreams. My blood type is Java (the drink, not the language). I once stayed awake for 72 hours fixing a semicolon. Currently seeking teammate who can handle my 3 AM "EUREKA!" moments. ☕',
    skills: ['Espresso.js', 'CoffeeScript', 'Red Bull API', 'Insomnia Framework', '24/7 Uptime'],
    interests: ['Coffee Bean Optimization', 'Sleep Deprivation Studies', 'Energy Drink Mixology', 'Midnight Coding Sessions'],
    timezone: 'PST',
    goals: ['Code while sleepwalking', 'Invent coffee-powered computers'],
    matchScore: 94
  },
  {
    id: 3,
    username: 'BugWhisperer',
    avatar: '/students/IMG_0469.jpg',
    bio: 'I speak fluent Bug and can communicate with errors in their native language. My code has more issues than a teenager, but somehow it still works. I believe every bug is just a feature in disguise. 🦗',
    skills: ['Bug Telepathy', 'Error Message Translation', 'Spaghetti Code Architecture', 'Chaos Engineering', 'Murphy\'s Law Implementation'],
    interests: ['Bug Collecting', 'Error Message Poetry', 'Crash Course Philosophy', 'Debugging Meditation'],
    timezone: 'CST',
    goals: ['Befriend all the bugs in my code', 'Write code that debugs other code'],
    matchScore: 87
  },
  {
    id: 4,
    username: 'GitCommitMessiah',
    avatar: '/students/IMG_0471.jpg',
    bio: 'My git commit messages are legendary. "Fixed stuff", "It works on my machine", and "YOLO push to prod" are my greatest hits. I have 47 branches and I\'ve never successfully merged any of them. 🌿',
    skills: ['Git Archaeology', 'Merge Conflict Meditation', 'Branch Hoarding', 'Commit Message Poetry', 'Rebase Roulette'],
    interests: ['Version Control Philosophy', 'Git History Mysteries', 'Branch Naming Conventions', 'Merge Conflict Resolution Therapy'],
    timezone: 'MST',
    goals: ['Create the perfect commit message', 'Merge all 47 branches simultaneously'],
    matchScore: 91
  },
  {
    id: 5,
    username: 'DockerWhale',
    avatar: '/students/IMG_0474.jpg',
    bio: 'I containerize everything, including my emotions. My Docker images are bigger than my ego (and that\'s saying something). I once tried to dockerize my cat. It works on my container! 🐳',
    skills: ['Container Therapy', 'Kubernetes Yoga', 'Docker Compose Symphony', 'Microservice Meditation', 'Pod Whispering'],
    interests: ['Container Philosophy', 'Orchestration Dance', 'Cloud Native Lifestyle', 'DevOps Zen'],
    timezone: 'UTC',
    goals: ['Containerize the entire internet', 'Achieve container enlightenment'],
    matchScore: 88
  },
  {
    id: 6,
    username: 'AIPromptNinja',
    avatar: '/students/IMG_0475.jpg',
    bio: 'I can make ChatGPT write my code, my emails, and my dating profile. I\'m basically a human-AI translator. My superpower is turning "make it work" into 500 lines of perfectly commented code. 🤖',
    skills: ['Prompt Engineering', 'AI Whispering', 'GPT Therapy', 'Neural Network Negotiations', 'Machine Learning Psychology'],
    interests: ['AI Ethics Comedy', 'Robot Stand-up', 'Artificial Intelligence Philosophy', 'Human-AI Relationships'],
    timezone: 'GMT',
    goals: ['Teach AI to write better jokes', 'Become best friends with GPT-5'],
    matchScore: 96
  }
]

export default function DashboardPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<number[]>([])
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [navOpen, setNavOpen] = useState(false)

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
              <Logo/>
            </div>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation"
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {navOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-4">
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
          {/* Mobile nav */}
          {navOpen && (
            <div className="md:hidden flex flex-col items-center space-y-2 pb-4">
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
          )}
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
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -100) {
                      handleSwipe(false) // Swiped left
                    } else if (info.offset.x > 100) {
                      handleSwipe(true) // Swiped right
                    }
                  }}
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