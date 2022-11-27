import styles from './mobile-preview.module.scss';
import mobile from './img/phone-preview.png';

export interface MobilePreviewProps {
  alt: string,
  url: string,
}

export const MobilePreview = ({ alt, url }: MobilePreviewProps) => {
  return (
    <div className={styles['container']}>
      <img className={styles['wrapper']} src={mobile.src} alt="" />
      <div className={styles['mobile-container']}>
        <img className={styles['preview']} src={url} alt={alt} />
      </div>
    </div>
  );
}
