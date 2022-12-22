import { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER_URL, API_KEY, NBA_UUID } from "../../config.js";

const NBAPage: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [widgetIDs, setWidgetIDs] = useState<Array<string>>([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://api.quarter4.io/basketball/widget/embed/161b7887-e6c0-4445-ba31-658e37076e3f/v1.js";
    script.async = true;
    script.charset = "utf-8";
    window.document.body.appendChild(script);
    // const date = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
    const date = "2022-12-25";
    const widgets: any[] = [];
    axios
      .get(
        `${API_SERVER_URL}basketball/v2/events?page=${currentPage}&count=${perPage}&startDate%5Bafter%5D=${date}&order%5BstartDate%5D=asc&league.uuid=${NBA_UUID}&api_key=${API_KEY}`
      )
      .then((res) => {
        setTotalCount(res.data.meta.totalItems);
        res.data.data.map((value: any, key: number) => {
          widgets.push(value.attributes.uuid);
        });
        setWidgetIDs(widgets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto p-2 sm:mt-28 mt-14">
      {widgetIDs.map((value, key) => {
        return (
          <div className="my-8" key={key}>
            <blockquote
              className="q4-game"
              data-detail="true"
              data-color-background="01005F"
              data-color-text="FFFFFF"
              data-color-high="FFFFFF"
              data-color-medium="FFFFFF"
              data-color-low="FFFFFF"
              data-sport="basketball"
              data-q4={value}
            ></blockquote>
          </div>
        );
      })}
      {/* Pagination Start */}
      <div className="flex flex-col items-center my-12">
        <div className="flex text-gray-700">
          <div className="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-left w-6 h-6"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
          <div className="flex h-12 font-medium rounded-full bg-gray-200">
            <div className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
              1
            </div>
            <div className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full bg-teal-600 text-white ">
              2
            </div>
          </div>
          <div className="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-right w-6 h-6"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
      {/* Pagination End */}
    </div>
  );
};

export default NBAPage;
