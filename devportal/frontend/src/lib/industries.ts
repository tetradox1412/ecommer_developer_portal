/**
 * Fixed industry/suite list. Mirrors the Landing Page's IndustrySuite ids
 * so submitted modules slot directly into the marketplace suites.
 */
export interface IndustryOption {
  id: string;
  name: string;
  defaultColor: string;
  defaultIcon: string;
}

export const INDUSTRIES: IndustryOption[] = [
  { id: 'healthcare',    name: 'Healthcare',           defaultColor: 'rose',    defaultIcon: 'Heartbeat' },
  { id: 'education',     name: 'Education',            defaultColor: 'emerald', defaultIcon: 'GraduationCap' },
  { id: 'retail',        name: 'Business Management',  defaultColor: 'sky',     defaultIcon: 'Storefront' },
  { id: 'manufacturing', name: 'Manufacturing',        defaultColor: 'amber',   defaultIcon: 'Factory' },
  { id: 'agriculture',   name: 'Agriculture',          defaultColor: 'lime',    defaultIcon: 'Plant' },
  { id: 'finance',       name: 'Finance & Accounting', defaultColor: 'violet',  defaultIcon: 'CurrencyDollar' },
  { id: 'legal',         name: 'Legal & Compliance',   defaultColor: 'indigo',  defaultIcon: 'Scales' },
  { id: 'logistics',     name: 'Logistics & SCM',      defaultColor: 'orange',  defaultIcon: 'Truck' },
  { id: 'hospitality',   name: 'Hospitality & Leisure', defaultColor: 'pink',   defaultIcon: 'BeerStein' },
  { id: 'government',    name: 'Government & Public',  defaultColor: 'cyan',    defaultIcon: 'Buildings' },
];

export function getIndustry(id: string): IndustryOption | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}
