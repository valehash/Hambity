"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function SignUpPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }

            // If registration is successful, redirect to the login page
            router.push("/login")
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred during registration. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md">
        <CardHeader>
        <div className="flex items-center justify-center mb-4">
        <CheckCircle className="h-8 w-8 text-orange-600 mr-2" />
        <CardTitle className="text-2xl font-bold text-orange-600">HabitCluster</CardTitle>
        </div>
        <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit}>
        <div className="space-y-4">
        <div>
        <Label htmlFor="name">Name</Label>
        <Input
        id="name"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
        </div>
        <div>
        <Label htmlFor="email">Email</Label>
        <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        </div>
        <div>
        <Label htmlFor="password">Password</Label>
        <Input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        </div>
        <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
        id="confirm-password"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        />
        </div>
        {error && (
            <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
        </div>
        </form>
        </CardContent>
        <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-600 hover:underline">
        Login
        </Link>
        </p>
        </CardFooter>
        </Card>
        </div>
    )
}
