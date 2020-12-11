export interface Recommendation {
  recommendationId: number | null,
  fromUserToken: string,
  productId: number,
  client: string,
  phone1: string,
  phone2?: string
}
