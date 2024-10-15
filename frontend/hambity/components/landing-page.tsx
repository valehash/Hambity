"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Trophy, Users, BarChart2 } from "lucide-react"

export default function LandingPageComponent() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/sign-up')
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      router.push(`/sign-up?email=${encodeURIComponent(email)}`)
    } else {
      router.push('/sign-up')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
    <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800">
    <Link className="flex items-center justify-center" href="#">
    <CheckCircle className="h-6 w-6 mr-2 text-orange-600" />
    <span className="font-bold text-orange-600">HabitCluster</span>
    </Link>
    <nav className="ml-auto flex gap-4 sm:gap-6">
    <Link className="text-sm font-medium hover:text-orange-600 transition-colors" href="#features">
    Features
    </Link>
    <Link className="text-sm font-medium hover:text-orange-600 transition-colors" href="#how-it-works">
    How It Works
    </Link>
    <Link className="text-sm font-medium hover:text-orange-600 transition-colors" href="#testimonials">
    Testimonials
    </Link>
    </nav>
    </header>
    <main className="flex-1">
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-orange-50 dark:bg-orange-950">
    <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center space-y-4 text-center">
    <div className="space-y-2">
    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-orange-600">
    Build Better Habits Together
    </h1>
    <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
    Join a community of goal-setters and achieve more with peer accountability. Track habits, compete on
    leaderboards, and support each other in clusters.
    </p>
    </div>
    <div className="space-x-4">
    <Button className="bg-orange-600 text-white hover:bg-orange-700" onClick={handleGetStarted}>Get Started</Button>
    <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-100">Learn More</Button>
    </div>
    </div>
    </div>
    </section>
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
    <div className="container px-4 md:px-6">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-orange-600">Key Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div className="flex flex-col items-center text-center">
    <Users className="h-12 w-12 mb-4 text-orange-600" />
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Accountability Clusters</h3>
    <p className="text-gray-600 dark:text-gray-400">
    Join or create group chats focused on specific goals and habits.
    </p>
    </div>
    <div className="flex flex-col items-center text-center">
    <Trophy className="h-12 w-12 mb-4 text-orange-600" />
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Leaderboards</h3>
    <p className="text-gray-600 dark:text-gray-400">
    Compete with friends and track progress on interactive leaderboards.
    </p>
    </div>
    <div className="flex flex-col items-center text-center">
    <BarChart2 className="h-12 w-12 mb-4 text-orange-600" />
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Habit Tracking</h3>
    <p className="text-gray-600 dark:text-gray-400">
    Set, track, and analyze your daily habits and long-term goals.
    </p>
    </div>
    </div>
    </div>
    </section>
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-orange-50 dark:bg-orange-950">
    <div className="container px-4 md:px-6">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-orange-600">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center text-xl font-bold mb-4">
    1
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Sign Up</h3>
    <p className="text-gray-600 dark:text-gray-400">Create your account and set your goals.</p>
    </div>
    <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center text-xl font-bold mb-4">
    2
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Join a Cluster</h3>
    <p className="text-gray-600 dark:text-gray-400">Find or create a group with similar goals.</p>
    </div>
    <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center text-xl font-bold mb-4">
    3
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Track Habits</h3>
    <p className="text-gray-600 dark:text-gray-400">Log your daily progress and tasks.</p>
    </div>
    <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center text-xl font-bold mb-4">
    4
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Stay Accountable</h3>
    <p className="text-gray-600 dark:text-gray-400">Encourage and challenge your cluster members.</p>
    </div>
    </div>
    </div>
    </section>
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
    <div className="container px-4 md:px-6">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-orange-600">
    What Our Users Say
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg shadow-md">
    <p className="text-gray-600 dark:text-gray-300 mb-4">
    "HabitCluster has transformed the way I approach my goals. The accountability from my cluster keeps me
    motivated every day!"
    </p>
    <p className="font-bold text-orange-600">- Sarah J.</p>
    </div>
    <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg shadow-md">
    <p className="text-gray-600 dark:text-gray-300 mb-4">
    "I love competing on the leaderboards. It's a fun way to stay on track with my habits and connect with
    others."
    </p>
    <p className="font-bold text-orange-600">- Mike T.</p>
    </div>
    <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg shadow-md">
    <p className="text-gray-600 dark:text-gray-300 mb-4">
    "The group chat feature is fantastic. It's like having a personal cheer squad for your goals!"
    </p>
    <p className="font-bold text-orange-600">- Emily R.</p>
    </div>
    </div>
    </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50 dark:bg-orange-950">
    <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center space-y-4 text-center">
    <div className="space-y-2">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-orange-600">
    Ready to Transform Your Habits?
    </h2>
    <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
    Join HabitCluster today and start achieving your goals with the power of community.
    </p>
    </div>
    <div className="w-full max-w-sm space-y-2">
    <form onSubmit={handleSignUp} className="flex space-x-2">
    <Input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="flex-1"
    />
    <Button type="submit" className="bg-orange-600 text-white hover:bg-orange-700">Sign Up</Button>
    </form>
    <p className="text-xs text-gray-500 dark:text-gray-400">
    By signing up, you agree to our Terms of Service and Privacy Policy.
    </p>
    </div>
    </div>
    </div>
    </section>
    </main>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
    <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 HabitCluster. All rights reserved.</p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
    <Link className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-500" href="#">
    Terms of Service
    </Link>
    <Link className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-500" href="#">
    Privacy
    </Link>
    </nav>
    </footer>
    </div>
  )
}
