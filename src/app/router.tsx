import { Navigate, Route, Routes } from 'react-router'
import { AppShell } from '@/components/layout/AppShell'
import { PlaceholderPage } from '@/components/layout/PlaceholderPage'
import { HomePage } from '@/features/home/pages/HomePage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route
          path="discover"
          element={
            <PlaceholderPage
              eyebrow="Case Intake"
              title="Open a Case"
              description="Search the catalog and file new cases."
              code="CASE-INT"
            />
          }
        />
        <Route
          path="deals"
          element={
            <PlaceholderPage
              eyebrow="Live Surveillance"
              title="Deals Radar"
              description="Track active discounts across every storefront."
              code="RADAR"
            />
          }
        />
        <Route
          path="watchlist"
          element={
            <PlaceholderPage
              eyebrow="Ongoing Surveillance"
              title="Surveillance List"
              description="Your tracked cases and price targets."
              code="WATCH"
            />
          }
        />
        <Route
          path="budget"
          element={
            <PlaceholderPage
              eyebrow="Field Operations"
              title="Field Budget"
              description="Plan purchases within a budget."
              code="BUDGET"
            />
          }
        />
        <Route
          path="faceoff"
          element={
            <PlaceholderPage
              eyebrow="Comparative Analysis"
              title="Game Face-Off"
              description="Pit two cases against each other."
              code="VS"
            />
          }
        />
        <Route
          path="intel"
          element={
            <PlaceholderPage
              eyebrow="Analysis"
              title="Intelligence Report"
              description="Aggregate findings from your investigations."
              code="INTEL"
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
