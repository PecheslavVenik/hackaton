import React from "react";
import styles from "./RegionData.module.css";
import Image from "next/image";
import Union from "@/assets/images/Union.svg";
import suppliers from "@/assets/images/suppliers.svg";
import people from "@/assets/images/people.svg";
import circle from "@/assets/images/circle.svg";
import arrow from "@/assets/images/arrow.svg";
import arrow2 from "@/assets/images/arrow2.svg";
import { BBox } from "@/types/types";

interface Region {
  id: string;
  pathD: string;
  hasInfo: boolean;
  fullName: string;
  img?: string;
  bbox?: BBox;
}
interface RegionDataProps {
  region: Region;
  onClose: () => void;
}

const RegionData: React.FC<RegionDataProps> = ({ region, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.RegionData__container}>
        <div className={styles.RegionData__back} onClick={onClose}>
          <div className={styles.RegionData__back1}>
            <Image src={arrow} alt="Back" />
          </div>
          Назад к карте
        </div>
        <h1>{region.fullName}</h1>
        <div className={styles.RegionData__lyg}>
          Луганская народная республика
        </div>
        <div>Годовой объём закупок малого объёма</div>
        <div className={styles.RegionData__lime}>8 493 382 тыс.</div>
        <div className={styles.RegionData__box2}>
          <div className={styles.RegionData__suppliers}>
            <div>
              <Image src={suppliers} alt="Suppliers" />
            </div>
            <div>
              <div className={styles.RegionData__Post}>Поставщики</div>
              <div className={styles.box}>
                <div>
                  <Image src={Union} alt="Count" />
                </div>
                <div className={styles.RegionData__eght}>808</div>
                <div className={styles.RegionData__seven}>+17%</div>
              </div>
            </div>
          </div>
          <div className={styles.RegionData__suppliers}>
            <div>
              <Image src={people} alt="Customers" />
            </div>
            <div>
              <div className={styles.RegionData__Post}>Заказчики</div>
              <div className={styles.box}>
                <div>
                  <Image src={Union} alt="Count" />
                </div>
                <div className={styles.RegionData__eght}>454</div>
                <div className={styles.RegionData__seven}>+15%</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.RegionData__BoxFin}>
          <div className={styles.RegionData__suppliers}>
            <div>
              <Image src={circle} alt="Completed Contracts" />
            </div>
            <div>
              <div>Завершённые контракты</div>
              <div className={styles.box}>
                <div>
                  <Image src={Union} alt="Count" />
                </div>
                <div className={styles.RegionData__eght}>689</div>
                <div className={styles.RegionData__seven}>+11%</div>
              </div>
            </div>
          </div>
          <div className={styles.RegionData__re}>рейтинг 5 место</div>
        </div>
        <button className={styles.RegionData__reg} onClick={onClose}>
          Показать события региона
          <div className={styles.RegionData__arrow2}>
            <Image src={arrow2} alt="Arrow" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default RegionData;
