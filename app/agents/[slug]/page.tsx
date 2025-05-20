import AgentDetails from "@/components/AgentDetails"

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return <AgentDetails slug={slug} />
}
