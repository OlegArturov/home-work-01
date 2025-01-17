import React from "react";
import {
  CarsArray,
  ICarModel,
  ICarVersion,
} from "../../interfaces/carsPage/cars";
import { CARS } from "./carsMockData";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetterHelper";

export const CarsPage = () => {
  const carsData: CarsArray = CARS;

  const renderCarModelsData = (models: ICarModel[]) => {
    return models.map((carModel, carModelIndex) => (
      <React.Fragment key={carModelIndex}>
        {carModel.collection
          .map((carVersion) => {
            Object.defineProperty(carVersion, "id", { enumerable: false });
            return carVersion;
          })
          .map((carVersion, carVersionIndex) => (
            <tr key={carVersionIndex}>
              {carVersionIndex === 0 && (
                <td rowSpan={carModel.collection.length}>{carModel.name}</td>
              )}
              <td>
                <ul>{renderCarVersionsData(carVersion)}</ul>
              </td>
            </tr>
          ))}
      </React.Fragment>
    ));
  };

  const renderCarVersionsData = (versions: ICarVersion) => {
    return Object.keys(versions).map(
      (carVersionObjectKey, carVersionObjectKeyIndex) => (
        <li key={carVersionObjectKeyIndex}>
          {`${capitalizeFirstLetter(carVersionObjectKey)}: ${
            versions[carVersionObjectKey as keyof ICarVersion]
          }`}
        </li>
      )
    );
  };

  return (
    <>
      <h1>Car Specs</h1>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <tbody>
          {carsData.map((carBrand, carBrandIndex) => (
            <React.Fragment key={carBrandIndex}>
              <tr>
                <td colSpan={2} style={{ fontWeight: "bold" }}>
                  {carBrand.brand}
                </td>
              </tr>
              {renderCarModelsData(carBrand.models)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};
