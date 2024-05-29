export interface Contact {
  _id?:string
  name: string;
  email: string;
  phone: string;
  description: string;
  status: string;
  method?: string
  product?: string
}
