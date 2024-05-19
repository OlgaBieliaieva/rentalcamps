import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  selectCampers,
  // selectFilteredCampers,
  selectIsLoading,
  selectError,
} from "../../redux/campers/campersSelectors";
import { fetchAll, fetchByReq } from "../../redux/campers/campersOperations";
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
  const [searchParams, 
    // setSearchParams
  ] = useSearchParams();
  const campers = useSelector(selectCampers);
  // const filteredCampers = useSelector(selectFilteredCampers);
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    params = {};
    for (const [key, value] of searchParams.entries()) {
      // key !== "equipment"
      // ?
      params[key] = value;
      // : params.equipment
      // ? params.equipment.push(value)
      // : (params.equipment = [value]);
    }
    // getParams();
    dispatch(fetchAll());
    dispatch(fetchByReq(params));
  }, [searchParams, dispatch]);

  // function getParams() {
  //   params = {};
  //   for (const [key, value] of searchParams.entries()) {
  //     params[key] = value;
  //   }
  // }

  console.log(campers);
  console.log(page);
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.visuallyHidden}>Catalog</h1>
        <div className={styles.contentWrapper}>
          <section className={styles.sideBar}>
            <h2 className={styles.sectionTitle}>Filters</h2>
            <Filters
              // createSearchParams={setSearchParams}
              // onPageChange={setPage}
            />
          </section>
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
                    // campers={filteredCampers}
                    campers={campers.slice(0, page * pageLimit)}
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
                  {page < Math.ceil(campers.length / pageLimit) && (
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
