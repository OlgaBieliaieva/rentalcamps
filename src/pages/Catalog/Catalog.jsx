import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  selectFilteredCampers,
  selectIsLoading,
  selectError,
} from "../../redux/campers/campersSelectors";
import { filter } from "../../redux/campers/campersSlice";
import { fetchAll } from "../../redux/campers/campersOperations";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filters from "../../components/Filters/Filters";
import ProductList from "../../components/ProductList/ProductList";
import Loader from "../../components/Loader/Loader";
import styles from "./Catalog.module.css";

let params = {};
const pageLimit = 4;

export default function Catalog() {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredCampers = useSelector(selectFilteredCampers);
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    dispatch(fetchAll());
    dispatch(filter({ ...params }));
  }, [searchParams, dispatch]);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.visuallyHidden}>Catalog</h1>
        <div className={styles.contentWrapper}>
          <section className={styles.sideBar}>
            <h2 className={styles.sectionTitle}>Filters</h2>
            <Filters
              setSearchParams={setSearchParams}
              searchParams={searchParams}
            />
          </section>
          <section className={styles.contentSpace}>
            {loading && !error ? (
              <Loader />
            ) : (
              <>
                <h2 className={styles.sectionTitle}>
                  {filteredCampers.length}&#160;campers available
                </h2>
                <div className={styles.content}>
                  <ProductList
                    campers={filteredCampers.slice(0, page * pageLimit)}
                  />

                  {page < Math.ceil(filteredCampers.length / pageLimit) && (
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => setPage(page + 1)}
                    >
                      Load more
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
