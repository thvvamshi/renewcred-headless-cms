export default function DebugPage() {
  return (
    <pre>
      {JSON.stringify(
        {
          INTERNAL_API_URL: process.env.INTERNAL_API_URL,
          NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
          NODE_ENV: process.env.NODE_ENV,
        },
        null,
        2
      )}
    </pre>
  );
}