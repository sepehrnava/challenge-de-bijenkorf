import suggestions from "../../lib/constants/searchSuggestions";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );

  try {
    const searchQuery = Array.isArray(req.query.search)
      ? req.query.search[0].toLowerCase()
      : req.query.search?.toLowerCase();

    if (!searchQuery || searchQuery.length < 3) {
      res
        .status(400)
        .json({ error: "Search query must be at least 3 characters long" });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (page < 1 || limit < 1) {
      res.status(400).json({ error: "Invalid pagination parameters" });
      return;
    }

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.searchterm.toLowerCase().includes(searchQuery)
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredSuggestions.slice(startIndex, endIndex);

    const paginationInfo = {
      currentPage: page,
      totalPages: Math.ceil(filteredSuggestions.length / limit),
      totalResults: filteredSuggestions.length,
      resultsPerPage: limit,
    };

    res.status(200).json({
      pagination: paginationInfo,
      results: paginatedData,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ error: "Internal Server Error", details: message });
  }
}
