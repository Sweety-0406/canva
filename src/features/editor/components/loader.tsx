'use client'

const Loader = ({r="200"}:{r?:string}) => {
  return (
  <div style={{ width: '200px', height: '200px' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        {/* Orange Circle - Closest Orbit */}
        <g style={{ transformOrigin: '500px 500px', animation: 'orbit 2s linear infinite' }}>
          <circle cx="600" cy="500" r={r} fill="#FFA774" />
        </g>

        {/* Cyan Circle - Medium Orbit */}
        <g style={{ transformOrigin: '500px 500px', animation: 'orbit 2.5s linear infinite', animationDelay: '0.2s' }}>
          <circle cx="650" cy="500" r={r} fill="#3EFFF6" />
        </g>

        {/* Yellow Circle - Larger Orbit */}
        <g style={{ transformOrigin: '500px 500px', animation: 'orbit 3s linear infinite', animationDelay: '0.4s' }}>
          <circle cx="700" cy="500" r={r} fill="#E7FF7E" />
        </g>

        {/* Purple Circle - Farthest Orbit */}
        <g style={{ transformOrigin: '500px 500px', animation: 'orbit 3.5s linear infinite', animationDelay: '0.6s' }}>
          <circle cx="750" cy="500" r={r} fill="#A089FF" />
        </g>
      </g>

      <style>
        {`
          @keyframes orbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </svg>
  </div>


  )
}

export default Loader



