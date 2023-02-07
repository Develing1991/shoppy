import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

export default function ProductDetail() {
  const {
    state: {
      product: { id, title, description, category, price, options, image },
    },
  } = useLocation();
  const [success, setSuccess] = useState("");
  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const { mttAddorUpdateToCart } = useCart();
  const handleClick = (e) => {
    // 장바구니에 추가
    const product = {
      id,
      image,
      title,
      price,
      option: selected,
      quantity: 1,
    };

    mttAddorUpdateToCart.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가 되었습니다.");
        const timer = setTimeout(() => {
          setSuccess(() => "");
          clearTimeout(timer);
        }, 3000);
      },
    });
  };
  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex-col p-4">
          <h2 className="text-3xl font-bold py-2  ">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            ￦{price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label htmlFor="select" className="text-brand font-bold">
              옵션:
            </label>
            {/* 옵션은 한번 읽기만 하고 변경이 안되니.. 예외적으로 key를 index로 줘도 상관은 없다 */}
            <select
              id="select"
              className="p-2 m-4 flex-1  border-2 border-dashed border-brand outline-none"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          {success && <p className="my-2">success</p>}
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
