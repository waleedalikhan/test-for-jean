import { ItemForm } from "@/components/ItemForm";
import apiService from "@/services";
import { IItem } from "@/types";
import React, { FC, useEffect, useState } from "react";

type Props = {
  name?: string;
};

export const Home: FC<Props> = ({ name }) => {
  const imgRootUrl = import.meta.env.VITE_IMAGE_URL;

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<IItem[]>();
  let [addItem, setAddItem] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await apiService.getPosts();
        setItems(response.data);
      } catch (err: any) {
        console.log(err.message);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  return (
    <div>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <svg
            className="animate-spin text-blue-500 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="48"
          >
            <path d="M24.05 40.1q-6.55 0-11.275-4.725Q8.05 30.65 8.05 24.1v-2.25l-4 4L2.1 23.9l7.45-7.45L17 23.9l-1.95 1.95-4-4v2.25q0 5.35 3.825 9.175Q18.7 37.1 24.05 37.1q1.45 0 2.75-.25t2.45-.75l2.15 2.15q-1.8 1-3.625 1.425-1.825.425-3.725.425Zm14.45-8.45-7.45-7.45 2-2L37 26.15V24.1q0-5.35-3.825-9.175Q29.35 11.1 24 11.1q-1.45 0-2.75.275t-2.45.675L16.65 9.9q1.8-1 3.625-1.4Q22.1 8.1 24 8.1q6.55 0 11.275 4.725Q40 17.55 40 24.1v2.15l4-4 1.95 1.95Z" />
          </svg>
        </div>
      )}

      {!loading && (
        <>
          <div className="flex flex-wrap pt-20 gap-5 sm:justify-start justify-center">
            {items?.map((item) => (
              <div
                key={item.id}
                className="border border-gray-300 dark:border-0 dark:shadow-md dark:shadow-gray-600 rounded-lg w-[25rem] p-5 space-y-2"
              >
                <div className="flex gap-3 items-center">
                  <img
                    crossOrigin="anonymous"
                    width="200"
                    height="200"
                    src={imgRootUrl + item.file}
                    className="rounded-full text-center h-12 w-12"
                  />
                  <h3>{item.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
            <button
              onClick={() => setAddItem(true)}
              className="fixed bottom-5 right-5 bg-blue-500 text-white font-semibold w-36 h-14 rounded-full"
            >
              Add an item
            </button>
          </div>
          {addItem && (
            <div className="fixed inset-0 flex items-center justify-center w-full ">
              <ItemForm
                onFormSubmit={() => setAddItem(false)}
                onClick={() => setAddItem(false)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
