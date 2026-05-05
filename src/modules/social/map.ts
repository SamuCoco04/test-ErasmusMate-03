export interface RecommendationMapPin {
  id: string;
  title: string;
  category: string;
  city: string;
  country: string;
  addressLabel: string;
  approximateLatitude: number | null;
  approximateLongitude: number | null;
}

export function toPlaceholderMapCards(items: RecommendationMapPin[]) {
  return items.map((item) => ({ ...item, mapProvider: 'placeholder-list' as const }));
}
