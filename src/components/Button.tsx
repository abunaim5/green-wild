"use client"

const Button = ({name, handleCategory}: {name: string, handleCategory: (category:string) => void}) => {
    return (
        <button onClick={() => handleCategory(name)} className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-[#058F34] border-[#058F34] hover:bg-green-200">{name}</button>
    );
};

export default Button;