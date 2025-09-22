/**
 * A modal component with form to submit a review.
 *
 * @param null
 * @returns JSX.Element - A modal component with form.
 */

import type { ReviewType } from "data/mockReviewData";
import type { FormEvent } from "react";

export function ReviewSubmissionModal({
  addReviews,
}: {
  addReviews: (newReview: ReviewType) => void;
}) {
  function updateReviews(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const firstName = (formData.get("firstName") ?? "").toString().trim();
    const lastName = (formData.get("lastName") ?? "").toString().trim();
    const email = (formData.get("email") ?? "").toString().trim();
    const reviewTitle = (formData.get("reviewTitle") ?? "").toString().trim();
    const message = (formData.get("message") ?? "").toString().trim();
    if (!firstName || !lastName || !email || !reviewTitle || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    const newReview = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      date: new Date().toISOString().split("T")[0],
      reviewer: `${firstName} ${lastName[0].toUpperCase()}`,
      title: reviewTitle,
      text: message,
    };

    addReviews(newReview);
    form.reset();
    const dialog = form.closest("dialog");
    if (dialog) {
      dialog.close();
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center flex-col py-8">
        <h3 className="font-manrope font-semibold text-xl sm:text-2xl leading-9 text-black mb-6">
          Have you visited this location?
        </h3>
        <button
          type="submit"
          command="show-modal"
          commandfor="dialog"
          className="bg-blue-600 text-white rounded-md py-3 px-6 text-sm font-semibold hover:bg-blue-500"
        >
          Write a review
        </button>
      </div>
      <el-dialog>
        <dialog
          id="dialog"
          aria-labelledby="dialog-title"
          className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
        >
          <el-dialog-backdrop className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

          <div
            tabIndex="0"
            className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
          >
            <el-dialog-panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start"></div>
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    id="dialog-title"
                    className="text-lg text-center font-semibold text-gray-900"
                  >
                    Review this location
                  </h3>
                </div>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <form
                    id="submit-review"
                    onSubmit={(e) => updateReviews(e)}
                    className="space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm/6 font-medium"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          id="firstName"
                          type="text"
                          name="firstName"
                          minLength={1}
                          maxLength={50}
                          required
                          autoComplete="given-name"
                          placeholder="Type first name here..."
                          className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm/6 font-medium"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          id="lastName"
                          type="text"
                          name="lastName"
                          minLength={1}
                          maxLength={50}
                          required
                          autoComplete="family-name"
                          placeholder="Type last name here..."
                          className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          placeholder="Type email here..."
                          className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="reviewTitle"
                        className="block text-sm/6 font-medium"
                      >
                        Review title
                      </label>
                      <div className="mt-2">
                        <input
                          id="reviewTitle"
                          type="text"
                          name="reviewTitle"
                          minLength={1}
                          maxLength={50}
                          autoComplete="off"
                          required
                          placeholder="Type title here..."
                          className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm/6 font-medium"
                      >
                        Review message
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows="3"
                          autoComplete="off"
                          placeholder="Type review here..."
                          minLength={1}
                          maxLength={300}
                          className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  form="submit-review"
                  command="close"
                  commandfor="dialog"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Submit
                </button>
                <button
                  type="button"
                  command="close"
                  commandfor="dialog"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </el-dialog-panel>
          </div>
        </dialog>
      </el-dialog>
    </div>
  );
}
