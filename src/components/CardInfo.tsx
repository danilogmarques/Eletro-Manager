
type CardProps = {
  title: string;
  value?: number;
  percentage?: number;
}; 

export function CardTest({ title, value, percentage }: CardProps) {
  return (
      <div className=" flex flex-col justify-center m-2 p-4  bg-white rounded-lg shadow-md w-48 h-24">
      <h2 className="text-lg font-semibold">{title}</h2>
      {value !== undefined && (
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        )}
        <p className="text-green-400">{percentage}%</p>
    </div>
  );
}