import styles from './style.module.scss';
import { CustomInput } from "../../../components";

export default function ComponentTonnajMini({ data, errors, register }) {


    return (
        <div className={`${styles.form_content} ${styles.mini}`}>
            <p className={styles.form_title_content}>Тоннаж месяц</p>
            <div className={styles.wrapper_input}>
                <div>
                    <label
                        htmlFor="1"
                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                    >
                        Тоннаж выставили
                    </label>
                    <CustomInput
                        data={data}
                        errors={errors}
                        register={register}
                        name={'AmountDataObject'}
                        id={1}
                        type="number"
                        placeholder="Введите тн."
                    />
                </div>

                <div>
                    <label
                        htmlFor="2"
                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                    >
                        Ост. Порт
                    </label>
                    <CustomInput
                        data={data}
                        errors={errors}
                        register={register}
                        name={'DayDataObjectOstatkiPORT'}
                        id={2}
                        type="number"
                        placeholder="Введите тн."
                    />
                </div>

                <div>
                    <label
                        htmlFor="3"
                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                    >
                        Ост. ГиР
                    </label>
                    <CustomInput
                        data={data}
                        errors={errors}
                        register={register}
                        id={3}
                        name={'DayDataObjectOstatkiGIR'}
                        type="number"
                        placeholder="Введите тн."
                    />
                </div>
            </div>

            {
                data[0]?.MonthDataObjectTonnaj && (
                    data[0]?.MonthDataObjectTonnaj?.map(el => {
                        return (
                            <div key={el} className={styles.wrapper_data}>
                                <p>{el.MonthDataObject}</p>
                                <div className={styles.tonnaj_data}>
                                    <p className={styles.custom_wrapper}>{Number(el.AmountDataObject)?.toLocaleString()}</p>
                                    <p className={styles.custom_wrapper}>{Number(el.DayDataObjectOstatkiGIR)?.toLocaleString()}</p>
                                    <p className={styles.custom_wrapper}>{Number(el.DayDataObjectOstatkiPORT)?.toLocaleString()}</p>
                                </div>
                            </div>
                          )
                    })
                )
            }

           
        </div>
    )
}