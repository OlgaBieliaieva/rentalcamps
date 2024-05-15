import { 
    // useState, 
    useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import {
//   selectFilteredCampers,
//   selectIsLoading,
//   selectError,
//   selectCurrentUser,
// } from "../../redux/selectors";
// import { filter } from "../../redux/appSlice";
// import { fetchAllCampers } from "../../redux/operations";
import { selectFav } from "../../redux/fav/favSelectors";
import {
  selectCampers,
  selectIsLoading,
  selectError,
} from "../../redux/campers/campersSelectors";
import { fetchAll } from "../../redux/campers/campersOperations";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import Filters from "../../components/Filters/Filters";
import ProductList from "../../components/ProductList/ProductList";
// import Pagination from "../../components/Pagination/Pagination";
import styles from "./Favorites.module.css";

// const pagOpts = {
//   limit: 4,
//   defaultPage: 1,
// };

// let params = {};

export default function Favorites() {
  //   const [page, setPage] = useState(pagOpts.defaultPage);
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const filteredCampers = useSelector(selectFilteredCampers);
  //   const user = useSelector(selectCurrentUser);
  const campers = useSelector(selectCampers);
  const favList = useSelector(selectFav);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);
  console.log(campers);

  //   useEffect(() => {
  //     params = {};
  //     for (const [key, value] of searchParams.entries()) {
  //       key !== "equipment"
  //         ? (params[key] = value)
  //         : params.equipment
  //         ? params.equipment.push(value)
  //         : (params.equipment = [value]);
  //     }
  //     dispatch(fetchAllCampers());
  //     dispatch(filter({ ...params }));
  //   }, [searchParams, dispatch]);

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
                        campers?.filter((camper) =>
                          favList?.includes(camper.id)
                        ).length
                      }
                      &#160;campers available
                    </h2>
                    <div className={styles.content}>
                      <ProductList
                        campers={
                          campers?.filter((camper) =>
                            favList?.includes(camper.id)
                          )
                          //   .slice(
                          //     page * pagOpts.limit - pagOpts.limit,
                          //     page * pagOpts.limit
                          //   )
                        }
                      />
                      {/* <Pagination
                        pages={Math.ceil(
                          filteredCampers.filter((camper) =>
                            user?.favorites?.includes(camper.id)
                          ).length / pagOpts.limit
                        )}
                        currentPage={page}
                        onPageChange={setPage}
                      /> */}
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
