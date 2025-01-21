import React, { useEffect, useState } from "react";
import List, { IListItem } from "../../components/List/List";
import { ANIMALS } from "./AnimalsListMockData";

export default function AnimalsListPage() {
  const [animalsListData, setAnimalsListData] = useState<Array<IListItem>>();

  const [activeItemInterval, setActiveItemInterval] = useState<number>();

  useEffect(() => {
    //fake fetch
    const mapedAnimals: Array<IListItem> = ANIMALS.map((animal) => ({
      ...animal,
      active: false,
    }));
    setAnimalsListData(mapedAnimals);

    return () => {
      clearInterval(activeItemInterval);
    };
  }, []);

  useEffect(() => {
    if (animalsListData?.length) {
      const interval = setInterval(() => {
        setAnimalsListData((prevAnimals) => {
          const randomItemNumber = generateRandomNumber(prevAnimals!);
          return prevAnimals?.map((animal, index) => ({
            ...animal,
            active:
              !animal.active && index === randomItemNumber
                ? true
                : animal.active,
          }));
        });
      }, 1000);
      setActiveItemInterval(interval);
    }
  }, [animalsListData?.length]);

  useEffect(() => {
    if (animalsListData?.every((item) => item.active)) {
      clearInterval(activeItemInterval);
    }
  }, [animalsListData]);

  const generateRandomNumber = (dataArray: Array<IListItem>) => {
    const inactiveItemsIndexes: Array<number> = dataArray!
      .map((animal, index) => !animal.active && index)
      .filter((index) => index !== false);

    const randomIndex = Math.floor(Math.random() * inactiveItemsIndexes.length);
    return inactiveItemsIndexes[randomIndex];
  };

  return (
    <>
      <List items={animalsListData} />
    </>
  );
}
