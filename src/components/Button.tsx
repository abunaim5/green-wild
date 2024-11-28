
const Button = (names: {name: string}) => {
    return (
        <button className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-[#058F34] border-[#058F34] hover:bg-green-200">{names.name}</button>
    );
};

export default Button;