interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  return (
    <div>
      <h1 className='mb-5 mt-5 text-center text-4xl font-extrabold text-white'>
        {title}
      </h1>
    </div>
  );
}
