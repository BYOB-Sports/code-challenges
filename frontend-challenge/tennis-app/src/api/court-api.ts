import courts from "@/mockdata/courts";
export const getCourtByID = (id: number) => {
  const data = courts.find((court) => (court.id = id));
  //   console.log(data);
  return data;
};
