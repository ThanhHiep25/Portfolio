

const TemplatePage = () => {
  return (
    <section id="template" className="min-h-screen flex flex-col items-center justify-center py-20 bg-whe dark:bg-gray-900">
      <img src="/let-your-dreams-be-your-wings.png" alt="let your dreams be your wings"
        wight={400} height={400}
        className="w-[400px] h-[400px] object-cover"
        srcset="" />
      <div className="flex gap-10 items-center">
        <span className="w-4 h-4 bg-primary rounded-full mt-10 animate-ping" ></span>
        <p className="text-2xl font-black text-gray-900 dark:text-white mt-10 tracking-tighter text-center uppercase">
          Đang phát triển
        </p>
      </div>

    </section>
  );
}
export default TemplatePage;