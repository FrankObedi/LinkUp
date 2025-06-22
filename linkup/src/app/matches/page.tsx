'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Users, ArrowLeft, ExternalLink, Calendar, MapPin, Code, Target, Check, X, Copy } from 'lucide-react'
import Link from 'next/link'

// Mock matches data - HILARIOUS PROFILES! 😂
const mockMatches = [
  {
    id: 1,
    username: 'StackOverflowCopyPaste',
    discord: 'StackOverflowGod#1337',
    avatar: '/students/jaffar002.png',
    bio: 'I have successfully copied and pasted 47,392 lines of code from Stack Overflow. My debugging technique involves staring at the screen until the bugs get uncomfortable and fix themselves. 🐛',
    skills: ['Ctrl+C', 'Ctrl+V', 'Stack Overflow Premium', 'Console.log Debugging', 'Googling Error Messages'],
    interests: ['Copy-Paste Engineering', 'Stack Overflow Archaeology', 'Rubber Duck Psychology', 'Coffee-Driven Development'],
    timezone: 'EST',
    matchedAt: '2 hours ago',
    status: 'accepted',
    lastMessage: "Hey! I found the perfect Stack Overflow answer for our project. It only has 47 upvotes but trust me!"
  },
  {
    id: 2,
    username: 'CaffeinatedCoder',
    discord: 'CoffeeOrDie#2424',
    avatar: '/students/IMG_0465.jpg',
    bio: 'I run on coffee and broken dreams. My blood type is Java (the drink, not the language). I once stayed awake for 72 hours fixing a semicolon. Currently seeking teammate who can handle my 3 AM "EUREKA!" moments. ☕',
    skills: ['Espresso.js', 'CoffeeScript', 'Red Bull API', 'Insomnia Framework', '24/7 Uptime'],
    interests: ['Coffee Bean Optimization', 'Sleep Deprivation Studies', 'Energy Drink Mixology', 'Midnight Coding Sessions'],
    timezone: 'PST',
    matchedAt: '5 hours ago',
    status: 'pending',
    lastMessage: null
  },
  {
    id: 3,
    username: 'BugWhisperer',
    discord: 'BugTalker#4040',
    avatar: '/students/IMG_0469.jpg',
    bio: 'I speak fluent Bug and can communicate with errors in their native language. My code has more issues than a teenager, but somehow it still works. I believe every bug is just a feature in disguise. 🦗',
    skills: ['Bug Telepathy', 'Error Message Translation', 'Spaghetti Code Architecture', 'Chaos Engineering', 'Murphy\'s Law Implementation'],
    interests: ['Bug Collecting', 'Error Message Poetry', 'Crash Course Philosophy', 'Debugging Meditation'],
    timezone: 'CST',
    matchedAt: '1 day ago',
    status: 'accepted',
    lastMessage: "My bugs want to collaborate with your bugs! They've been talking behind our backs."
  },
  {
    id: 4,
    username: 'GitCommitMessiah',
    discord: 'YOLOcommit#9999',
    avatar: '/students/IMG_0471.jpg',
    bio: 'My git commit messages are legendary. "Fixed stuff", "It works on my machine", and "YOLO push to prod" are my greatest hits. I have 47 branches and I\'ve never successfully merged any of them. 🌿',
    skills: ['Git Archaeology', 'Merge Conflict Meditation', 'Branch Hoarding', 'Commit Message Poetry', 'Rebase Roulette'],
    interests: ['Version Control Philosophy', 'Git History Mysteries', 'Branch Naming Conventions', 'Merge Conflict Resolution Therapy'],
    timezone: 'MST',
    matchedAt: '3 hours ago',
    status: 'pending',
    lastMessage: null
  },
  {
    id: 5,
    username: 'DockerWhale',
    discord: 'ContainerKing#8080',
    avatar: '/students/IMG_0474.jpg',
    bio: 'I containerize everything, including my emotions. My Docker images are bigger than my ego (and that\'s saying something). I once tried to dockerize my cat. It works on my container! 🐳',
    skills: ['Container Therapy', 'Kubernetes Yoga', 'Docker Compose Symphony', 'Microservice Meditation', 'Pod Whispering'],
    interests: ['Container Philosophy', 'Orchestration Dance', 'Cloud Native Lifestyle', 'DevOps Zen'],
    timezone: 'UTC',
    matchedAt: '6 hours ago',
    status: 'accepted',
    lastMessage: "Let's containerize this hackathon! I'll bring the Docker, you bring the whale songs 🐳"
  },
  {
    id: 6,
    username: 'AIPromptNinja',
    discord: 'GPTWhisperer#3030',
    avatar: '/students/IMG_0475.jpg',
    bio: 'I can make ChatGPT write my code, my emails, and my dating profile. I\'m basically a human-AI translator. My superpower is turning "make it work" into 500 lines of perfectly commented code. 🤖',
    skills: ['Prompt Engineering', 'AI Whispering', 'GPT Therapy', 'Neural Network Negotiations', 'Machine Learning Psychology'],
    interests: ['AI Ethics Comedy', 'Robot Stand-up', 'Artificial Intelligence Philosophy', 'Human-AI Relationships'],
    timezone: 'GMT',
    matchedAt: '8 hours ago',
    status: 'accepted',
    lastMessage: "I asked GPT to write the perfect team-up message, but it just said 'Hello World'. Some things never change!"
  }
]

type MatchStatus = 'all' | 'accepted' | 'pending'

export default function MatchesPage() {
  const [filter, setFilter] = useState<MatchStatus>('all')
  const [selectedMatch, setSelectedMatch] = useState<typeof mockMatches[0] | null>(null)
  const [copiedDiscord, setCopiedDiscord] = useState<string | null>(null)
  const [allProfiles, setAllProfiles] = useState<typeof mockMatches>([])
  const [profileData, setProfileData] = useState(null)
  const [rejectedMatches, setRejectedMatches] = useState<number[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    // Fetch all users
    fetch("/api/profile/all")
      .then(res => res.json())
      .then(setAllProfiles)
    // Fetch your profile
    if (session?.user?.email) {
      fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`)
        .then(res => res.json())
        .then(setProfileData)
    }
  }, [session])

  const filteredMatches = mockMatches.filter(match => {
    if (filter === 'all') return true
    return match.status === filter
  })

  const handleAcceptMatch = async (matchId: number) => {
    // Find the match to get their email or unique identifier
    const match = mockMatches.find(m => m.id === matchId)

    // Hide the card
    setRejectedMatches(prev => [...prev, matchId])
  }

  const handleRejectMatch = (matchId: number) => {
    setRejectedMatches(prev => [...prev, matchId])
  }

  const copyDiscord = (discord: string) => {
    navigator.clipboard.writeText(discord)
    setCopiedDiscord(discord)
    setTimeout(() => setCopiedDiscord(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-600 fill-current" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinkUp
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {filteredMatches.length} {filter === 'all' ? 'Total' : filter} Matches
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Matches</h1>
          <p className="text-gray-600">Connect with your matches and start building amazing projects together!</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-8">
          {(['all', 'accepted', 'pending'] as MatchStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'pending' && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {mockMatches.filter(m => m.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow ${rejectedMatches.includes(match.id) ? 'hidden' : ''}`}
              >
                <div className="p-6">
                  {/* Match Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={match.avatar}
                        alt={match.username}
                        className="w-16 h-16 rounded-full border-2 border-gray-200"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{match.username}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{match.timezone}</span>
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          <span>{match.matchedAt}</span>
                        </div>
                      </div>
                    </div>
                    
                    {match.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAcceptMatch(match.id)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleRejectMatch(match.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Connected
                      </span>
                    )}
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 mb-4">{match.bio}</p>

                  {/* Skills & Interests */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Code className="h-4 w-4 text-blue-600 mr-1" />
                        <span className="text-sm font-medium text-gray-700">Skills</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {match.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center mb-2">
                        <Target className="h-4 w-4 text-purple-600 mr-1" />
                        <span className="text-sm font-medium text-gray-700">Interests</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {match.interests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Discord & Actions */}
                  {match.status === 'accepted' && (
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Discord:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                            {match.discord}
                          </code>
                          <button
                            onClick={() => copyDiscord(match.discord)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {copiedDiscord === match.discord ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        
                        <button
                          onClick={() => setSelectedMatch(match)}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          View Details
                        </button>
                      </div>
                      
                      {match.lastMessage && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 italic">"{match.lastMessage}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {filter === 'all' ? '' : filter} matches yet
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'pending' 
                ? "You don't have any pending match requests."
                : "Keep swiping to find your perfect teammates!"}
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Users className="h-5 w-5" />
              <span>Find More Teammates</span>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Match Detail Modal */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMatch(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Match Details</h2>
                  <button
                    onClick={() => setSelectedMatch(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Profile Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedMatch.avatar}
                      alt={selectedMatch.username}
                      className="w-20 h-20 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedMatch.username}</h3>
                      <p className="text-gray-600">{selectedMatch.discord}</p>
                    </div>
                  </div>

                  {/* Discord Connection */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Connect on Discord</h4>
                    <p className="text-blue-700 text-sm mb-3">
                      Add them as a friend on Discord to start collaborating!
                    </p>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-3 py-2 rounded border border-blue-200 font-mono text-sm flex-1">
                        {selectedMatch.discord}
                      </code>
                      <button
                        onClick={() => copyDiscord(selectedMatch.discord)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        {copiedDiscord === selectedMatch.discord ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Full Profile */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                    <p className="text-gray-600">{selectedMatch.bio}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMatch.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMatch.interests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}