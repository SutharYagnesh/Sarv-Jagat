import { NextResponse } from "next/server"
import jobs from "@/data/jobs.json"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")
    const location = searchParams.get("location")
    const type = searchParams.get("type")
    const search = searchParams.get("search")

    let filteredJobs = [...jobs]

    // Filter by department
    if (department && department !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.department.toLowerCase() === department.toLowerCase())
    }

    // Filter by location
    if (location && location !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
    }

    // Filter by type
    if (type && type !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.type.toLowerCase() === type.toLowerCase())
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.department.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower),
      )
    }

    // Extract unique values for filters
    const departments = [...new Set(jobs.map((j) => j.department))].sort()
    const locations = [...new Set(jobs.map((j) => j.location))].sort()
    const types = [...new Set(jobs.map((j) => j.type))].sort()

    const response = {
      jobs: filteredJobs,
      total: filteredJobs.length,
      filters: {
        departments,
        locations,
        types,
      },
      applied: {
        department,
        location,
        type,
        search,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}
