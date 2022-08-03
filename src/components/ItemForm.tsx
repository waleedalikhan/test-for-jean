import apiService from "@/services";
import { Item_Form } from "@/types";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  onClick?: () => void;
  onFormSubmit?: () => void;
};

export const ItemForm: FC<Props> = ({ onClick, onFormSubmit }) => {
  const { register, handleSubmit, formState } = useForm<Item_Form>();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (itemForm: Item_Form) => {
    onFormSubmit && onFormSubmit();
    // console.log('Item-Form', itemForm);
    const data = new FormData();
    data.append("title", itemForm.title);
    data.append("desc", itemForm.desc);
    data.append("file", itemForm.file[0]);

    // console.log('DATA', data);

    const res = await apiService.addPost(data);
    console.log(res?.data);

    toast.success("Successfully added!");
  };

  return (
    <>
      <div
        onClick={onClick}
        className="bg-black opacity-70 absolute h-screen w-full sm:block hidden"
      ></div>
      <div className="flex justify-center items-center z-50 sm:w-auto w-full">
        <div className="card bg-white dark:bg-[#111827] flex flex-col sm:justify-center items-center sm:w-[25rem] w-full sm:h-full h-screen rounded-xl pt-5">
          <h3 className="card-header pb-5 font-mons font-semibold">
            Add new item
          </h3>
          <div className="card-body pb-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group flex flex-col pb-3">
                <label className="font-mons font-medium">Title</label>
                <input
                  type="text"
                  {...register("title", { required: true, maxLength: 150 })}
                  className={`form-control border-0 focus:border-b focus:outline-none focus:ring-0 bg-transparent border-b border-gray-400 dark:border-gray-300 font-mons text-black dark:text-white ${
                    errors.title ? "is-invalid" : ""
                  } dark: text-white`}
                />
                {errors?.title && (
                  <div className="text-red-500 text-[12px] font-mons">
                    Title is required
                  </div>
                )}
              </div>
              <div className="form-group flex flex-col pb-5">
                <label className="font-mons font-medium">Description</label>
                <textarea
                  cols={30}
                  {...register("desc", { required: true, maxLength: 500 })}
                  className={`form-control border-0 focus:border-b focus:outline-none focus:ring-0 bg-transparent border-b border-gray-400 dark:border-gray-300 dark:text-white font-mons resize-none ${
                    errors.desc ? "is-invalid" : ""
                  } dark:text-white`}
                ></textarea>

                {errors?.desc && (
                  <div className="text-red-500 text-[12px] font-mons">
                    Description is required
                  </div>
                )}
              </div>
              <div className="form-group pb-5">
                <input
                  className="custom-file-input border border-blue-500 rounded-lg dark:text-white"
                  type="file"
                  {...register("file", { required: true })}
                />
              </div>
              <button
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl w-full h-12 font-mons"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Add Item
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
