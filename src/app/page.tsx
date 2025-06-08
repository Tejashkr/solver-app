import { SolverForm } from "@/components/solver-form";

export default function Home() {
  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '3rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <SolverForm />
    </div>
  );
}
