import React from "react";
import "./styles.scss";

export interface IListItem {
  type: string;
  icon: string;
  active?: boolean;
}

export interface IListProps {
  items: Array<IListItem> | undefined;
}

export default function List({ items }: IListProps) {
  return (
    <>
      {items?.length && (
        <table border={1} cellPadding={5} cellSpacing={0}>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={`table-row${
                  item.active ? " table-row--active" : ""
                }`}
              >
                {Object.keys(item).map(
                  (itemKey, itemKeyIndex) =>
                    itemKey !== "active" && (
                      <td key={itemKeyIndex}>
                        {item[itemKey as keyof IListItem]}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
