import Spinner from "./_components/Spinner";

export default function Loading() {
  return (
    <div>
      <Spinner></Spinner>
      <h2 className="text-accent-100 font-bold">Loading...</h2>
    </div>
  );
}
