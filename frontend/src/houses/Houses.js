import { Route, Routes } from "react-router-dom"
import SearchResults from './SearchResults'
import House from './House'
import ErrorBoundary from "../ErrorBoundary"

function Houses() {
    return (
        <>
            <ErrorBoundary fallback="Una ruta falla desde user">
                <Routes>
                    <Route path="/search/*" element={<SearchResults />} />
                    <Route path="/:id/:startDate/:endDate" element={<House />} />
                </Routes>
            </ErrorBoundary>
        </>

    )
}

export default Houses



