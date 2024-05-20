import { createSelector } from "@reduxjs/toolkit";

export const selectCampers = (state) => state.campers.campers;
export const selectFilter = (state) => state.campers.filter;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;
export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilter],
  (campers, filter) => {
    return campers
      ?.filter((camper) =>
        filter.location?.length > 0
          ? camper.location.toLowerCase().trim().includes(filter.location)
          : true
      )
      ?.filter((camper) =>
        filter.transmission?.length > 0
          ? camper.transmission === filter.transmission
          : true
      )
      ?.filter((camper) =>
        filter.form?.length > 0 ? camper.form === filter.form : true
      )
      ?.filter((camper) =>
        filter.airConditioner ? camper.details.airConditioner > 0 : true
      )
      ?.filter((camper) => (filter.shower ? camper.details.shower > 0 : true))
      ?.filter((camper) => (filter.kitchen ? camper.details.kitchen > 0 : true))
      ?.filter((camper) => (filter.freezer ? camper.details.freezer > 0 : true))
      ?.filter((camper) => (filter.TV ? camper.details.TV > 0 : true));
  }
);
