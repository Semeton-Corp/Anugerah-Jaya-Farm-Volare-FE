import React from "react";
const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const itemCount = 100;
const PageKosong = () => {
  const getCard = () => {
    for (i in (1).itemCount) {
      console.log("i: ", i);
    }
  };

  const isPrimenumber = (number) => {
    let divide = 0;
    if (number == 1) {
      return false;
    }
    if (number == 2 || number == 3) {
      return true;
    }
    for (let i = 4; i < number; i++) {
      if (number % i == 0) {
        divide++;
      }
    }
    if (divide == 2) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-5">
        {/* {getCard()} */}
        {items?.map((number) => (
          <div
            className={`max-h-xl p-6 border rounded-2xl ${
              isPrimenumber(number) ? "bg-green-700" : ""
            }`}
          >
            <div className="w-full h-full border rounded-lg text-center py-4">
              <div>photo</div>
              <div>photo</div>
              <div>photo</div>
              <div>photo</div>
            </div>
            <div className="">{`Simple description item no.${number}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageKosong;
