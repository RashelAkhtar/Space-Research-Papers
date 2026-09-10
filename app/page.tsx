import Library from "@/components/Library";
import { papers } from "@/lib/papers";

export default function Home() {
  return <Library initialPapers={papers} />;
}
