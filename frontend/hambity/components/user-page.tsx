"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data (replace with API calls in production)
const mockClusters = [
    {
        id: 1,
        name: "Fitness Fanatics",
        tasks: [
            { id: 1, description: "30 minutes cardio", completed: false },
            { id: 2, description: "Strength training", completed: true },
        ]
    },
    {
        id: 2,
        name: "Bookworm Society",
        tasks: [
            { id: 1, description: "Read 30 pages", completed: false },
            { id: 2, description: "Write book review", completed: false },
        ]
    },
    {
        id: 3,
        name: "Coding Ninjas",
        tasks: [
            { id: 1, description: "Solve 2 coding challenges", completed: true },
            { id: 2, description: "Work on personal project", completed: false },
        ]
    },
]

const mockWeeklyTasks = [
    { day: 'Mon', tasks: 4 },
    { day: 'Tue', tasks: 3 },
    { day: 'Wed', tasks: 5 },
    { day: 'Thu', tasks: 2 },
    { day: 'Fri', tasks: 4 },
    { day: 'Sat', tasks: 6 },
    { day: 'Sun', tasks: 3 },
]

const mockWeeklyGoals = [
    { id: 1, description: "Run 5km three times", cluster: "Fitness Fanatics" },
    { id: 2, description: "Read 2 chapters of 'Clean Code'", cluster: "Bookworm Society" },
    { id: 3, description: "Complete 3 LeetCode challenges", cluster: "Coding Ninjas" },
]

const mockDailyRoutine = [
    { id: 1, task: "Morning meditation", completed: false },
    { id: 2, task: "30 minutes of exercise", completed: false },
    { id: 3, task: "Read for 1 hour", completed: false },
    { id: 4, task: "Code for 2 hours", completed: false },
]

const mockClusterChallenges = [
    { id: 1, description: "7-day workout streak", cluster: "Fitness Fanatics" },
    { id: 2, description: "Read 3 books this month", cluster: "Bookworm Society" },
    { id: 3, description: "Build a full-stack app", cluster: "Coding Ninjas" },
]

export default function UserPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [notes, setNotes] = useState("")
    const [dailyRoutine, setDailyRoutine] = useState(mockDailyRoutine)
    const [selectedCluster, setSelectedCluster] = useState<number | null>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value)
    }

    const handleRoutineToggle = (id: number) => {
        setDailyRoutine(dailyRoutine.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
        ))
    }

    const handleClusterClick = (clusterId: number) => {
        setSelectedCluster(selectedCluster === clusterId ? null : clusterId)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsSidebarOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
        <div className="p-6">
        <h2 className="text-2xl font-semibold text-orange-600 mb-6">Your Clusters</h2>
        <ul>
        {mockClusters.map(cluster => (
            <li key={cluster.id} className="mb-2">
            <Button
            variant="ghost"
            className="w-full justify-start text-left"
            onClick={() => handleClusterClick(cluster.id)}
            >
            {cluster.name}
            </Button>
            {selectedCluster === cluster.id && (
                <ul className="ml-4 mt-2">
                {cluster.tasks.map(task => (
                    <li key={task.id} className="flex items-center mb-1">
                    <span className={`mr-2 ${task.completed ? 'text-green-500' : 'text-gray-500'}`}>
                    {task.completed ? '✓' : '○'}
                    </span>
                    {task.description}
                    </li>
                ))}
                </ul>
            )}
            </li>
        ))}
        </ul>
        </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
        <div className="p-6">
        <Button className="lg:hidden mb-4" onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </Button>

        <h1 className="text-3xl font-bold text-orange-600 mb-6">Welcome, User!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Statistics */}
        <Card>
        <CardHeader>
        <CardTitle>Weekly Task Completion</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockWeeklyTasks} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="day" type="category" />
        <Tooltip />
        <Bar dataKey="tasks" fill="#f97316" /> {/* Orange color */}
        </BarChart>
        </ResponsiveContainer>
        </div>
        </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card>
        <CardHeader>
        <CardTitle>Weekly Goals</CardTitle>
        </CardHeader>
        <CardContent>
        <ul>
        {mockWeeklyGoals.map(goal => (
            <li key={goal.id} className="mb-2">
            <span className="font-semibold text-orange-600">{goal.cluster}:</span> {goal.description}
            </li>
        ))}
        </ul>
        </CardContent>
        </Card>

        {/* Cluster Challenges */}
        <Card>
        <CardHeader>
        <CardTitle>Cluster Challenges</CardTitle>
        </CardHeader>
        <CardContent>
        <ul>
        {mockClusterChallenges.map(challenge => (
            <li key={challenge.id} className="mb-2">
            <span className="font-semibold text-orange-600">{challenge.cluster}:</span> {challenge.description}
            </li>
        ))}
        </ul>
        </CardContent>
        </Card>

        {/* Notes Section */}
        <Card>
        <CardHeader>
        <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
        <Textarea
        placeholder="Write your notes here..."
        value={notes}
        onChange={handleNotesChange}
        className="w-full h-32"
        />
        </CardContent>
        </Card>
        </div>

        {/* Daily Routine */}
        <Card className="mt-6">
        <CardHeader>
        <CardTitle>Daily Routine</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dailyRoutine.map(item => (
            <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
            id={`routine-${item.id}`}
            checked={item.completed}
            onCheckedChange={() => handleRoutineToggle(item.id)}
            />
            <Label htmlFor={`routine-${item.id}`}>{item.task}</Label>
            </div>
        ))}
        </div>
        </CardContent>
        </Card>
        </div>
        </div>
        </div>
    )
}
