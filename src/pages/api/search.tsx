import suggestions from "../../lib/constants/searchSuggestions";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.searchterm.toLowerCase().includes(searchQuery)
    );

    res.status(200).json(filteredSuggestions);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ error: "Internal Server Error", details: message });
  }
}
