
type CardProps = {
  title: string;
  value?: number;
  detail?: string;
}; 

export function CardTest({ title, value, detail }: CardProps) {
  return (
      <div className=" flex flex-col justify-center m-2 p-4  bg-white rounded-lg shadow-md w-48 h-24">
      <h2 className="text-lg font-semibold">{title}</h2>
      {value !== undefined && (
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        )}
        {detail && <p className="text-sm text-muted-foreground">{detail}</p>}
    </div>
  );
}