import { Link } from "@tanstack/react-router";

export default function PortfolioCard() {
   return (
      <div className="flex-1 bg-base-100 rounded-lg shadow-lg p-4 flex flex-col items-center h-96">
         <h3 className="text-3xl font-semibold mb-6 text-primary text-center">
            <Link to={"/trading"}>Portfolio</Link>
         </h3>
      </div>
   );
}
