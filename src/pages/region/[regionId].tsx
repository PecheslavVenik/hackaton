// import { useRouter } from "next/router";
// import { GetServerSideProps, NextPage } from "next";
//
// interface RegionPageProps {
//   regionId: string;
// }
//
// const RegionPage: NextPage<RegionPageProps> = ({ regionId }) => {
//   // Здесь можно использовать regionId для загрузки данных региона и фоновой карты
//
//   return (
//     <div
//       style={
//         {
//           /* стили для фоновой карты */
//         }
//       }
//     >
//       {/* Содержимое страницы региона */}
//     </div>
//   );
// };
//
// // Это будет выполняться на сервере при каждом запросе к странице
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // получаем regionId из параметров запроса
//   const { regionId } = context.params!;
//
//   return {
//     props: {
//       regionId: regionId as string,
//     },
//   };
// };
//
// export default RegionPage;
