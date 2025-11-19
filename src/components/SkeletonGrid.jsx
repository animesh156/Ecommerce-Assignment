import React from 'react'

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 h-60 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
  )
}

export default SkeletonGrid