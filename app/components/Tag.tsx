export default function Tag({ children }: { children: string }) {
  return (
    <div className="relative bg-red-500 text-white text-[2rem] px-[1em] py-[0.5em] overflow-hidden outline-orange-50 outline outline-[0.125rem] outline-offset-[-0.25rem]">
      <div
        className="absolute top-[-1rem] left-[-1rem] bg-orange-50 w-8 h-8 rounded-full outline outline-red-500 outline-[0.125rem] outline-offset-[-0.25rem]
      before:absolute before:w-[0.125rem] before:h-[0.125rem] before:bg-red-500 before:top-[50%] before:right-0
      after:absolute after:w-[0.125rem] after:h-[0.125rem] after:bg-red-500 after:bottom-0 after:left-[50%]"
      />

      <div
        className="absolute top-[-1rem] right-[-1rem] bg-orange-50 w-8 h-8 rounded-full outline outline-red-500 outline-[0.125rem] outline-offset-[-0.25rem]
      before:absolute before:w-[0.125rem] before:h-[0.125rem] before:bg-red-500 before:top-[50%]
      after:absolute after:w-[0.125rem] after:h-[0.125rem] after:bg-red-500 after:bottom-0 after:right-[50%]"
      />

      <div
        className="absolute bottom-[-1rem] left-[-1rem] bg-orange-50 w-8 h-8 rounded-full outline outline-red-500 outline-[0.125rem] outline-offset-[-0.25rem]
      before:absolute before:w-[0.125rem] before:h-[0.125rem] before:bg-red-500 before:left-[50%]
      after:absolute after:w-[0.125rem] after:h-[0.125rem] after:bg-red-500 after:bottom-[50%] after:right-0"
      />

      <div
        className="absolute bottom-[-1rem] right-[-1rem] bg-orange-50 w-8 h-8 rounded-full outline outline-red-500 outline-[0.125rem] outline-offset-[-0.25rem]
      before:absolute before:w-[0.125rem] before:h-[0.125rem] before:bg-red-500 before:right-[50%]
      after:absolute after:w-[0.125rem] after:h-[0.125rem] after:bg-red-500 after:bottom-[50%]"
      />

      {children}
    </div>
  );
}
