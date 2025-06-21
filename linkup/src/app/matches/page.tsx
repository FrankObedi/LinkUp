'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Users, ArrowLeft, ExternalLink, Calendar, MapPin, Code, Target, Check, X, Copy } from 'lucide-react'
import Link from 'next/link'

// Mock matches data
const mockMatches = [
  {
    id: 1,
    username: 'blockchaindev',
    discord: 'blockchaindev#1234',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Blockchain enthusiast with 3+ years in DeFi. Looking to build the next big thing!',
    skills: ['Solidity', 'Web3.js', 'React', 'Node.js'],
    interests: ['DeFi', 'NFTs', 'Web3', 'Gaming'],
    timezone: 'EST',
    matchedAt: '2 hours ago',
    status: 'accepted',
    lastMessage: "Hey! I love your profile. Let's build something in DeFi!"
  },
  {
    id: 2,
    username: 'airesearcher',
    discord: 'airesearcher#5678',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'PhD student in ML. Love creating AI solutions that make a real impact.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'React'],
    interests: ['AI/ML', 'Healthcare', 'Education', 'Research'],
    timezone: 'PST',
    matchedAt: '5 hours ago',
    status: 'pending',
    lastMessage: null
  },
  {
    id: 3,
    username: 'fullstackpro',
    discord: 'fullstackpro#9012',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Senior dev at a startup. Always excited to mentor and build cool projects.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    interests: ['SaaS', 'Fintech', 'EdTech', 'Mentoring'],
    timezone: 'CST',
    matchedAt: '1 day ago',
    status: 'accepted',
    lastMessage: "Your project ideas sound amazing! When can we chat?"
  }
]

type MatchStatus = 'all' | 'accepted' | 'pending'

export default function MatchesPage() {
  const [filter, setFilter] = useState<MatchStatus>('all')
  const [selectedMatch, setSelectedMatch] = useState<typeof mockMatches[0] | null>(null)
  const [copiedDiscord, setCopiedDiscord] = useState<string | null>(null)

  const filteredMatches = mockMatches.filter(match => {
    if (filter === 'all') return true
    return match.status === filter
  })

  const handleAcceptMatch = (matchId: number) => {
    // In a real app, this would update the backend
    console.log('Accepting match:', matchId)
  }

  const handleRejectMatch = (matchId: number) => {
    // In a real app, this would update the backend
    console.log('Rejecting match:', matchId)
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
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
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