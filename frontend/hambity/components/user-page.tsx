"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Menu, X, Plus, CheckCircle } from "lucide-react"

interface Cluster {
    id: number;
    name: string;
}

interface Goal {
    id: number;
    text: string;
    completed: boolean;
}

export default function UserPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [newTask, setNewTask] = useState("")
    const [tasks, setTasks] = useState([
        { id: 1, text: "Morning meditation", completed: false },
        { id: 2, text: "30 minutes exercise", completed: false },
        { id: 3, text: "Read 20 pages", completed: false },
    ])
    const [notes, setNotes] = useState("")
    const sidebarRef = useRef<HTMLDivElement>(null)

    const [clusters, setClusters] = useState<Cluster[]>([
        { id: 1, name: "Fitness Enthusiasts" },
        { id: 2, name: "Book Club" },
        { id: 3, name: "Productivity Hackers" },
    ])

    const [goals, setGoals] = useState<Goal[]>([
        { id: 1, text: "Run 5km", completed: true },
        { id: 2, text: "Read 2 chapters", completed: false },
        { id: 3, text: "Meditate for 10 minutes", completed: true },
        { id: 4, text: "Write 500 words", completed: false },
    ])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsSidebarOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault()
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
            setNewTask("")
        }
    }

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const completedGoals = goals.filter(goal => goal.completed).length
    const totalGoals = goals.length
    const weeklyProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-orange-600 text-white transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
        >
        <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">HabitCluster</h2>
        <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(false)}
        className="lg:hidden text-white"
        >
        <X className="h-6 w-6" />
        </Button>
        </div>
        <nav className="mt-8">
        <h3 className="px-4 mb-2 text-lg font-semibold">My Clusters</h3>
        {clusters.map((cluster) => (
            <a key={cluster.id} href="#" className="block py-2 px-4 hover:bg-orange-700">
            {cluster.name}
            </a>
        ))}
        <h3 className="px-4 mt-6 mb-2 text-lg font-semibold">User Statistics</h3>
        <div className="px-4">
        <p>Total Habits: 15</p>
        <p>Completed Today: 5</p>
        <p>Streak: 7 days</p>
        </div>
        <h3 className="px-4 mt-6 mb-2 text-lg font-semibold">Weekly Goals</h3>
        <div className="px-4">
        <p>Progress: {completedGoals}/{totalGoals}</p>
        <Progress value={weeklyProgress} className="mt-2" />
        </div>
        </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
        <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden"
        >
        <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-orange-600">Dashboard</h1>
        <Button variant="ghost" size="sm">Logout</Button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Goals */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-orange-600">Weekly Goals</h2>
        <div className="space-y-2">
        {goals.map((goal) => (
            <div key={goal.id} className="flex items-center">
            <Checkbox
            id={`goal-${goal.id}`}
            checked={goal.completed}
            onCheckedChange={() => {
                setGoals(goals.map(g =>
                g.id === goal.id ? { ...g, completed: !g.completed } : g
                ))
            }}
            />
            <label
            htmlFor={`goal-${goal.id}`}
            className={`ml-2 ${goal.completed ? 'line-through text-gray-500' : ''}`}
            >
            {goal.text}
            </label>
            </div>
        ))}
        </div>
        <div className="mt-4">
        <p>Overall Progress:</p>
        <Progress value={weeklyProgress} className="mt-2" />
        </div>
        </div>

        {/* Notes */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-orange-600">Notes</h2>
        <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full h-32 p-2 border rounded"
        />
        </div>
        </div>

        {/* Daily Routine Checklist */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-orange-600">Daily Routine</h2>
        <form onSubmit={handleAddTask} className="flex mb-4">
        <Input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="flex-grow mr-2"
        />
        <Button type="submit">
        <Plus className="h-4 w-4 mr-2" />
        Add Task
        </Button>
        </form>
        <div className="space-y-2">
        {tasks.map((task) => (
            <div key={task.id} className="flex items-center">
            <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => toggleTaskCompletion(task.id)}
            />
            <label
            htmlFor={`task-${task.id}`}
            className={`ml-2 ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
            {task.text}
            </label>
            </div>
        ))}
        </div>
        </div>
        </div>
        </main>
        </div>
        </div>
    )
}
