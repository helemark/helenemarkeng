import ClientWrapper from "./ClientWrapper";
import { SudokuProvider } from "./contexts/SudokuContext";


export default function Home() {
  return (
    <SudokuProvider> 
      <ClientWrapper />
    </SudokuProvider>
  );
}
