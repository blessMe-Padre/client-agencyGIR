import styles from './style.module.scss';
import deleteSVG from '/delete.svg';

import useDataRequestStore from '../../../store/DataRequestStore';
import {
  CustomInput,
  AddMoreBtn,
  CustomRadio,
  ChooseTimeBtn,
  ComponentDateSingle,
} from '../../../components';

const STATUS_CHECKBOXES = [
  {
    value: 'In working',
    label: 'В работе',
    id: 'checkboxinworking',
  },
  {
    value: 'Repair/to',
    label: 'Ремонт/ТО',
    id: 'checkboxrepairto',
  },
  {
    value: 'No Coal (OC)',
    label: 'Отсутствие угля (О/У)',
    id: 'checkboxnocoal',
  },
  {
    value: 'Stock',
    label: 'Запас',
    id: 'checkboxstock',
  },
];

const DeleteDateItem = ({ id }) => {
  const { data } = useDataRequestStore();
  const userId = data[0]?.documentId;
  const dayDataDetails = data[0]?.DayDataDetails;

  const url = `http://89.111.152.254:1337/api/techicas/${userId}`;

  const handleClick = async (e) => {
    e.preventDefault();

    if (!window.confirm('Вы точно хотите удалить рабочую смену?')) return;

    // Создаем копию исходных данных
    const updatedDayDataDetails = [...dayDataDetails];

    // Находим и удаляем элемент с соответствующим id
    for (let i = 0; i < updatedDayDataDetails.length; i++) {
      const day = updatedDayDataDetails[i];
      // Проверяем DayInfo
      if (day.DayInfo && day.DayInfo.id === id) {
        // Если удаляем DayInfo, оставляем структуру с null
        updatedDayDataDetails[i] = {
          ...day,
          DayInfo: null,
          NightInfo: day.NightInfo || null,
        };
        break;
      }

      // Проверяем NightInfo
      if (day.NightInfo && day.NightInfo.id === id) {
        // Если удаляем NightInfo, оставляем структуру с null
        updatedDayDataDetails[i] = {
          ...day,
          DayInfo: day.DayInfo || null,
          NightInfo: null,
        };
        break;
      }
    }

    // Фильтруем полностью пустые записи (где и DayInfo и NightInfo null)
    const cleanedDayDataDetails = updatedDayDataDetails
      .filter((day) => day.DayInfo !== null || day.NightInfo !== null)
      .map((day) => ({
        DayInfo: day.DayInfo
          ? {
            date: day.DayInfo.date,
            day: day.DayInfo.day,
            note: day.DayInfo.note,
            statusTech: day.DayInfo.statusTech,
          }
          : null,
        NightInfo: day.NightInfo
          ? {
            night: day.NightInfo.night,
            date: day.NightInfo.date,
            note: day.NightInfo.note,
            statusTech: day.NightInfo.statusTech,
          }
          : null,
      }));

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { DayDataDetails: cleanedDayDataDetails },
        }),
      });

      if (!response.ok) throw new Error('Ошибка при обновлении компонента');

      alert('Рабочая смена удалена');
      window.location.reload();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <button
      className={styles.delete_section}
      aria-current
      onClick={handleClick}
    >
      <img src={deleteSVG} alt='deleteSVG' width={15} height={15} />
    </button>
  );
};

export default function ComponentTech({
  handleClickBtn,
  items,
  register,
  errors,
  shiftType,
  popupId,
}) {
  const { data } = useDataRequestStore();
  return (
    <>
      <div className={styles.item_row}>
        <div className={styles.wrapper_name}>
          <div>
            <label
              htmlFor='4'
              style={{ textAlign: 'start', fontWeight: 'medium' }}
            >
              Наименование
            </label>
            <CustomInput
              data={data}
              errors={errors}
              register={register}
              id={4}
              name={'Name'}
              type='text'
              placeholder='Введите наименование'
            />
          </div>

          <div>
            <label
              htmlFor='5'
              style={{ textAlign: 'start', fontWeight: 'medium' }}
            >
              Порядковый №
            </label>
            <CustomInput
              data={data}
              errors={errors}
              register={register}
              id={5}
              name={'Order'}
              type='text'
              placeholder='Введите номер'
            />
          </div>
        </div>

        {items.map((item, idx) => {
          return (
            <>
              <div className='flex relative' id={`repeatable-${idx}`} key={idx}>
                <div className={styles.date_wrapper}>
                  <div className={styles.date_content}>
                    <p>Дата</p>
                    <ComponentDateSingle idx={idx} dateForRender={item?.date} />
                  </div>
                  <div className={styles.smena_content}>
                    <p>Смена</p>
                    <div className={styles.smena_btns}>
                      <ChooseTimeBtn
                        idx={idx}
                        register={register}
                        shiftType={shiftType}
                        day={item.day}
                        night={item.night}
                        popupId={popupId}
                      />
                    </div>
                  </div>
                  {data ? <DeleteDateItem id={item.id} /> : ''}
                </div>
              </div>

              <div className={styles.data_container}>
                <div className={styles.data}>
                  <p>Данные</p>
                  <div className={styles.data_wrapper}>
                    {STATUS_CHECKBOXES.map((checkbox, index) => (
                      <CustomRadio
                        data={data}
                        key={`${checkbox.id}-${index}`}
                        name={`${'statusWorker'}.${idx}`}
                        register={register}
                        type='radio'
                        value={checkbox.value}
                        label={checkbox.label}
                        checkboxId={`${checkbox.id}.${idx}`}
                        idx={idx}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.note}>
                <p>Примечание</p>
                <CustomInput
                  data={data}
                  item={item}
                  id={8}
                  name={'note'}
                  errors={errors}
                  register={register}
                  type='text'
                  placeholder='Введите примечание'
                  idx={idx}
                />
              </div>
            </>
          );
        })}

        <div style={{ height: '40px', marginTop: '20px' }}>
          <AddMoreBtn onHandleClick={handleClickBtn} title={'Добавить смену'} />
        </div>
      </div>
    </>
  );
}
