'use client'

import { Button } from "@/components/ui/button"
import { Navigation, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { useStores } from "@/hooks/use-stores"
import { StoreSidebar } from "@/components/map/StoreSidebar"
import { useState } from "react"
import dynamic from "next/dynamic";

// ssr 방지
const GoogleMapProvider = dynamic(
  () => import("@/components/map/MapProvider"),
  { ssr: false }
);

export default function MapApp() {
  const {
    stores,
    markerStores,
    filteredStores,
    storeNameQuery,
    regionQuery,
    selectedStore,
    mapCenter,
    zoomLevel,
    handleStoreNameSearch,
    handleRegionSearch,
    handleStoreSelect,
    fetchMarkers,
    //fetchStoreDetails,
    handleMarkerClick,
    setMapCenter,
    setZoomLevel,
    setMapBounds,
    institutions,
    selectedInstitution,
    handleInstitutionChange,
  } = useStores()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      {isSidebarOpen && (
        <StoreSidebar
          stores={filteredStores}
          selectedStore={selectedStore}
          zoomLevel={zoomLevel}
          storeNameQuery={storeNameQuery}
          regionQuery={regionQuery}
          onStoreNameSearch={handleStoreNameSearch}
          onRegionSearch={handleRegionSearch}
          onStoreSelect={handleStoreSelect}
          onInstitutionChange={handleInstitutionChange}
          institutions={institutions}
          selectedInstitution={selectedInstitution}
        />
      )}

      <div className="flex-1 relative">
        <Button
          size="icon"
          className="absolute top-4 left-4 z-10 shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </Button>
        <GoogleMapProvider
          stores={markerStores}
          center={mapCenter}
          selectedStore={selectedStore}
          zoom={zoomLevel}
          onMarkerClick={handleMarkerClick}
          onCenterChanged={setMapCenter}
          onZoomChanged={setZoomLevel}
          onBoundsChanged={setMapBounds}
        />

        <Button
          size="icon"
          className="absolute top-4 right-4 z-10 shadow-lg"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                setMapCenter({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                })
              })
            }
          }}
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
