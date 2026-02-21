/**
 * App
 * ---
 * Root layout: wraps the app in ThemeProvider and A11yProvider so theme and accessibility
 * preferences are available everywhere and persist (localStorage). Imports theme CSS so
 * --color-* and --font-* variables are applied when the theme class is set on <html>.
 * Currently renders only HomePage; add a router here when adding About and project pages.
 */

import { ThemeProvider } from './context/ThemeContext';
import { A11yProvider } from './context/A11yContext';
import { HomePage } from './components/HomePage';
import './themes/index.css';

function App() {
  return (
    <ThemeProvider>
      <A11yProvider>
        <HomePage />
      </A11yProvider>
    </ThemeProvider>
  );
}

export default App;
