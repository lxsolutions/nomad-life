


'use client';

import { trpc } from '../lib/trpc/client';

export default function HomePage() {
  const healthQuery = trpc.health.useQuery();

  return (
    <div>
      <h1>RentShield TH</h1>
      <p>Bangkok rental finder + lease-protection platform</p>
      
      <div>
        <h2>API Status:</h2>
        {healthQuery.isLoading && <p>Checking API health...</p>}
        {healthQuery.error && <p>API Error: {healthQuery.error.message}</p>}
        {healthQuery.data && <p>API Status: {healthQuery.data.status}</p>}
      </div>
    </div>
  );
}


