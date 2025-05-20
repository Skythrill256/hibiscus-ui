import AgentDetails from "@/components/AgentDetails"

interface PageProps {
  params: {
    slug: string
  }
}

export default function AgentPage({ params }: PageProps) {
  return <AgentDetails slug={params.slug} />
}
