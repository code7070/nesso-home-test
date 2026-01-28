import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <>
      <Header />
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-slate-700 mb-2">
              Page Not Found
            </h2>
            <p className="text-slate-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <Link to="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </PageContainer>
    </>
  );
}
