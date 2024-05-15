import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

export default function ProductList({ campers }) {
  return (
    <ul className={styles.list}>
      {campers?.map((camper) => (
        <li key={camper.id}>
          <ProductCard product={camper} />
        </li>
      ))}
    </ul>
  );
}
