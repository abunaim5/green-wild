
export default function Home() {
  const category = ['Land Animal', 'Bird', 'Fish', 'Insect']

  return (
    <div className="flex justify-between mt-10">
      <div className="flex gap-6 text-white">
        {
          category.map((cat, idx) => <button key={idx} className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-green-500 border-green-500">{cat}</button>)
        }
      </div>
      <div className="flex gap-6 text-white">
        <button className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-white">Add Animal</button>
        <button className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-white">Add Category</button>
      </div>
    </div>
  );
}
