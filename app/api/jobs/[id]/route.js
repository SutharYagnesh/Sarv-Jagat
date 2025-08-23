import { NextResponse } from "next/server"
import jobs from "@/data/jobs.json"

export async function GET(request, { params }) {
  try {
    const job = jobs.find((j) => j.id === params.id)

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Find related jobs (same department or location)
    const relatedJobs = jobs
      .filter((j) => j.id !== job.id && (j.department === job.department || j.location === job.location))
      .slice(0, 3)

    const response = {
      job,
      relatedJobs,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching job:", error)
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 })
  }
}
