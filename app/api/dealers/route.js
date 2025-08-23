import { NextResponse } from "next/server"
import dealers from "@/data/dealers.json"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")
    const state = searchParams.get("state")
    const city = searchParams.get("city")
    const search = searchParams.get("search")

    let filteredDealers = [...dealers]

    // Filter by country
    if (country && country !== "all") {
      filteredDealers = filteredDealers.filter((dealer) => dealer.country.toLowerCase() === country.toLowerCase())
    }

    // Filter by state
    if (state && state !== "all") {
      filteredDealers = filteredDealers.filter((dealer) => dealer.state.toLowerCase() === state.toLowerCase())
    }

    // Filter by city
    if (city && city !== "all") {
      filteredDealers = filteredDealers.filter((dealer) => dealer.city.toLowerCase() === city.toLowerCase())
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredDealers = filteredDealers.filter(
        (dealer) =>
          dealer.name.toLowerCase().includes(searchLower) ||
          dealer.city.toLowerCase().includes(searchLower) ||
          dealer.state.toLowerCase().includes(searchLower) ||
          dealer.country.toLowerCase().includes(searchLower) ||
          dealer.services?.some((service) => service.toLowerCase().includes(searchLower)),
      )
    }

    // Extract unique values for filters
    const countries = [...new Set(dealers.map((d) => d.country))].sort()
    const states = [...new Set(dealers.map((d) => d.state))].sort()
    const cities = [...new Set(dealers.map((d) => d.city))].sort()

    const response = {
      dealers: filteredDealers,
      total: filteredDealers.length,
      filters: {
        countries,
        states,
        cities,
      },
      applied: {
        country,
        state,
        city,
        search,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching dealers:", error)
    return NextResponse.json({ error: "Failed to fetch dealers" }, { status: 500 })
  }
}
