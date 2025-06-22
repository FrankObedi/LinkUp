'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Plus, X, MapPin, Clock, Code, Briefcase, Target, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/app/components/logo/logo'
import { useSession } from "next-auth/react"

// Skills database
const SKILL_OPTIONS = [
  'React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'JavaScript',
  'Solidity', 'Web3.js', 'TensorFlow', 'PyTorch', 'AWS', 'Docker',
  'PostgreSQL', 'MongoDB', 'GraphQL', 'REST API', 'Flutter', 'Swift',
  'Kotlin', 'Go', 'Rust', 'C++', 'Java', 'Ruby on Rails'
]

// Interests database
const INTEREST_OPTIONS = [
  'AI/ML', 'Blockchain', 'Web3', 'DeFi', 'NFTs', 'Healthcare',
  'Education', 'Fintech', 'Gaming', 'Social Impact', 'Climate Tech',
  'IoT', 'AR/VR', 'Cybersecurity', 'Data Science', 'DevOps'
]

// Timezones
const TIMEZONE_OPTIONS = [
  'PST', 'MST', 'CST', 'EST', 'GMT', 'CET', 'IST', 'JST', 'AEST'
]

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  interface ProfileData {
    username: string
    email: string
    bio: string
    skills: string[]
    interests: string[]
    goals: string[]
    timezone: string
    experience: string
    lookingFor: string[]
    avatar: string
  }

  const [profileData, setProfileData] = useState<ProfileData>({
    username: session?.user?.name || '',
    email: session?.user?.email || '',
    bio: '',
    skills: [],
    interests: [],
    goals: [],
    timezone: '',
    experience: '',
    lookingFor: [],
    avatar: session?.user?.image || ''
  })

  const [newSkill, setNewSkill] = useState('')
  const [newInterest, setNewInterest] = useState('')
  const [newGoal, setNewGoal] = useState('')
  const [newLookingFor, setNewLookingFor] = useState('')

  // Fetch profile from DB when session is ready
  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.email) {
        setLoading(true)
        try {
          const res = await fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`)
          if (res.ok) {
            const data = await res.json()
            if (data) {
              setProfileData(prev => ({
                ...prev,
                ...data,
                // fallback to session values if DB values are missing
                username: data.username || session?.user?.name || prev.username,
                email: data.email || session?.user?.email || prev.email,
                avatar: data.avatar || session?.user?.image || prev.avatar,
              }))
            }
          }
        } catch (err) {
          console.error("Failed to fetch profile:", err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchProfile()
  }, [session])

  const handleSave = async () => {
    await saveProfile(profileData, setLoading)
    // Optionally show a success message or redirect
    alert('Profile updated successfully!')
    router.push('/dashboard')
  }

  const addItem = (type: 'skills' | 'interests' | 'goals' | 'lookingFor', value: string) => {
    if (value.trim()) {
      setProfileData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }))
    }
  }

  const removeItem = (type: 'skills' | 'interests' | 'goals' | 'lookingFor', index: number) => {
    setProfileData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  async function saveProfile(profileData: ProfileData, setLoading: (b: boolean) => void) {
    setLoading(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })
      if (!res.ok) throw new Error('Failed to save profile')
      // Optionally handle response here
    } catch (err) {
      console.error(err)
      alert('Failed to save profile!')
    } finally {
      setLoading(false)
    }
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
              <Logo />
            </div>
            
            <button
              type="button"
              onClick={() => saveProfile(profileData, setLoading)}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="mr-2" />
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-gray-50">
                  <User className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Edit Your Profile</h1>
                <p className="text-blue-100">Make yourself discoverable to the perfect teammates</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-8 space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Basic Information
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell potential teammates about yourself..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Timezone
                  </label>
                  <select
                    value={profileData.timezone}
                    onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {TIMEZONE_OPTIONS.map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="inline h-4 w-4 mr-1" />
                    Experience Level
                  </label>
                  <select
                    value={profileData.experience}
                    onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Code className="h-5 w-5 mr-2 text-blue-600" />
                Technical Skills
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center space-x-1"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeItem('skills', index)}
                      className="ml-1 hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                ))}
              </div>

              <div className="flex space-x-2">
                <select
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a skill...</option>
                  {SKILL_OPTIONS.filter(s => !profileData.skills.includes(s)).map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (newSkill) {
                      addItem('skills', newSkill)
                      setNewSkill('')
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Target className="h-5 w-5 mr-2 text-purple-600" />
                Interests & Domains
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.interests.map((interest, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center space-x-1"
                  >
                    <span>{interest}</span>
                    <button
                      onClick={() => removeItem('interests', index)}
                      className="ml-1 hover:text-purple-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                ))}
              </div>

              <div className="flex space-x-2">
                <select
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select an interest...</option>
                  {INTEREST_OPTIONS.filter(i => !profileData.interests.includes(i)).map(interest => (
                    <option key={interest} value={interest}>{interest}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (newInterest) {
                      addItem('interests', newInterest)
                      setNewInterest('')
                    }
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Hackathon Goals */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Hackathon Goals</h2>
              
              <div className="space-y-2 mb-4">
                {profileData.goals.map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                  >
                    <span className="text-gray-700">{goal}</span>
                    <button
                      onClick={() => removeItem('goals', index)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addItem('goals', newGoal)
                      setNewGoal('')
                    }
                  }}
                  placeholder="Add a hackathon goal..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => {
                    addItem('goals', newGoal)
                    setNewGoal('')
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Looking For */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Looking For (Team Roles)</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.lookingFor.map((role, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center space-x-1"
                  >
                    <span>{role}</span>
                    <button
                      onClick={() => removeItem('lookingFor', index)}
                      className="ml-1 hover:text-green-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newLookingFor}
                  onChange={(e) => setNewLookingFor(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addItem('lookingFor', newLookingFor)
                      setNewLookingFor('')
                    }
                  }}
                  placeholder="e.g., Backend Developer, UI Designer..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => {
                    addItem('lookingFor', newLookingFor)
                    setNewLookingFor('')
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}