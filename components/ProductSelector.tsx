import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  category: string;
}

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: string;
  onProductChange: (productId: string) => void;
}

export function ProductSelector({ products, selectedProduct, onProductChange }: ProductSelectorProps) {
  const selected = products.find(p => p.id === selectedProduct);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Produit :</span>
      <Select value={selectedProduct} onValueChange={onProductChange}>
        <SelectTrigger className="w-[220px] bg-card border-border shadow-sm">
          <SelectValue>
            {selected && (
              <div className="flex items-center gap-2">
                <span className="font-medium">{selected.name}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {products.map((product) => (
            <SelectItem key={product.id} value={product.id}>
              <div className="flex items-center gap-2">

                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-muted-foreground">{product.category}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
