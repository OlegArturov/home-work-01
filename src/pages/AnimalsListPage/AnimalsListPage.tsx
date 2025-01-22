import React, { useEffect, useState } from "react";
import List, { IListItem } from "../../components/List/List";
import { ANIMALS } from "./AnimalsListMockData";

export default function AnimalsListPage(): JSX.Element {
  const [animalsListData, setAnimalsListData] = useState<Array<IListItem>>([]);
  const [activeItemInterval, setActiveItemInterval] = useState<number>();

  useEffect(() => {
    const mappedAnimals: Array<IListItem> = ANIMALS.map((animal) => ({
      ...animal,
      active: false,
    }));
    setAnimalsListData(mappedAnimals);

    return () => {
      clearActiveItemInterval();
    };
  }, []);

  useEffect(() => {
    if (animalsListData.length > 0 && activeItemInterval === undefined) {
      const interval = setInterval(() => {
        setAnimalsListData((prevAnimals) => {
          const randomIndex = generateRandomNumber(prevAnimals);

          return prevAnimals.map((animal, index) => ({
            ...animal,
            active: index === randomIndex || animal.active,
          }));
        });
      }, 1000);
      setActiveItemInterval(interval);
    }
  }, [animalsListData]);

  useEffect(() => {
    if (animalsListData.length) {
      const allActive = animalsListData.every((item) => item.active);
      if (allActive) {
        clearActiveItemInterval();
      }
    }
  }, [animalsListData]);

  const clearActiveItemInterval = () => {
    if (activeItemInterval !== undefined) {
      clearInterval(activeItemInterval);
      setActiveItemInterval(undefined);
    }
  };

  const generateRandomNumber = (dataArray: Array<IListItem>): number => {
    const inactiveIndexes = dataArray
      .map((item, index) => (!item.active ? index : null))
      .filter((index): index is number => index !== null);

    if (inactiveIndexes.length === 0) return -1;
    return inactiveIndexes[Math.floor(Math.random() * inactiveIndexes.length)];
  };

  return <List items={animalsListData} />;
}
