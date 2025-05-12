function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  // Check for dark mode on initial load
  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Wrap the app with our providers
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <BackupProvider>
          <AppContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </BackupProvider>
      </CurrencyProvider>
    </LanguageProvider>);

}

function AppContent({ currentPage, setCurrentPage }) {
  const { t } = useLanguage();

  // Initialize localStorage when app loads
  React.useEffect(() => {
    StorageUtils.init();
  }, []);

  // Simple toast notification system
  const [toast, setToast] = React.useState({ visible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'products':
        return <Products />;
      case 'dashboard':
        return <Dashboard />;
      case 'controlPanel':
        return <ControlPanel />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      default:
        return <Home />;
    }
  };

  return (
    <div data-name="app-container" className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200" data-id="q9oc8w8p2" data-path="app.js">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="min-h-screen" data-id="wsekpdesx" data-path="app.js">
        {renderPage()}
      </main>
      <Footer />
      
      {/* Toast Notification */}
      <div className={`toast ${toast.visible ? 'visible' : ''} ${toast.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`} data-id="d5ucn30tc" data-path="app.js">
        <div className={`p-3 flex items-center ${toast.type === 'success' ? 'text-green-700' : 'text-red-700'}`} data-id="tv0dg5sax" data-path="app.js">
          <i className={`mr-2 fas ${toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} data-id="rudd1xz0j" data-path="app.js"></i>
          <span data-id="jrosth0q4" data-path="app.js">{toast.message}</span>
        </div>
      </div>
    </div>);

}

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);