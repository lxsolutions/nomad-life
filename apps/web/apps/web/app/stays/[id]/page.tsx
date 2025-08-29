interface PageProps {
  params: { id: string };
}

export default function StayDetailPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Stay Details - {params.id}</h1>
      <p className="text-gray-600">Detailed information about stay {params.id}.</p>
    </div>
  );
}
