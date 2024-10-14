"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users } from "lucide-react"

type Cluster = {
  _id: { $oid: string }
  creator: string
  name: string
  description: string
  members: string
  expires: string
}

export default function ClusterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [clusters, setClusters] = useState<Cluster[]>([])
  const [searchResults, setSearchResults] = useState<Cluster[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClusters()
  }, [])

  const fetchClusters = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:8080/clusters')
      if (!response.ok) {
        throw new Error('Failed to fetch clusters')
      }
      const data = await response.json()
      setClusters(data)
      setSearchResults(data)
    } catch (err) {
      setError('An error occurred while fetching clusters. Please try again later.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    const results = clusters.filter(
      (cluster) =>
      cluster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cluster.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  const getActivityColor = (members: string) => {
    const memberCount = members.split(',').length
    if (memberCount > 10) return "bg-green-500"
      if (memberCount > 5) return "bg-yellow-500"
        return "bg-red-500"
  }

  const getActivityLevel = (members: string) => {
    const memberCount = members.split(',').length
    if (memberCount > 10) return "high"
      if (memberCount > 5) return "moderate"
        return "low"
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading clusters...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>
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
      <Card key={cluster._id.$oid} className="flex flex-col">
      <CardHeader>
      <CardTitle className="text-xl font-bold text-orange-600">{cluster.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
      <p className="text-gray-600 dark:text-gray-300 mb-4">{cluster.description}</p>
      <div className="flex items-center text-gray-500 dark:text-gray-400">
      <Users className="mr-2 h-4 w-4" />
      <span>{cluster.members.split(',').length} members</span>
      </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
      <Badge variant="secondary" className={getActivityColor(cluster.members)}>
      {getActivityLevel(cluster.members)} activity
      </Badge>
      <span className="text-sm text-gray-500 dark:text-gray-400">
      Expires: {new Date(cluster.expires).toLocaleDateString()}
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
