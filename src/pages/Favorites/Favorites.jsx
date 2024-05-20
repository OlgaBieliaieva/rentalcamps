import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectFav } from "../../redux/fav/favSelectors";
import {
  selectFilteredCampers,
  selectIsLoading,
  selectError,
} from "../../redux/campers/campersSelectors";
import { filter } from "../../redux/campers/campersSlice";
import { fetchAll } from "../../redux/campers/campersOperations";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filters from "../../components/Filters/Filters";
import ProductList from "../../components/ProductList/ProductList";
import styles from "./Favorites.module.css";

let params = {};
const pageLimit = 4;

export default function Favorites() {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredCampers = useSelector(selectFilteredCampers);
  const favList = useSelector(selectFav);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
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
        <h1 className={styles.visuallyHidden}>Favorites</h1>
        <div className={styles.contentWrapper}>
          <section className={styles.sideBar}>
            <h2 className={styles.sectionTitle}>Filters</h2>
            <Filters
              setSearchParams={setSearchParams}
              searchParams={searchParams}
            />
          </section>
          <section className={styles.contentSpace}>
            {isLoading && !error ? (
              <Loader />
            ) : (
              <>
                {favList?.length <= 0 ? (
                  <p>You have no favorite camper</p>
                ) : (
                  <>
                    <h2 className={styles.sectionTitle}>
                      {
                        filteredCampers?.filter((camper) =>
                          favList?.includes(camper.id)
                        ).length
                      }
                      &#160;campers available
                    </h2>
                    <div className={styles.content}>
                      <ProductList
                        campers={filteredCampers
                          ?.filter((camper) => favList?.includes(camper.id))
                          .slice(0, page * pageLimit)}
                      />
                      {page <
                        Math.ceil(
                          filteredCampers?.filter((camper) =>
                            favList?.includes(camper.id)
                          ).length / pageLimit
                        ) && (
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
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
