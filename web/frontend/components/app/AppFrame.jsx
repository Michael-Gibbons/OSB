import AppErrorBoundary from './AppErrorBoundary';
import { Frame } from '@shopify/polaris';
import { OSBLogo, OSBLogoDark } from '../../assets';
import AppTopBar from './AppTopBar';
import AppNavigation from './AppNavigation';
import Routes from '../../Routes';
import useToggle from '../../hooks/util/useToggle';


import { AppContext } from '../../contexts/AppContext';

import useCreateToast from '../../hooks/app/util/useCreateToast';
import AppToast from './AppToast';

export default function AppFrame() {
  const [mobileNavigationActive, toggleMobileNavigationActive] = useToggle(false)

  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("../../pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  const logo = {
    width: 90,
    topBarSource: OSBLogo,
    contextualSaveBarSource: OSBLogoDark,
    url: '/',
    accessibilityLabel: 'OSB Logo',
  };

  const [toast, setToast] = useCreateToast()

  const contextValue = {
    toast: {
      setToast
    }
  }

  return (
    <AppErrorBoundary>
      <AppContext.Provider value={contextValue}>
        <Frame
            logo={logo}
            topBar={<AppTopBar toggleMobileNavigationActive={toggleMobileNavigationActive}/>}
            navigation={<AppNavigation />}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
          >
          {/* {contextualSaveBarMarkup}
          {loadingMarkup}
          {pageMarkup}
          {toastMarkup}
          {modalMarkup} */}
          <AppToast toast={toast}/>
          <Routes pages={pages} />
        </Frame>
      </AppContext.Provider>
    </AppErrorBoundary>
  )
}