interface ProductImage {
    url: string;
    displayOrder: number;
    defaultImage: boolean;
}

interface IProductDetails {
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
    stock: number;
    status: string;
    productImages: ProductImage[];
}

export default IProductDetails