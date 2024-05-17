import {
  // useState,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useSearchParams } from "react-router-dom";
import {
  selectCampers,
  selectIsLoading,
  selectError,
} from "../../redux/campers/campersSelectors";
import { fetchAll } from "../../redux/campers/campersOperations";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProductList from "../../components/ProductList/ProductList";
import Loader from "../../components/Loader/Loader";
import styles from "./Catalog.module.css";

export default function Catalog() {
  const campers = useSelector(selectCampers);
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);
  console.log(campers);
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.visuallyHidden}>Catalog</h1>
        <div className={styles.contentWrapper}>
          {/* <section className={styles.sideBar}>
            <h2 className={styles.sectionTitle}>Filters</h2>
            <Filters
              createSearchParams={setSearchParams}
              onPageChange={setPage}
            />
          </section> */}
          <section className={styles.contentSpace}>
            {loading && !error ? (
              <Loader />
            ) : (
              <>
                <h2 className={styles.sectionTitle}>
                  {campers.length}&#160;campers available
                </h2>
                <div className={styles.content}>
                  <ProductList
                    campers={campers}
                    // campers={filteredCampers.slice(
                    //   page * pagOpts.limit - pagOpts.limit,
                    //   page * pagOpts.limit
                    // )}
                  />
                  {/* <Pagination
                    pages={Math.ceil(filteredCampers.length / pagOpts.limit)}
                    currentPage={page}
                    onPageChange={setPage}
                  /> */}
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
