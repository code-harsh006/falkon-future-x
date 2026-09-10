import ServiceDetail from "@/components/services/ServiceDetail";
import { getService } from "@/lib/services-data";

export default function Page() {
  const service = getService("smart-healthcare-solutions")!;
  return <ServiceDetail service={service} />;
}
