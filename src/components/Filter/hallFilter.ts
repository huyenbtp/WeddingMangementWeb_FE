import { IHallInfo } from '../../pages/Hall/hallInfo.mock';

export function filterHalls(
  hallInfo: Record<string, IHallInfo>,
  selectedType: string,
  searchQuery: string
) {
  return Object.entries(hallInfo).filter(([name, details]) => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const searchMatch = name.toLowerCase().includes(trimmedQuery);
    if (selectedType === 'all') return searchMatch;
    // Extract hall type from the name (A, B, C, D, E)
    const match = name.match(/([A-E])\d$/);
    const hallType = match ? match[1] : '';
    return hallType === selectedType && searchMatch;
  });
} 