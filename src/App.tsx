import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './theme.ts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import HomePage from './pages/home';

/** Init react-query's query client **/
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      {/* Route different pages here or abstract it somewhere else via some page like react-router */}
      <HomePage />
    </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
