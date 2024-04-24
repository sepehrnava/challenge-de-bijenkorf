export interface ISUGGESTION {
  searchterm: string;
  nrResults: number;
}

export interface SEARCH_INPUT {
  query: string;
}

export interface ANIMATION_DELAY_STYLE {
  "--animation-delay"?: string;
}

export type ApiResponse<T> =
  | {
      pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        resultsPerPage: number;
      };
      results: T[];
    }
  | undefined;

export type SearchResults = ApiResponse<ISUGGESTION>;
