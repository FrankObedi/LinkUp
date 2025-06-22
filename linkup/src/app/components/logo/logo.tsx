import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <div className="flex items-center space-x-2">
        <Heart className="h-8 w-8 text-blue-600 fill-current" />
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LinkUp
        </span>
        </div>
    </Link>
  )
}