import { Suspense, useState, useEffect } from 'react';
import { Loading, MainComponent } from './components';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // const api = 'http://89.104.67.119:1337/api/objects'
  // useEffect(() => {
  //   fetchData(api);
  // })
  
  useEffect(() => {
    const fetchData = async () => {
      // Имитация загрузки
      await delay(2000);

      const mockData = {
        "data": {
          "id": 11,
          "documentId": "yxon55d950jiowczmrhysc4x",
          "createdAt": "2025-01-29T23:41:41.342Z",
          "updatedAt": "2025-02-04T00:12:38.701Z",
          "publishedAt": "2025-02-04T00:12:38.777Z",
          "objects": [
            {
              "id": 1,
              "title": "АО Находкинский морской торговый порт (УТ-1)",
              "slug": "test",
              "img_s": {
                "id": 33,
                "documentId": "pv47xam4t39u1xqoxasqrqwo",
                "url": "/tech!.png"
              }
            },
            {
              "id": 2,
              "title": "АО Находкинский морской торговый порт (ГУТ-2)",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/tech2.png"
              }
            },
            {
              "id": 3,
              "title": "АО Порт Вера",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/tech3.png"
              }
            },
            {
              "id": 4,
              "title": "ООО Морской Порт Суходол",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/tech4.png"
              }
            },
            {
              "id": 5,
              "title": "Дробильные установки",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/tech5.png"
              }
            },
            {
              "id": 6,
              "title": "Техника",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/tech6.png"
              }
            }
          ]
        }
      };

      setData(mockData);
      setDataLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='page-wrapper'>
      {/* <Suspense fallback={<Loading />}> */}
      <main>
        {dataLoading ? (
          <Loading />
        ) : (
          <MainComponent data={data} />
        )}
      </main>
      {/* </Suspense> */}
    </div >
  );
}

export default App;

