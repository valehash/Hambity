import Link from 'next/link'
"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users } from "lucide-react"

// Function to fetch clusters from the backend
const fetchClusters = async () => {
  try {
    const response = await fetch("http://localhost:8080/cluster");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;  // Ensure this returns the fetched data
  } catch (error) {
    console.error("Error fetching clusters:", error);
    return [];
  }
}

export default function ClusterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [clusters, setClusters] = useState<Cluster[]>([])  // Store fetched clusters
  const [searchResults, setSearchResults] = useState<Cluster[]>([])

  // Fetch clusters on initial load
  useEffect(() => {
    const loadClusters = async () => {
      const fetchedClusters = await fetchClusters();
      setClusters(fetchedClusters);  // Set fetched clusters
      setSearchResults(fetchedClusters);  // Initialize with all clusters
    };
    loadClusters();
  }, []);

  const handleSearch = () => {
    const results = clusters.filter(
      (cluster) =>
      cluster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cluster.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
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
