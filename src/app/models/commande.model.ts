export interface CommandeModel {
  _id: string;
  userId: string,
  status: string,
  payment: string,
  items: { productId: string, amount: string, filePath: string }[]
  createdAt: Date

}
