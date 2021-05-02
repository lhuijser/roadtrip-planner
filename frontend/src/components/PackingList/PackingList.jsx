import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import styles from './PackingList.module.css';
import useStyles from './PackingList.styles';

import Item from './Item/Item';
import AddItemModal from './AddItemModal/AddItemModal';

const userIsOrganiser = true;

export default function PackingList({ packingList, packedItems }) {
  const { id } = useParams();

  const classes = useStyles();

  const [userPackedItems, setUserPackedItems] = useState(packedItems);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);

  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };

  const handleCloseAddItemModal = () => {
    setAddItemModalOpen(false);
  };

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
    <>
      <div className={styles.container}>
        {packingList.length ? (
          <div className={styles.cardContent}>
            {packingList.map((item, index) => (
              <div key={index}>
                <Item name={item} checked={userPackedItems.includes(item)} onChange={() => handleChange(item)} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyText}>The organiser has not added any items to the packing list yet!</div>
        )}
        <div className={styles.buttonContainer}>
          {userIsOrganiser && (
            <Button className={classes.button} onClick={handleOpenAddItemModal}>
              Add Item
            </Button>
          )}
        </div>
      </div>
      <AddItemModal open={addItemModalOpen} onClose={handleCloseAddItemModal} />
    </>
  );
}
