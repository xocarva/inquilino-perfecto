import { Route, Routes } from "react-router-dom"
import SearchResults from './SearchResults'
import House from './House'
import ErrorBoundary from "../ErrorBoundary"

function Houses() {
    return (
        <>
            <ErrorBoundary fallback="Una ruta falla desde houses">
                <Routes>
                    <Route path="/search/*" element={<SearchResults />} />
                    <Route path="/:id" element={<House />} />
                    <Route path="/:id/:startDate/:endDate" element={<House />} />
                </Routes>
            </ErrorBoundary>
        </>

    )
}

export default Houses



