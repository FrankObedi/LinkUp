'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Users, Plus, ArrowLeft, Settings, UserPlus, Trophy, Target, Code, Calendar, MapPin, Crown, X, Check, Edit2 } from 'lucide-react'
import Link from 'next/link'

// Mock teams data
const mockTeams = [
  {
    id: 1,
    name: 'DeFi Innovators',
    description: 'Building the next generation of decentralized finance protocols with AI integration',
    leader: {
      username: 'blockchaindev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    members: [
      {
        username: 'blockchaindev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        role: 'Team Lead',
        skills: ['Solidity', 'Web3.js']
      },
      {
        username: 'hackergirl',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
        role: 'Full Stack Dev',
        skills: ['React', 'Node.js']
      },
      {
        username: 'airesearcher',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        role: 'AI/ML Engineer',
        skills: ['Python', 'TensorFlow']
      }
    ],
    lookingFor: ['UI/UX Designer', 'Backend Developer'],
    techStack: ['React', 'Solidity', 'Python', 'Node.js'],
    projectGoals: ['Build DeFi protocol', 'Integrate AI for risk assessment', 'Win grand prize'],
    status: 'active',
    createdAt: '2 days ago',
    maxMembers: 5
  },
  {
    id: 2,
    name: 'HealthTech Heroes',
    description: 'Creating AI-powered healthcare solutions for underserved communities',
    leader: {
      username: 'airesearcher',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    members: [
      {
        username: 'airesearcher',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        role: 'Team Lead',
        skills: ['Python', 'PyTorch']
      },
      {
        username: 'fullstackpro',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        role: 'Backend Dev',
        skills: ['Node.js', 'PostgreSQL']
      }
    ],
    lookingFor: ['Frontend Developer', 'Healthcare Expert', 'UI Designer'],
    techStack: ['Python', 'React', 'PostgreSQL', 'TensorFlow'],
    projectGoals: ['Build health monitoring app', 'Implement predictive analytics', 'Impact 1000+ users'],
    status: 'recruiting',
    createdAt: '1 day ago',
    maxMembers: 6
  }
]

export default function TeamsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<typeof mockTeams[0] | null>(null)
  const [filter, setFilter] = useState<'all' | 'my-teams' | 'recruiting'>('all')
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    maxMembers: 4,
    lookingFor: [] as string[],
    projectGoals: [] as string[]
  })

  const filteredTeams = mockTeams.filter(team => {
    if (filter === 'all') return true
    if (filter === 'my-teams') return team.members.some(m => m.username === 'hackergirl')
    if (filter === 'recruiting') return team.status === 'recruiting'
    return true
  })

  const handleCreateTeam = () => {
    // In a real app, this would create the team in the backend
    console.log('Creating team:', newTeam)
    setShowCreateModal(false)
  }

  const handleJoinTeam = (teamId: number) => {
    // In a real app, this would send a join request
    console.log('Joining team:', teamId)
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
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Team</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hackathon Teams</h1>
          <p className="text-gray-600">Join a team or create your own to start building amazing projects!</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-8">
          {(['all', 'my-teams', 'recruiting'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {status === 'all' && 'All Teams'}
              {status === 'my-teams' && 'My Teams'}
              {status === 'recruiting' && 'Recruiting'}
              {status === 'recruiting' && (
                <span className="ml-2 bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                  {mockTeams.filter(t => t.status === 'recruiting').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  {/* Team Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{team.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{team.members.length}/{team.maxMembers} members</span>
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        <span>{team.createdAt}</span>
                      </div>
                    </div>
                    
                    {team.status === 'recruiting' && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Recruiting
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{team.description}</p>

                  {/* Team Members */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Team Members</h4>
                    <div className="flex -space-x-2">
                      {team.members.map((member, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={member.avatar}
                            alt={member.username}
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                          {member.username === team.leader.username && (
                            <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 bg-white rounded-full p-0.5" />
                          )}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {member.username} - {member.role}
                          </div>
                        </div>
                      ))}
                      {team.members.length < team.maxMembers && (
                        <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                          <UserPlus className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <Code className="h-4 w-4 mr-1 text-blue-600" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {team.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Looking For */}
                  {team.lookingFor.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Looking For</h4>
                      <div className="flex flex-wrap gap-2">
                        {team.lookingFor.map((role, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedTeam(team)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Details
                    </button>
                    
                    {team.members.some(m => m.username === 'hackergirl') ? (
                      <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                        Already Member
                      </button>
                    ) : team.status === 'recruiting' ? (
                      <button
                        onClick={() => handleJoinTeam(team.id)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        Request to Join
                      </button>
                    ) : (
                      <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                        Team Full
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No teams found
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to create a team and start building!
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your Team</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Create Team Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateModal(false)}
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
                  <h2 className="text-2xl font-bold text-gray-900">Create New Team</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Team Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
                    <input
                      type="text"
                      value={newTeam.name}
                      onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                      placeholder="e.g., AI Innovators"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                    <textarea
                      value={newTeam.description}
                      onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                      rows={3}
                      placeholder="What are you building? What's your vision?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Max Members */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Team Size</label>
                    <select
                      value={newTeam.maxMembers}
                      onChange={(e) => setNewTeam({...newTeam, maxMembers: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} members</option>
                      ))}
                    </select>
                  </div>

                  {/* Looking For */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Looking For (Roles)</label>
                    <div className="space-y-2">
                      {newTeam.lookingFor.map((role, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={role}
                            readOnly
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                          <button
                            onClick={() => {
                              const updated = [...newTeam.lookingFor]
                              updated.splice(index, 1)
                              setNewTeam({...newTeam, lookingFor: updated})
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        placeholder="e.g., Backend Developer"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const value = (e.target as HTMLInputElement).value
                            if (value.trim()) {
                              setNewTeam({...newTeam, lookingFor: [...newTeam.lookingFor, value.trim()]})
                              ;(e.target as HTMLInputElement).value = ''
                            }
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Project Goals */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Goals</label>
                    <div className="space-y-2">
                      {newTeam.projectGoals.map((goal, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={goal}
                            readOnly
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                          <button
                            onClick={() => {
                              const updated = [...newTeam.projectGoals]
                              updated.splice(index, 1)
                              setNewTeam({...newTeam, projectGoals: updated})
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        placeholder="e.g., Win grand prize"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const value = (e.target as HTMLInputElement).value
                            if (value.trim()) {
                              setNewTeam({...newTeam, projectGoals: [...newTeam.projectGoals, value.trim()]})
                              ;(e.target as HTMLInputElement).value = ''
                            }
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateTeam}
                      disabled={!newTeam.name || !newTeam.description}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                    >
                      Create Team
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team Detail Modal */}
      <AnimatePresence>
        {selectedTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTeam(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTeam.name}</h2>
                  <button
                    onClick={() => setSelectedTeam(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Team Info */}
                  <div>
                    <p className="text-gray-600 text-lg">{selectedTeam.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {selectedTeam.members.length}/{selectedTeam.maxMembers} members
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Created {selectedTeam.createdAt}
                      </span>
                      {selectedTeam.status === 'recruiting' && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Actively Recruiting
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Team Members</h3>
                    <div className="space-y-3">
                      {selectedTeam.members.map((member, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img
                              src={member.avatar}
                              alt={member.username}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">{member.username}</span>
                                {member.username === selectedTeam.leader.username && (
                                  <Crown className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                              <span className="text-sm text-gray-600">{member.role}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, skillIdx) => (
                              <span
                                key={skillIdx}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeam.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Goals */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Project Goals</h3>
                    <ul className="space-y-2">
                      {selectedTeam.projectGoals.map((goal, idx) => (
                        <li key={idx} className="flex items-start">
                          <Target className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Looking For */}
                  {selectedTeam.lookingFor.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Looking For</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTeam.lookingFor.map((role, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-6 border-t border-gray-200">
                    {selectedTeam.members.some(m => m.username === 'hackergirl') ? (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p className="text-blue-800 font-medium">You're already a member of this team!</p>
                      </div>
                    ) : selectedTeam.status === 'recruiting' ? (
                      <button
                        onClick={() => handleJoinTeam(selectedTeam.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        Request to Join Team
                      </button>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-gray-600">This team is not currently recruiting new members.</p>
                      </div>
                    )}
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