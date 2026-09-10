import ServiceDetail from "@/components/services/ServiceDetail";
import { getService } from "@/lib/services-data";

export default function Page() {
  const service = getService("cyber-awareness-guidance")!;
  return <ServiceDetail service={service} />;
}
