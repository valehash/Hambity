import Link from 'next/link'
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users } from "lucide-react"

// Mock data for clusters
const mockClusters = [
  {
    id: 1,
    name: "Fitness Fanatics",
    description: "A group dedicated to daily workouts and healthy living.",
    members: 156,
    activity: "high",
    expiryTime: "2024-12-31",
  },
  {
    id: 2,
    name: "Mindful Meditators",
    description: "Practice mindfulness and meditation techniques together.",
    members: 89,
    activity: "moderate",
    expiryTime: "2024-10-15",
  },
  {
    id: 3,
    name: "Bookworm Society",
    description: "Read and discuss a new book every month.",
    members: 42,
    activity: "low",
    expiryTime: "2024-11-30",
  },
  // Add more mock clusters as needed
]

type Cluster = {
  id: number
  name: string
  description: string
  members: number
  activity: "high" | "moderate" | "low"
  expiryTime: string
}

export default function ClusterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Cluster[]>([])

  const handleSearch = () => {
    const results = mockClusters.filter(
      (cluster) =>
        cluster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cluster.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "high":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "low":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-600">Find Your Cluster</h1>
      <div className="flex gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search for clusters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch} className="bg-orange-600 hover:bg-orange-700">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((cluster) => (
          <Card key={cluster.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-orange-600">{cluster.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600 dark:text-gray-300 mb-4">{cluster.description}</p>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Users className="mr-2 h-4 w-4" />
                <span>{cluster.members} members</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Badge className={`${getActivityColor(cluster.activity)} text-white`}>
                {cluster.activity} activity
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Expires: {new Date(cluster.expiryTime).toLocaleDateString()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
      {searchResults.length === 0 && searchTerm && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No clusters found. Try a different search term.</p>
      )}
    </div>
  )
}
