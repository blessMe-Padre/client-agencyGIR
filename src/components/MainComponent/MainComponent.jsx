import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

export default function MainComponent({ data, domain }) {
  return (
    <section className={styles.main_section}>
      <div className="container">
        <div className={styles.main_container}>
          <h2 className={styles.title}>Выберите объект</h2>

          <ul className={styles.list}>
            {data?.map((item, idx) => {
              return (
                <li className={styles.item} key={idx}>
                  {/* <Link to={`/object/${item.id}`} className={styles.item_link}> */}
                  <Link
                    to={`/object/${item.slug}`}
                    className={styles.item_link}
                  >
                    <img
                      src={`${domain}${item.image.url}`}
                      alt={item.Name || "Изображение объекта"}
                      className={styles.item_img}
                      width={250}
                      height={200}
                    />
                    <p className={styles.item_title}>
                      {item.Name ? item.Name : "Ошибка получения заголовка"}
                    </p>
                    <svg
                      className={styles.arrow}
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.0914 17.3539L16.7844 5.66089"
                        stroke="#253360"
                        strokeWidth="2"
                      />
                      <path
                        d="M6.60146 5.66095H17.9233"
                        stroke="#253360"
                        strokeWidth="2"
                      />
                      <path
                        d="M16.9219 16.2776V4.95575"
                        stroke="#253360"
                        strokeWidth="2"
                      />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
