import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

export const ModalOverlayUI: FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className={styles.overlay} data-cy='modal-overlay' onClick={onClick} />
);
