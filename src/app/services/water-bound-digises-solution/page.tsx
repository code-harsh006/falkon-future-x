import ServiceDetail from "@/components/services/ServiceDetail";
import { getService } from "@/lib/services-data";

export default function Page() {
  const service = getService("water-bound-digises-solution")!;
  return <ServiceDetail service={service} />;
}
