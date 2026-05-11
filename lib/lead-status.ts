export const leadStatuses = [
  {
    value: "NEW",
    label: "Baru",
    badgeClass: "border-cyan-electric/30 bg-cyan-soft text-navy-950"
  },
  {
    value: "CONTACTED",
    label: "Dihubungi",
    badgeClass: "border-blue-200 bg-blue-50 text-blue-800"
  },
  {
    value: "IN_PROGRESS",
    label: "Diproses",
    badgeClass: "border-amber-200 bg-amber-50 text-amber-800"
  },
  {
    value: "CLOSED",
    label: "Selesai",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-800"
  },
  {
    value: "ARCHIVED",
    label: "Arsip",
    badgeClass: "border-slate-200 bg-slate-100 text-slate-700"
  }
] as const;

export type LeadStatusValue = (typeof leadStatuses)[number]["value"];

export function isLeadStatus(value: string): value is LeadStatusValue {
  return leadStatuses.some((status) => status.value === value);
}

export function getLeadStatusMeta(value: string) {
  return leadStatuses.find((status) => status.value === value) ?? leadStatuses[0];
}
