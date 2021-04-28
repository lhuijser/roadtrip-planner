import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import styles from './PackingList.module.css';
import useStyles from './PackingList.styles';

import Item from './Item/Item';

const userIsOrganiser = true;

export default function PackingList() {
  const classes = useStyles();
  // TODO: implement full packing list functionality with link to backend
  // const packingListItems = [
  //     "sleeping bag",
  //     "sleeping mat",
  //     "rain jacket",
  //     "pillow",
  //     "alcohol",
  //     "clothing",
  //     "cutlery",
  //     "towel",
  //     "togs",
  //     "phone charger",
  //     "ear plugs",
  //     "hoons",
  //     "bowl",
  // ];
  const packingListItems = [];
  const [userPackedItems, setUserPackedItems] = useState([
    'sleeping bag',
    'hoons',
    'alcohol',
    'ear plugs',
  ]);

  const handleChange = (item) => {
    let newUserPackedItems = [...userPackedItems];
    if (userPackedItems.includes(item)) {
      newUserPackedItems = newUserPackedItems.filter((e) => e !== item); // unchecking the item
    } else {
      newUserPackedItems.push(item); // checking the item
    }
    setUserPackedItems(newUserPackedItems);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>Packing List</div>
        <div className={styles.cardContent}>
          {packingListItems.length ? (
            packingListItems.map((item, index) => (
              <div key={index}>
                <Item
                  name={item}
                  checked={userPackedItems.includes(item)}
                  // TODO: if time - convert this list to a map for speed
                  onChange={() => handleChange(item)}
                />
              </div>
            ))
          ) : (
            <div className={styles.emptyText}>
              The organiser has not added any items to the packing list!
            </div>
          )}
        </div>
        <div className={styles.cardFooter}>
          {userIsOrganiser && <Button className={classes.button}>+ Add Item</Button>}
        </div>
      </div>
    </div>
  );
}
