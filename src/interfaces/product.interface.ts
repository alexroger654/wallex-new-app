interface IProduct {
  id: string;
  name: string;
  sku: string;
  productWeight: string;
  redeemWeight: string;
  metalType: string;
  purity: string;
  jewelleryType: string;
  productSize: string;
  basePrice: string;
  description: string;
  status: string;
  productImages: ProductImage[];
}

interface ProductImage {
  url: string;
  displayOrder: number;
  defaultImage: boolean;
}

export default IProduct;
