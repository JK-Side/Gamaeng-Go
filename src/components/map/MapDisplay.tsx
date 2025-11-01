"use client";

import { RefObject } from "react";

interface MapDisplayProps {
  mapRef: RefObject<HTMLDivElement | null>;
  apiKeyExists: boolean;
}

export default function MapDisplay({ mapRef, apiKeyExists }: MapDisplayProps) {
  return (
    <div className="w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      {!apiKeyExists && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold mb-2">Google Maps API 키가 필요합니다</h3>
            <p className="text-gray-600">
              환경변수에 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY를 설정해주세요.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
